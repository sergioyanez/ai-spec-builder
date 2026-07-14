"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import SpecForm from "@/components/SpecForm";
import SpecOutput from "@/components/SpecOutput";
import HistorySidebar from "@/components/HistorySidebar";
import type { Spec } from "@/lib/types";
import {
  deleteSpec,
  deriveName,
  getSnapshot,
  getServerSnapshot,
  getSpec,
  renameSpec,
  saveSpec,
  subscribe,
} from "@/lib/history";

export default function Home() {
  const [spec, setSpec] = useState<Spec | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  // Session-only count of successful generations; resets on reload (no persistence).
  const [specCount, setSpecCount] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  // Read the persisted history reactively; server render sees an empty list and
  // the client hydrates from localStorage without a mismatch warning.
  const entries = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function handleResult(newSpec: Spec, idea: string) {
    const entry = saveSpec({
      name: deriveName(idea, newSpec),
      idea,
      spec: newSpec,
    });
    setSpec(newSpec);
    setActiveId(entry.id);
    setSpecCount((n) => n + 1);
  }

  function handleSelect(id: string) {
    const entry = getSpec(id);
    if (!entry) return;
    setSpec(entry.spec);
    setActiveId(entry.id);
    setDrawerOpen(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleRename(id: string, name: string) {
    renameSpec(id, name);
  }

  function handleDelete(id: string) {
    deleteSpec(id);
    if (id === activeId) {
      setSpec(null);
      setActiveId(null);
    }
  }

  function handleNew() {
    setSpec(null);
    setActiveId(null);
    setFormKey((key) => key + 1);
    setDrawerOpen(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-hero-start via-canvas to-canvas px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-2 print:hidden">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-ink">
              AI Spec Builder
            </h1>
            <span className="mt-1 inline-flex shrink-0 items-center rounded-full border border-card-border bg-canvas px-3 py-1 text-sm font-medium text-muted shadow-card">
              Specs generadas: {specCount}
            </span>
          </div>
          <p className="text-muted">
            Describí tu producto y recibí al instante un documento técnico
            completo, listo para compartir con cualquier desarrollador.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="print:hidden">
            <HistorySidebar
              entries={entries}
              activeId={activeId}
              onSelect={handleSelect}
              onRename={handleRename}
              onDelete={handleDelete}
              onNew={handleNew}
              open={drawerOpen}
              onToggle={() => setDrawerOpen((v) => !v)}
            />
          </div>

          <div className="min-w-0 flex-1 space-y-8">
            <div ref={formRef} className="print:hidden">
              <SpecForm
                key={formKey}
                onResult={handleResult}
                onLoadingChange={setIsGenerating}
              />
            </div>

            <SpecOutput
              key={activeId ?? "none"}
              spec={spec}
              onReset={handleNew}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
