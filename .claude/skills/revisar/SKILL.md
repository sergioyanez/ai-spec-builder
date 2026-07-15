---
name: revisar
description: Revisa la coherencia entre el código modificado recientemente y las specs del proyecto. Lee CLAUDE.md y las specs (specs/ y openspec/specs/), inspecciona los archivos cambiados, y reporta inconsistencias con sugerencias de corrección. No modifica nada automáticamente.
disable-model-invocation: true
---

# /revisar

Revisa que el código modificado recientemente sea coherente con las specs del proyecto.
Esta skill **solo analiza y sugiere**: nunca edita archivos ni corrige automáticamente.

## Pasos

1. **Leer el contexto del proyecto**
   - Lee `CLAUDE.md` (y `.claude/CLAUDE.md` si existe) para entender stack, restricciones,
     estructura esperada y comportamientos clave.
   - Lee las specs del proyecto:
     - `specs/*.md` — specs de features en lenguaje natural.
     - `openspec/specs/**/spec.md` — specs canónicas de OpenSpec (requisitos + escenarios).
   - Si el usuario indicó una spec o feature concreta, céntrate en ella; si no, considera todas.

2. **Identificar los archivos modificados recientemente**
   - Cambios sin commitear:
     ```bash
     git status --short
     git diff --stat
     ```
   - Últimos commits (si no hay cambios sin commitear):
     ```bash
     git diff --stat HEAD~1 HEAD
     ```
   - Lee el contenido relevante de cada archivo cambiado (no solo el diff) para entender su comportamiento actual.

3. **Comparar código contra spec**
   Para cada archivo/comportamiento modificado, contrasta con lo que dictan CLAUDE.md y las specs:
   - ¿El comportamiento implementado coincide con los requisitos y escenarios de la spec?
   - ¿Se respetan las restricciones del proyecto (p. ej. sin base de datos, auth vía Clerk, modelo de Claude indicado, Tailwind sin CSS propio, todo el código en inglés)?
   - ¿La estructura de archivos coincide con la documentada?
   - ¿Hay requisitos de la spec que el código no cumple, o comportamiento en el código que la spec no contempla?

4. **Listar inconsistencias**
   Presenta un listado claro. Para cada hallazgo incluye:
   - **Archivo y línea** (`ruta:línea`) cuando aplique.
   - **Spec o regla** que se incumple (cita el requisito/escenario o la sección de CLAUDE.md).
   - **Descripción** concreta de la discrepancia.
   - **Severidad**: alta (incumple un requisito/restricción) · media · baja (estilo/detalle).

5. **Sugerir correcciones (sin aplicarlas)**
   Para cada inconsistencia, propón qué cambiar y en qué dirección (código → alinear con spec, o spec → actualizar si el código es correcto).
   **No edites archivos.** Termina ofreciendo aplicar las correcciones solo si el usuario lo pide.

## Salida

```
## Revisión: código vs. spec

**Archivos revisados:** <lista>
**Specs consultadas:** <lista>

### Inconsistencias
1. [alta] `ruta:línea` — <descripción>
   - Spec: <requisito/regla incumplida>
   - Sugerencia: <qué corregir>
2. ...

### Sin problemas
- <comportamientos verificados que sí coinciden>

Ninguna corrección fue aplicada. Decime si querés que corrija algún punto.
```

## Guardas

- Nunca modifiques archivos: esta skill es de solo lectura y análisis.
- Si no encontrás una spec para un archivo cambiado, indícalo como hallazgo ("sin spec asociada").
- Si no hay archivos modificados, decilo y no inventes hallazgos.
- Prioriza incumplimientos de requisitos y restricciones del proyecto sobre detalles de estilo.
