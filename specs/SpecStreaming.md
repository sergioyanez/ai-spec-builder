# Feature: Streaming de la generación de la spec

## Qué hace
Muestra la especificación apareciendo de forma progresiva mientras el modelo la genera —eliminando los 10-15 s de pantalla en silencio— en lugar de aparecer toda de golpe al final. La API route [/api/generate-spec](../app/api/generate-spec/route.ts) pasa de `anthropic.messages.create` a `anthropic.messages.stream` y devuelve un stream HTTP (NDJSON) que reenvía cada delta de texto del modelo al navegador. Al cerrar el stream, el texto acumulado en el servidor se parsea (`extractJson` → `JSON.parse`) y se valida con `isValidSpec` —la misma puerta única de hoy— y se emite un frame final `done` con la `spec` validada, o un frame `error`. El frontend ([SpecForm.tsx](../components/SpecForm.tsx)) muestra el texto en vivo en una vista de progreso y, al recibir `done`, renderiza la estructura definitiva en [SpecOutput.tsx](../components/SpecOutput.tsx).

## Por qué
El problema no es la velocidad real sino la **percepción de inactividad**: el usuario no sabe si el sistema está trabajando o colgado. El feedback en tiempo real (como claude.ai) transmite progreso desde el primer segundo, reduce el abandono y la sensación de lentitud sin cambiar el tiempo total de generación.

## Criterios de aceptación
- [ ] Al pulsar "Generar especificación", el usuario ve contenido apareciendo de forma incremental en menos de ~2 s, no una pantalla estática de 10-15 s.
- [ ] El backend usa la API de streaming de Anthropic (`messages.stream`) y expone la respuesta como stream HTTP; no hace `await` del mensaje completo antes de empezar a responder.
- [ ] **Al cerrar el stream, el texto acumulado se parsea y pasa `isValidSpec` antes de mostrarse como spec final** — el streaming no rompe la estructura JSON.
- [ ] Si el JSON final es inválido o el stream se corta, se muestra un error controlado y no queda contenido parcial presentado como spec válida.
- [ ] La spec final renderizada es idéntica en estructura a la actual (mismo objeto `Spec`, mismas 5 secciones).
- [ ] Los botones Copiar, `.txt`, `.md` y PDF siguen funcionando sobre la spec final, sin cambios.
- [ ] Se preservan las protecciones actuales: rate limit (429), validación/sanitización de `description`, límites de longitud y manejo de errores del servicio de IA.
- [ ] El estado de carga de `SpecForm` se adapta al streaming (indicador de progreso en lugar de spinner ciego).

## No incluye
- No se cambia el esquema `Spec`, el `SPEC_SYSTEM_PROMPT` ni el modelo (`claude-sonnet-4-6`).
- No se renderiza JSON crudo ni "cards a medio construir" con parsing incremental campo a campo; la validación estructural ocurre solo al cierre del stream (la vista en vivo es un panel de progreso, no la spec final).
- No se añade persistencia, reanudación de streams cortados ni botón "Stop" para cancelar.
- No se toca `/api/generate` (route heredado) ni el sistema de exportación.
- No se añade autenticación, base de datos ni WebSockets.
- No se rediseñan las secciones de la spec ni el layout de `SpecOutput`.
- No se modifican los límites de rate limiting ni de longitud de input.
