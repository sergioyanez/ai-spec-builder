import type { SavedSpec, Spec } from "@/lib/types";

const STORAGE_KEY = "spec-builder:history:v1";
const MAX_ENTRIES = 50;
const NAME_MAX_LENGTH = 60;

function isBrowser(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Lightweight structural guard so corrupted or outdated entries are dropped on
// read rather than crashing the render or the export buttons downstream.
function isValidSpec(value: unknown): value is Spec {
  if (!isObject(value)) return false;
  const spec = value as Record<string, unknown>;

  if (typeof spec.vision !== "string") return false;

  if (
    !Array.isArray(spec.users) ||
    !spec.users.every(
      (u) =>
        isObject(u) &&
        typeof u.type === "string" &&
        typeof u.description === "string" &&
        isStringArray(u.use_cases)
    )
  ) {
    return false;
  }

  if (
    !Array.isArray(spec.features) ||
    !spec.features.every(
      (f) => isObject(f) && typeof f.area === "string" && isStringArray(f.items)
    )
  ) {
    return false;
  }

  if (
    !Array.isArray(spec.flows) ||
    !spec.flows.every(
      (fl) =>
        isObject(fl) &&
        typeof fl.name === "string" &&
        isStringArray(fl.steps) &&
        typeof fl.error_path === "string"
    )
  ) {
    return false;
  }

  if (
    !isObject(spec.architecture) ||
    !isStringArray((spec.architecture as Record<string, unknown>).technologies) ||
    typeof (spec.architecture as Record<string, unknown>).data_flow !== "string"
  ) {
    return false;
  }

  if (
    !isObject(spec.requirements) ||
    !isStringArray((spec.requirements as Record<string, unknown>).included) ||
    !isStringArray((spec.requirements as Record<string, unknown>).excluded)
  ) {
    return false;
  }

  return true;
}

function isValidEntry(value: unknown): value is SavedSpec {
  if (!isObject(value)) return false;
  return (
    isNonEmptyString(value.id) &&
    typeof value.name === "string" &&
    typeof value.idea === "string" &&
    isNonEmptyString(value.createdAt) &&
    isNonEmptyString(value.updatedAt) &&
    isValidSpec(value.spec)
  );
}

function readAll(): SavedSpec[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
}

function writeAll(list: SavedSpec[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage disabled or quota exceeded — fail silently.
  }
}

/** Derive a short project name from the original idea (fallback to the vision). */
export function deriveName(idea: string, spec: Spec): string {
  const source = idea.trim() || spec.vision.trim() || "Especificación sin título";
  const firstLine = source.split("\n")[0].trim();
  if (firstLine.length <= NAME_MAX_LENGTH) return firstLine;
  return firstLine.slice(0, NAME_MAX_LENGTH).trimEnd() + "…";
}

// --- Reactive store (for React's useSyncExternalStore) -----------------------
// getSnapshot must return a referentially-stable value between mutations, so we
// cache the parsed list and only recompute it when the store actually changes.
const EMPTY: SavedSpec[] = [];
let cache: SavedSpec[] | null = null;
const listeners = new Set<() => void>();

function refreshCache(): void {
  cache = readAll();
}

function emit(): void {
  refreshCache();
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) emit();
  };
  if (isBrowser()) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (isBrowser()) window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): SavedSpec[] {
  if (cache === null) cache = readAll();
  return cache;
}

export function getServerSnapshot(): SavedSpec[] {
  return EMPTY;
}

// --- Access functions --------------------------------------------------------
export function listSpecs(): SavedSpec[] {
  return readAll();
}

export function getSpec(id: string): SavedSpec | null {
  return readAll().find((entry) => entry.id === id) ?? null;
}

export function saveSpec(input: {
  name: string;
  idea: string;
  spec: Spec;
}): SavedSpec {
  const now = new Date().toISOString();
  const entry: SavedSpec = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${now}-${Math.random().toString(36).slice(2)}`,
    name: input.name.trim() || "Especificación sin título",
    idea: input.idea,
    createdAt: now,
    updatedAt: now,
    spec: input.spec,
  };
  const list = [entry, ...readAll()].slice(0, MAX_ENTRIES);
  writeAll(list);
  emit();
  return entry;
}

export function renameSpec(id: string, name: string): void {
  const now = new Date().toISOString();
  const list = readAll().map((entry) =>
    entry.id === id
      ? { ...entry, name: name.trim() || entry.name, updatedAt: now }
      : entry
  );
  writeAll(list);
  emit();
}

export function deleteSpec(id: string): void {
  const list = readAll().filter((entry) => entry.id !== id);
  writeAll(list);
  emit();
}
