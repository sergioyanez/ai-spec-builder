"use client";

import { useState } from "react";
import type { Spec } from "@/lib/types";

const MAX_CHARS = 500;

interface SpecFormProps {
  onResult: (spec: Spec) => void;
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

export default function SpecForm({ onResult }: SpecFormProps) {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!idea.trim()) {
      setError("Por favor describí tu idea de producto antes de generar.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-spec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: idea.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Hubo un error al generar la especificación. Intentá de nuevo."
        );
        return;
      }

      onResult(data.spec as Spec);
    } catch {
      setError("Hubo un error al generar la especificación. Intentá de nuevo.");
    } finally {
      setLoading(false);
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
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-amber-300"
              aria-hidden="true"
            />
          )}
          {loading ? "Generando..." : "Generar especificación"}
        </button>
      </form>

      {error && (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
