---
name: commit
description: Revisa los cambios preparados con git diff --staged, identifica el tipo de Conventional Commit y prepara un commit con un mensaje escrito en español. Debe ser invocada explícitamente por el desarrollador.
disable-model-invocation: true
---

# /commit

Genera un commit con mensaje en formato Conventional Commits.

1. Revisa los cambios staged con `git diff --staged`.
2. Si no hay nada staged, revisa `git status` y añade los archivos relevantes con `git add`.
3. Analiza qué tipo de cambio es:
   - `feat:` — nueva funcionalidad
   - `fix:` — corrección de bug
   - `chore:` — mantenimiento, dependencias o configuración
   - `refactor:` — mejora de código sin cambio de comportamiento
   - `docs:` — documentación
   - `test:` — tests
   - `style:` — formato, sin cambio lógico
4. Genera el mensaje con este formato:
   `tipo(scope): descripción en infinitivo, en español, máximo 72 caracteres`
5. Muestra el mensaje propuesto y espera confirmación.
6. Solo después de recibir confirmación, ejecuta el commit con ese mensaje.

Ejemplo de mensaje correcto:

`feat(auth): añadir validación de email en el formulario de registro`

NO hagas el commit directamente. Espera confirmación.