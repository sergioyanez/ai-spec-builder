# Feature: Exportar spec como archivo PDF

## Qué hace
Añade un botón "Descargar como PDF" en la fila de exportación de [SpecOutput.tsx](../components/SpecOutput.tsx), junto a los de `.txt` y `.md`. Al accionarlo genera un PDF con el contenido completo de la spec (visión, usuarios, funcionalidades, flujos, arquitectura, requisitos). La generación ocurre en el cliente vía **print-to-PDF nativo** (opción A): estilos `@media print` con la variante `print:` de Tailwind + `window.print()`; el usuario elige "Guardar como PDF" en el diálogo del navegador. Cero dependencias nuevas.

## Por qué
El PDF es el formato que un usuario no técnico espera para "un documento": se abre en cualquier dispositivo sin herramientas de dev, se adjunta a un email o se imprime tal cual. `.txt`/`.md` sirven para el desarrollador; el PDF sirve para presentar la idea a socios, clientes o inversores.

## Criterios de aceptación
- [ ] Existe un botón "Descargar como PDF" en la fila de exportación, habilitado solo cuando hay una spec generada
- [ ] Al accionarlo se obtiene un PDF con **todo** el contenido de la spec, con jerarquía visual legible (títulos de sección, listas, flujos numerados)
- [ ] El nombre del archivo resultante es `especificacion-tecnica.pdf` (vía `document.title`)
- [ ] Los botones `.txt` y `.md` existentes siguen funcionando sin cambios
- [ ] Funciona en mobile (o degrada de forma clara si la vía elegida no lo soporta bien)
- [ ] El contenido no se corta ni se solapa entre páginas del PDF (`break-inside-avoid` en las tarjetas)

## No incluye
- No incluye estilos de marca a medida (logo, portada, colores corporativos, headers/footers por página) — solo un layout limpio y legible
- No incluye generación de PDF en el servidor ni un nuevo endpoint — es puramente cliente
- No incluye edición del contenido antes de exportar — refleja exactamente la spec ya generada
- No incluye otros formatos (Word, PPT) ni envío por email / compartir link — solo descarga local del PDF
- No incluye cambios al endpoint `/api/generate-spec` ni al modelo `Spec`
- No incluye control de paginación avanzado (saltos de página manuales por sección, numeración de páginas) más allá de evitar cortes de contenido
- No incluye librerías cliente de PDF (jsPDF / react-pdf) — se descartó la opción (B) a favor del print nativo
