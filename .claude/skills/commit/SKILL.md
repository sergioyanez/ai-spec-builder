# /commit

Genera un commit con mensaje en formato Conventional Commits.

1. Revisa los cambios staged con `git diff --staged`
2. Si no hay nada staged, revisa `git status` y añade los archivos relevantes con `git add`
3. Analiza qué tipo de cambio es:
   - `feat:` — nueva funcionalidad
   - `fix:` — corrección de bug
   - `chore:` — mantenimiento, dependencias, configuración
   - `refactor:` — mejora de código sin cambio de comportamiento
   - `docs:` — documentación
   - `test:` — tests
   - `style:` — formato, sin cambio lógico
4. Genera el mensaje: `tipo(scope): descripción en infinitivo, en español, máximo 72 caracteres`
5. Ejecuta el commit con ese mensaje

Ejemplo de mensaje correcto: `feat(auth): añadir validación de email en el formulario de registro`

NO hagas el commit directamente. Espera confirmación.