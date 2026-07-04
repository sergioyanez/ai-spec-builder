# Feature: Exportar spec como archivo Markdown

## Qué hace
Añade un botón "Descargar como .md" junto al botón existente "Descargar como .txt" en [SpecOutput.tsx](components/SpecOutput.tsx#L531-L538). Genera una nueva función `specToMarkdown(spec)` que convierte el objeto `Spec` a Markdown real (encabezados `#`/`##`, listas con `-`, checkboxes donde aplique) y dispara la descarga del archivo `especificacion-tecnica.md` vía Blob, igual que `handleDownload` ya hace para `.txt`.

## Por qué
La spec generada está pensada para compartirse con un desarrollador. Un `.txt` plano se pega mal en GitHub/Notion/Linear (pierde jerarquía visual); un `.md` se renderiza con formato en cualquier herramienta que el dev ya usa, sin trabajo extra del usuario no técnico.

## Criterios de aceptación
- [ ] Existe un botón "Descargar como .md" visible junto al botón "Descargar como .txt", habilitado solo cuando hay una spec generada
- [ ] Al hacer click, descarga un archivo `especificacion-tecnica.md` con el contenido completo de la spec (visión, usuarios, funcionalidades, flujos, arquitectura, requisitos)
- [ ] El archivo usa sintaxis Markdown válida: `#`/`##` para secciones, `-` para listas, `1.` para pasos de flujo — de forma que se vea bien renderizado en GitHub/VSCode
- [ ] El botón `.txt` existente sigue funcionando sin cambios
- [ ] Funciona en mobile (mismo mecanismo de descarga que ya usa `handleDownload`, sin dependencias nuevas)

## No incluye
- No incluye exportar a PDF, Word, ni ningún otro formato — solo `.md`
- No incluye subir/guardar el archivo en ningún servicio externo (Google Drive, GitHub, etc.) — solo descarga local
- No incluye edición del contenido antes de exportar — el Markdown refleja exactamente la spec ya generada
- No incluye cambios al endpoint `/api/generate-spec` ni al modelo de datos `Spec` — es puramente una transformación en el cliente
- No incluye botón de "compartir" (email, link, etc.) — solo descarga de archivo
