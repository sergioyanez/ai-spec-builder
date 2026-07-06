# Feature: Autenticación con Clerk

> Estado: **implementado**. Este documento describe cómo quedó realmente la
> feature (no el plan original). Configurado con la **CLI de Clerk** (`clerk`).

## Qué hace
Añade autenticación con **Clerk** (`@clerk/nextjs`). **Toda la app queda detrás de login**: sin sesión, cualquier ruta redirige a `/sign-in`. El login es por **usuario + contraseña** (sin Google/OAuth ni email). La cabecera muestra los controles de sesión (registrarse / iniciar sesión cuando estás fuera, avatar `UserButton` cuando estás dentro). El **historial sigue en localStorage tal cual** — esta feature no toca la persistencia ni la asocia a usuarios (ver [FeatureHistorialSpecs.md](./FeatureHistorialSpecs.md)).

## Por qué
Antes cualquiera podía llamar a `/api/generate-spec` de forma anónima; la única protección era un rate limit por IP en memoria ([lib/rateLimit.ts](../lib/rateLimit.ts)), que se resetea en cada cold start y no identifica a nadie. La generación tiene coste real (llamadas a Claude). Autenticar protege el endpoint de coste y sienta la base para futuras features por-usuario. La decisión de stack fue **Clerk**.

## Decisiones finales (cómo quedó)
- **Alcance del gate: toda la app.** El middleware protege todas las rutas salvo `/sign-in` y `/sign-up`. Se eligió por simplicidad (es lo que scaffolda `clerk init`).
- **Método de login: username + contraseña**, sin email ni proveedores sociales. Se descartó guardar credenciales en `.env.local` (Clerk guarda la contraseña hasheada en sus servidores; `.env.local` solo lleva las API keys).
- **UI de auth: páginas propias** `/sign-in` y `/sign-up` (generadas por `clerk init`), más controles en la cabecera del layout.

## Cómo se instaló (CLI de Clerk)
```bash
npm install -g clerk                      # CLI (v1.5.0)
clerk auth login                          # login como sergiomyanez01@gmail.com
clerk init --framework next --pm npm      # scaffolding: SDK, provider, proxy.ts, sign-in/up, env
clerk doctor                              # verificación de setup
```
`clerk init` instaló `@clerk/nextjs`, añadió las claves a `.env.local`, y generó los archivos del punto siguiente.

## Archivos y config
1. **`proxy.ts`** (raíz) — es el middleware de Next 16 (nombre nuevo de `middleware.ts`). Usa `clerkMiddleware()` + `auth.protect()` sobre toda ruta que no sea pública; `createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])` define las públicas. Esto es lo que protege también `/api/*`, así que **los route handlers no necesitan un chequeo de `auth()` propio**.
2. **[app/layout.tsx](../app/layout.tsx)** — `<ClerkProvider>` dentro de `<body>` (no envolviendo `<html>`). Cabecera con:
   - `<Show when="signed-out">` → `<SignInButton mode="modal">` + `<SignUpButton mode="modal">`.
   - `<Show when="signed-in">` → `<UserButton />`.
   - Tailwind, mobile-first, sin CSS custom.
3. **`app/sign-in/[[...sign-in]]/page.tsx`** y **`app/sign-up/[[...sign-up]]/page.tsx`** — páginas de auth generadas por Clerk.
4. **Variables en `.env.local`** (nunca en git; en Render se cargan a mano):
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `SIGN_UP_URL` (+ fallback redirect URLs)

## Config de la instancia de Clerk (development)
Aplicada con `clerk config patch` sobre la instancia de **desarrollo**:
- `auth_username`: `used_for_sign_in`, `used_for_sign_up`, `required_for_sign_up` → **true**.
- `auth_email`: `used_for_sign_in`, `used_for_sign_up`, `required_for_sign_up` → **false**.
- `auth_password.enabled` → **true** (ya venía así).
- `connection_oauth_google.enabled` → **false** (venía activado por defecto y por eso el primer login entró con Google sin pedir contraseña).

Usuario final creado (registro por navegador): `username = sergioyanez`, `password_enabled = true`, sin email ni cuentas externas.

## Verificación (hecha)
- `npm run build` compila; rutas `/`, `/sign-in`, `/sign-up`, `/api/*` y el Proxy (middleware) presentes.
- `GET /` sin sesión → **307** a `/sign-in?redirect_url=...`.
- `GET /api/generate-spec` sin sesión → **307** (protegida por el middleware).
- `clerk doctor` → todo OK (keys presentes, app alcanzable).
- `clerk users list` → un único usuario `sergioyanez` con contraseña, sin Google.

## Notas para producción / Render
- `.env.local` **no se despliega**. En Render, cargar `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` y `ANTHROPIC_API_KEY` en el panel (Environment). Build: `npm install && npm run build`; Start: `npm start`.
- Toda la config anterior vive en la instancia de **desarrollo** (`pk_test_`/`sk_test_`). En una URL `*.onrender.com` se pueden usar las keys de dev. Para una **instancia de producción** (dominio propio, `pk_live_`/`sk_live_`) hay que **replicar** la config y recrear el usuario:
  ```bash
  clerk config patch --instance prod --file <patch>.json --yes
  clerk users create --instance prod --username sergioyanez --password '••••' --yes
  ```
- Como la cuenta no tiene email, **no hay flujo de "olvidé mi contraseña"**; se resetea vía CLI/dashboard:
  `clerk api -X PATCH /users/<id> -d '{"password":"..."}'`.

## No incluye
- No asocia el historial al usuario ni lo mueve fuera de localStorage — sigue siendo por-navegador y compartido entre cuentas en el mismo dispositivo (limitación conocida, fuera de scope).
- No añade base de datos, backend con estado ni sincronización entre dispositivos.
- No añade chequeo de `auth()` dentro de los route handlers ni rate limit por `userId` (el middleware ya protege todo; el rate limit sigue por IP en [lib/rateLimit.ts](../lib/rateLimit.ts)).
- No cambia el `SPEC_SYSTEM_PROMPT`, el esquema `Spec` ni la lógica de generación.
- No implementa organizaciones/equipos de Clerk, MFA ni SSO empresarial.
- No configura una instancia de producción de Clerk (solo development).
