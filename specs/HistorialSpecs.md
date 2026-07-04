# Feature: Historial de proyectos en localStorage

## Qué hace
Persiste cada especificación generada en `localStorage` y añade un panel lateral que lista los proyectos guardados. Desde el panel el usuario puede seleccionar una spec anterior (restaura la vista completa, incluidos los botones de exportar), renombrarla, eliminarla y empezar una idea nueva. La persistencia es **solo-cliente** (no hay backend ni base de datos), respetando la restricción de backend stateless de [CLAUDE.md](../CLAUDE.md).

## Por qué
Hoy cada sesión es efímera: al recargar o generar otra idea, la spec anterior se pierde. Un emprendedor que itera sobre varias ideas —o vuelve al día siguiente— necesita recuperar lo que ya generó sin volver a pagar la generación ni reescribir la idea. El historial convierte la herramienta de "un solo uso" en un espacio de trabajo.

## Observación clave (fundamento del punto 6)
Todo lo que renderiza [SpecOutput.tsx](../components/SpecOutput.tsx) —incluidos Copiar, `.txt`, `.md` y PDF— es una **función pura del objeto `Spec`**: `specToText`, `specToMarkdown`, `handleDownloadPdf` y `handleCopy` derivan del `spec` en el momento del click. No hay estado oculto ligado a la generación. Por eso restaurar es `setSpec(entry.spec)` y los exports vuelven a funcionar idénticos por construcción.

## 1. Esquema de datos en localStorage
- Clave única: `"spec-builder:history:v1"` (el sufijo `v1` habilita migraciones futuras).
- Valor: `SavedSpec[]` serializado con `JSON.stringify`, **más reciente primero**, con cota de **50** entradas (se descarta la cola para no chocar con la cuota de localStorage).
- Cada entrada:
  - `id: string` — `crypto.randomUUID()`.
  - `name: string` — nombre editable; se autocompleta al guardar derivándolo del `idea`.
  - `idea: string` — descripción original que generó la spec.
  - `createdAt: string` — ISO 8601.
  - `updatedAt: string` — ISO 8601, se actualiza al renombrar.
  - `spec: Spec` — el objeto `Spec` completo tal como se generó.

## 2. Funciones de acceso (`lib/history.ts`)
Con guard de SSR (`typeof window === "undefined"`) y `try/catch` en cada I/O; ninguna lanza (fallan a un valor seguro). Validan la forma al leer y descartan entradas corruptas.
- `listSpecs(): SavedSpec[]`
- `getSpec(id): SavedSpec | null`
- `saveSpec({ name, idea, spec }): SavedSpec` — antepone, aplica cota, devuelve la entrada creada (con su `id`).
- `renameSpec(id, name): SavedSpec[]` — actualiza `name` + `updatedAt`, devuelve la lista nueva.
- `deleteSpec(id): SavedSpec[]` — devuelve la lista nueva.

## 3. Punto de guardado
Único punto: en [app/page.tsx](../app/page.tsx), en el handler que recibe el resultado del `SpecForm`. Se guarda **una sola vez por generación exitosa** (frame `done` del stream), nunca en errores ni en deltas. Requiere que `SpecForm` suba también el `idea` junto al `spec`.

## 4. Componente nuevo: `HistorySidebar.tsx`
Client component, Tailwind, mobile-first (columna fija en desktop, drawer togglable en mobile). Props:
`entries`, `activeId`, `onSelect(id)`, `onRename(id, name)`, `onDelete(id)`, `onNew()`, `open`, `onToggle()`. No accede a localStorage: todo pasa por callbacks; la fuente de verdad vive en `page.tsx`.

## 5. Componentes modificados
- [app/page.tsx](../app/page.tsx): pasa a orquestador del historial (estados `entries`, `activeId`; carga inicial; handlers de save/select/rename/delete/new; layout con sidebar).
- [components/SpecForm.tsx](../components/SpecForm.tsx): firma del callback `onResult(spec)` → `onResult(spec, idea)`.
- [components/SpecOutput.tsx](../components/SpecOutput.tsx): **sin cambios funcionales** — mantenerlo puro respecto a `spec` es lo que hace trivial la restauración.

## 6. Restauración exacta (incluidos los export)
1. La salida es determinística respecto a `spec`: restaurar = `setSpec(getSpec(id)!.spec)`.
2. Igualdad estructural garantizada: se recupera el mismo `Spec`; la lectura valida la forma y descarta entradas corruptas, así nunca se restaura algo que rompa el render o los exports.
3. Reset del estado transitorio: se fuerza remonte de la salida con una `key` (patrón `formKey` ya presente) para que `openSections`/`copied` vuelvan a su valor por defecto.
4. PDF/Copiar/`.txt`/`.md` siguen funcionando porque dependen solo del DOM renderizado desde `spec` y de `document.title`, no de la generación.

## No incluye
- No incluye backend, base de datos ni sincronización entre dispositivos — la persistencia es solo-cliente en localStorage.
- No incluye autenticación ni proyectos por usuario.
- No incluye "regenerar" ni editar una spec guardada — el historial es de solo lectura sobre el `spec` (salvo renombrar/eliminar).
- No incluye export/import del historial a archivo ni compartir por link.
- No incluye cambios al endpoint `/api/generate-spec`, al `SPEC_SYSTEM_PROMPT` ni al esquema `Spec`.
- No incluye paginación ni búsqueda dentro del historial (más allá de la cota de 50 entradas).
