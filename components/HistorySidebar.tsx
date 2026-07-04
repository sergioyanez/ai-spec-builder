"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import type { SavedSpec } from "@/lib/types";

interface HistorySidebarProps {
  entries: SavedSpec[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  open: boolean;
  onToggle: () => void;
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function PencilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 4.5l3 3L8 19l-4 1 1-4L16.5 4.5z"
      />
    </svg>
  );
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 7h14M10 7V5.5A1.5 1.5 0 0111.5 4h1A1.5 1.5 0 0114 5.5V7m2 0v11.5A1.5 1.5 0 0114.5 20h-5A1.5 1.5 0 018 18.5V7"
      />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

interface EntryRowProps {
  entry: SavedSpec;
  active: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

function EntryRow({ entry, active, onSelect, onRename, onDelete }: EntryRowProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commit() {
    const next = draft.trim();
    if (next && next !== entry.name) {
      onRename(entry.id, next);
    } else {
      setDraft(entry.name);
    }
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="rounded-lg border border-indigo-300 bg-white p-2 shadow-sm">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft(entry.name);
              setEditing(false);
            }
          }}
          maxLength={60}
          className="w-full rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-900 focus:border-indigo-400 focus:outline-none"
        />
      </li>
    );
  }

  return (
    <li>
      <div
        className={`group flex items-start gap-2 rounded-lg border px-3 py-2 transition-colors ${
          active
            ? "border-indigo-300 bg-indigo-50"
            : "border-transparent hover:border-zinc-200 hover:bg-white"
        }`}
      >
        <button
          type="button"
          onClick={() => onSelect(entry.id)}
          aria-current={active ? "true" : undefined}
          className="min-w-0 flex-1 text-left"
        >
          <p
            className={`truncate text-sm font-medium ${
              active ? "text-indigo-900" : "text-zinc-700"
            }`}
          >
            {entry.name}
          </p>
          <span className="mt-0.5 flex items-center gap-1 text-xs text-zinc-400">
            <ClockIcon className="h-3 w-3" />
            {formatDate(entry.createdAt)}
          </span>
        </button>
        <div className="flex flex-shrink-0 items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              setDraft(entry.name);
              setEditing(true);
            }}
            aria-label={`Renombrar ${entry.name}`}
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <PencilIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  `¿Eliminar "${entry.name}" del historial? Esta acción no se puede deshacer.`
                )
              ) {
                onDelete(entry.id);
              }
            }}
            aria-label={`Eliminar ${entry.name}`}
            className="rounded-md p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default function HistorySidebar({
  entries,
  activeId,
  onSelect,
  onRename,
  onDelete,
  onNew,
  open,
  onToggle,
}: HistorySidebarProps) {
  const panel = (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Tus proyectos
        </h2>
        <span className="text-xs text-zinc-400">{entries.length}</span>
      </div>

      <button
        type="button"
        onClick={onNew}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-indigo-300 bg-white px-3 py-2 text-sm font-medium text-indigo-600 transition-colors hover:border-indigo-400 hover:bg-indigo-50"
      >
        <PlusIcon className="h-4 w-4" />
        Nueva idea
      </button>

      {entries.length === 0 ? (
        <p className="text-sm text-zinc-400">
          Las especificaciones que generes aparecerán aquí, guardadas en este
          navegador.
        </p>
      ) : (
        <ul className="flex-1 space-y-1 overflow-y-auto">
          {entries.map((entry) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              active={entry.id === activeId}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm lg:hidden"
        aria-expanded={open}
      >
        <ClockIcon className="h-4 w-4" />
        Historial ({entries.length})
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-zinc-900/40"
            onClick={onToggle}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[80vw] overflow-y-auto bg-zinc-50 p-4 shadow-xl">
            {panel}
          </aside>
        </div>
      )}

      {/* Desktop fixed column */}
      <aside className="hidden w-64 flex-shrink-0 lg:block">
        <div className="sticky top-6">{panel}</div>
      </aside>
    </>
  );
}
