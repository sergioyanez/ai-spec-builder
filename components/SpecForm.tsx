"use client";

import { useState } from "react";
import type { Spec } from "@/lib/types";

const MAX_CHARS = 2000;

interface SpecFormProps {
  onResult: (spec: Spec, idea: string) => void;
  onLoadingChange?: (loading: boolean) => void;
}

function getLengthHint(length: number): { text: string; className: string } | null {
  if (length === 0) return null;
  if (length < 30) {
    return {
      text: "Muy corto — describe más tu idea",
      className: "text-amber-600",
    };
  }
  if (length <= 100) {
    return { text: "Buena descripción", className: "text-emerald-600" };
  }
  return {
    text: "Descripción detallada — esto generará una spec más completa",
    className: "text-emerald-600",
  };
}

export default function SpecForm({ onResult, onLoadingChange }: SpecFormProps) {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [streamedChars, setStreamedChars] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!idea.trim()) {
      setError("Por favor describí tu idea de producto antes de generar.");
      return;
    }

    setLoading(true);
    onLoadingChange?.(true);
    setStreamedChars(0);
    try {
      const res = await fetch("/api/generate-spec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: idea.trim() }),
      });

      // Pre-stream failures (rate limit, validation) come back as JSON, not a stream.
      if (!res.ok || !res.body) {
        let message =
          "Hubo un error al generar la especificación. Intentá de nuevo.";
        try {
          const data = await res.json();
          if (data?.error) message = data.error;
        } catch {
          // keep the default message
        }
        setError(message);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let charCount = 0;
      let settled = false;

      const handleFrame = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        let frame: { type: string; text?: string; spec?: Spec; error?: string };
        try {
          frame = JSON.parse(trimmed);
        } catch {
          return;
        }

        if (frame.type === "delta" && frame.text) {
          charCount += frame.text.length;
          setStreamedChars(charCount);
        } else if (frame.type === "done" && frame.spec) {
          settled = true;
          onResult(frame.spec, idea.trim());
        } else if (frame.type === "error") {
          settled = true;
          setError(
            frame.error ||
              "Hubo un error al generar la especificación. Intentá de nuevo."
          );
        }
      };

      // Read the newline-delimited JSON stream frame by frame.
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          handleFrame(line);
        }
      }
      if (buffer.trim()) handleFrame(buffer);

      if (!settled) {
        setError(
          "La conexión se interrumpió antes de terminar. Intentá de nuevo."
        );
      }
    } catch {
      setError("Hubo un error al generar la especificación. Intentá de nuevo.");
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  }

  const nearLimit = idea.length >= MAX_CHARS * 0.9;
  const hint = getLengthHint(idea.trim().length);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={loading}
          placeholder="Describe tu idea de producto... Por ejemplo: una app para que freelancers gestionen sus facturas"
          rows={10}
          maxLength={MAX_CHARS}
          className="w-full resize-none rounded-xl border border-card-border bg-white px-4 py-3 text-sm text-ink placeholder-muted/70 shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted"
        />

        <div className="flex items-center justify-between text-xs">
          {hint ? (
            <span className={hint.className}>{hint.text}</span>
          ) : (
            <span />
          )}
          <span
            className={
              nearLimit ? "font-semibold text-red-600" : "text-zinc-400"
            }
          >
            {idea.length} / {MAX_CHARS} caracteres
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
          )}
          {loading
            ? streamedChars > 0
              ? "Escribiendo tu especificación..."
              : "Generando..."
            : "Generar especificación"}
        </button>
      </form>

      {loading && (
        <div
          className="flex items-center gap-3 rounded-xl border border-card-border bg-hero-start/60 px-4 py-3 text-sm text-accent"
          role="status"
          aria-live="polite"
        >
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60" />
          </span>
          <span>
            {streamedChars > 0
              ? `La IA está redactando tu especificación (${streamedChars.toLocaleString(
                  "es"
                )} caracteres y sumando)...`
              : "Conectando con la IA y preparando tu especificación..."}
          </span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
        >
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 5a1 1 0 012 0v5a1 1 0 11-2 0V5zm1 9a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
              clipRule="evenodd"
            />
          </svg>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-red-800">
              No pudimos generar tu especificación
            </p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
