"use client";

import { useState, type ReactNode, type SVGProps } from "react";
import type { Spec } from "@/lib/types";

interface SpecOutputProps {
  spec: Spec | null;
  onReset: () => void;
}

function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 3.5l1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2 1.2-3.3zM18 12.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"
      />
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.5v-1.5a3.5 3.5 0 00-3.5-3.5h-4A3.5 3.5 0 004 18v1.5M9.5 11a3 3 0 100-6 3 3 0 000 6zM20 19.5v-1.25a3 3 0 00-2.25-2.9M14.5 5.1a3 3 0 010 5.8"
      />
    </svg>
  );
}

function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 6h11M8.5 12h11M8.5 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"
      />
    </svg>
  );
}

function FlowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66M17 4v3h-3M7 20v-3h3"
      />
    </svg>
  );
}

function ServerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5h16v5H4v-5zM4 13.5h16v5H4v-5zM7.5 8h.01M7.5 16h.01"
      />
    </svg>
  );
}

function ClipboardCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a1.5 1.5 0 00-1.5 1.5v12A1.5 1.5 0 007 20h10a1.5 1.5 0 001.5-1.5v-12A1.5 1.5 0 0017 5h-2M9 5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 5v0a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 5v0zM9 13l2 2 4-4"
      />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a1.5 1.5 0 00-1.5 1.5v12A1.5 1.5 0 007 20h10a1.5 1.5 0 001.5-1.5v-12A1.5 1.5 0 0017 5h-2M9 5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 5v0a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 5v0z"
      />
    </svg>
  );
}

function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v11m0 0l-3.5-3.5M12 15l3.5-3.5M5 17v1.5A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5V17"
      />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h5M20 20v-5h-5M4.5 15a8 8 0 0014.75 3.36M19.5 9A8 8 0 004.75 5.64"
      />
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-card-border bg-white/60 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hero-start text-accent">
        <SparklesIcon className="h-6 w-6" />
      </span>
      <p className="text-sm font-semibold text-ink">
        Tu especificación técnica está a un paso
      </p>
      <p className="max-w-sm text-sm text-muted">
        Contanos tu idea arriba y en segundos vas a tener un documento
        completo, listo para compartir con cualquier desarrollador.
      </p>
    </div>
  );
}

interface SectionProps {
  id: string;
  icon: ReactNode;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function Section({ id, icon, title, open, onToggle, children }: SectionProps) {
  return (
    <div id={id} className="scroll-mt-6 space-y-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-white">
            {icon}
          </span>
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform print:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out print:grid-rows-[1fr] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden print:overflow-visible">{children}</div>
      </div>
    </div>
  );
}

function specToText(spec: Spec): string {
  const users = spec.users
    .map((u) => {
      const cases = u.use_cases.map((c) => `  - ${c}`).join("\n");
      return `${u.type}\n${u.description}\n${cases}`;
    })
    .join("\n\n");

  const features = spec.features
    .map((group) => {
      const items = group.items.map((item) => `  - ${item}`).join("\n");
      return `${group.area}\n${items}`;
    })
    .join("\n\n");

  const flows = spec.flows
    .map((flow, i) => {
      const steps = flow.steps.map((step, j) => `  ${j + 1}. ${step}`).join("\n");
      return `${i + 1}. ${flow.name}\n${steps}\n   Flujo de error: ${flow.error_path}`;
    })
    .join("\n\n");

  const technologies = spec.architecture.technologies.map((t) => `- ${t}`).join("\n");
  const included = spec.requirements.included.map((r) => `- ${r}`).join("\n");
  const excluded = spec.requirements.excluded.map((r) => `- ${r}`).join("\n");

  return `VISIÓN DEL PRODUCTO
${spec.vision}

USUARIOS Y CASOS DE USO
${users}

FUNCIONALIDADES
${features}

FLUJOS DE USUARIO
${flows}

ARQUITECTURA
Tecnologías:
${technologies}

Flujo de datos:
${spec.architecture.data_flow}

REQUISITOS
Incluido en el MVP:
${included}

Fuera de alcance:
${excluded}`;
}

function specToMarkdown(spec: Spec): string {
  const lines: string[] = [];

  lines.push("# Especificación técnica", "");

  lines.push("## Visión del producto", "", spec.vision, "");

  lines.push("## Usuarios y casos de uso", "");
  spec.users.forEach((user) => {
    lines.push(`### ${user.type}`, "", user.description, "");
    user.use_cases.forEach((useCase) => lines.push(`- ${useCase}`));
    lines.push("");
  });

  lines.push("## Funcionalidades", "");
  spec.features.forEach((group) => {
    lines.push(`### ${group.area}`, "");
    group.items.forEach((item) => lines.push(`- ${item}`));
    lines.push("");
  });

  lines.push("## Flujos de usuario", "");
  spec.flows.forEach((flow, i) => {
    lines.push(`### ${i + 1}. ${flow.name}`, "");
    flow.steps.forEach((step, j) => lines.push(`${j + 1}. ${step}`));
    lines.push("", `> **Flujo de error:** ${flow.error_path}`, "");
  });

  lines.push("## Arquitectura", "", "### Tecnologías", "");
  spec.architecture.technologies.forEach((tech) => lines.push(`- ${tech}`));
  lines.push("", "### Flujo de datos", "", spec.architecture.data_flow, "");

  lines.push("## Requisitos", "", "### Incluido en el MVP", "");
  spec.requirements.included.forEach((item) => lines.push(`- [ ] ${item}`));
  lines.push("", "### Fuera de alcance", "");
  spec.requirements.excluded.forEach((item) => lines.push(`- ${item}`));
  lines.push("");

  return lines.join("\n");
}

const TOC = [
  { id: "usuarios", label: "Usuarios" },
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "flujos", label: "Flujos" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "requisitos", label: "Requisitos" },
];

export default function SpecOutput({ spec, onReset }: SpecOutputProps) {
  const [copied, setCopied] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    usuarios: true,
    funcionalidades: true,
    flujos: true,
    arquitectura: true,
    requisitos: true,
  });

  if (!spec) {
    return <EmptyState />;
  }

  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function goToSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: true }));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(specToText(spec as Spec));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download(content: string, filename: string, mime: string) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleDownloadTxt() {
    download(
      specToText(spec as Spec),
      "especificacion-tecnica.txt",
      "text/plain;charset=utf-8",
    );
  }

  function handleDownloadMd() {
    download(
      specToMarkdown(spec as Spec),
      "especificacion-tecnica.md",
      "text/markdown;charset=utf-8",
    );
  }

  function handleDownloadPdf() {
    // The browser uses document.title as the default "Save as PDF" filename.
    const previousTitle = document.title;
    document.title = "especificacion-tecnica";
    const restore = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  }

  return (
    <section className="motion-reduce:animate-none animate-[fade-in-up_0.4s_ease-out] space-y-6">
      <h1 className="hidden text-2xl font-bold tracking-tight text-zinc-900 print:block">
        Especificación técnica
      </h1>
      <div className="flex items-center justify-between print:hidden">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Especificación generada
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
        >
          <RefreshIcon className="h-3.5 w-3.5" />
          Probar con otra idea
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-accent-hover to-ink p-8 text-white shadow-lg print:break-inside-avoid print:border print:border-zinc-300 print:bg-none print:text-zinc-900 print:shadow-none">
        <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl print:hidden" />
        <span className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-hero-end/25 blur-2xl print:hidden" />
        <div className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-hero-end print:text-accent">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 print:hidden">
            <SparklesIcon className="h-4 w-4" />
          </span>
          Visión del producto
        </div>
        <p className="relative mt-4 text-lg leading-relaxed">{spec.vision}</p>
      </div>

      <nav className="flex flex-wrap gap-2 print:hidden">
        {TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              goToSection(item.id);
            }}
            className="rounded-full border border-card-border bg-white px-3 py-1 text-xs font-medium text-muted shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Section
        id="usuarios"
        icon={<UsersIcon className="h-4 w-4" />}
        title="Usuarios y casos de uso"
        open={openSections.usuarios}
        onToggle={() => toggleSection("usuarios")}
      >
        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          {spec.users.map((user) => (
            <div key={user.type} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm print:break-inside-avoid">
              <p className="text-sm font-semibold text-zinc-900">{user.type}</p>
              <p className="mt-1 text-sm text-zinc-600">{user.description}</p>
              <ul className="mt-3 space-y-1.5">
                {user.use_cases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2 text-sm text-zinc-600">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="funcionalidades"
        icon={<ListIcon className="h-4 w-4" />}
        title="Funcionalidades"
        open={openSections.funcionalidades}
        onToggle={() => toggleSection("funcionalidades")}
      >
        <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm print:break-inside-avoid">
          {spec.features.map((group) => (
            <div key={group.area}>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {group.area}
              </p>
              <ul className="mt-2 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="flujos"
        icon={<FlowIcon className="h-4 w-4" />}
        title="Flujos de usuario"
        open={openSections.flujos}
        onToggle={() => toggleSection("flujos")}
      >
        <div className="space-y-3 pt-1">
          {spec.flows.map((flow, i) => (
            <div key={flow.name} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm print:break-inside-avoid">
              <p className="text-sm font-semibold text-zinc-900">
                {i + 1}. {flow.name}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Flujo principal
              </div>
              <ol className="mt-2">
                {flow.steps.map((step, j) => {
                  const isLast = j === flow.steps.length - 1;
                  return (
                    <li key={step} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white print:border print:border-emerald-600 print:bg-white print:text-emerald-700">
                          {j + 1}
                        </span>
                        {!isLast && <span className="my-1 w-px flex-1 bg-emerald-200" />}
                      </div>
                      <span className={`text-sm text-zinc-600 ${isLast ? "pb-0" : "pb-3"} pt-0.5`}>
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                <span>
                  <span className="font-semibold">Flujo de error:</span> {flow.error_path}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="arquitectura"
        icon={<ServerIcon className="h-4 w-4" />}
        title="Arquitectura"
        open={openSections.arquitectura}
        onToggle={() => toggleSection("arquitectura")}
      >
        <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm print:break-inside-avoid">
          <div className="flex flex-wrap gap-2">
            {spec.architecture.technologies.map((tech) => {
              const separatorIndex = tech.indexOf(":");
              const layer = separatorIndex === -1 ? null : tech.slice(0, separatorIndex);
              const label = separatorIndex === -1 ? tech : tech.slice(separatorIndex + 1).trim();
              return (
                <span
                  key={tech}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                >
                  {layer && <span className="font-semibold text-accent">{layer}: </span>}
                  {label}
                </span>
              );
            })}
          </div>
          <p className="text-sm text-zinc-600">{spec.architecture.data_flow}</p>
        </div>
      </Section>

      <Section
        id="requisitos"
        icon={<ClipboardCheckIcon className="h-4 w-4" />}
        title="Requisitos"
        open={openSections.requisitos}
        onToggle={() => toggleSection("requisitos")}
      >
        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 print:break-inside-avoid">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Incluido en el MVP
            </p>
            <ul className="mt-2 space-y-1.5">
              {spec.requirements.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50/60 p-4 print:break-inside-avoid">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
              Fuera de alcance
            </p>
            <ul className="mt-2 space-y-1.5">
              {spec.requirements.excluded.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                  <XIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="space-y-3 print:hidden">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold shadow-sm transition-colors ${
            copied
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
          }`}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
          {copied ? "¡Copiado en el portapapeles!" : "Copiar especificación completa"}
        </button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-colors hover:border-zinc-400 sm:flex-1"
          >
            <DownloadIcon className="h-4 w-4" />
            Descargar como .txt
          </button>

          <button
            type="button"
            onClick={handleDownloadMd}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-colors hover:border-zinc-400 sm:flex-1"
          >
            <DownloadIcon className="h-4 w-4" />
            Descargar como .md
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-colors hover:border-zinc-400 sm:flex-1"
          >
            <DownloadIcon className="h-4 w-4" />
            Descargar como PDF
          </button>
        </div>
      </div>
    </section>
  );
}
