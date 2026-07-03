"use client";

import { useRef, useState } from "react";
import SpecForm from "@/components/SpecForm";
import SpecOutput from "@/components/SpecOutput";
import type { Spec } from "@/lib/types";

export default function Home() {
  const [spec, setSpec] = useState<Spec | null>(null);
  const [formKey, setFormKey] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  function handleReset() {
    setSpec(null);
    setFormKey((key) => key + 1);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            AI Spec Builder
          </h1>
          <p className="text-zinc-500">
            Describí tu producto y recibí al instante un documento técnico
            completo, listo para compartir con cualquier desarrollador.
          </p>
        </header>

        <div ref={formRef}>
          <SpecForm key={formKey} onResult={setSpec} />
        </div>

        <SpecOutput spec={spec} onReset={handleReset} />
      </div>
    </main>
  );
}
