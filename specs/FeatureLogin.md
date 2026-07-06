# Feature: Autenticación con Clerk

## Qué hace
Añade autenticación de usuarios usando **Clerk** (`@clerk/nextjs`). El usuario debe iniciar sesión para poder generar una spec; las rutas de API de generación quedan protegidas y rechazan peticiones sin sesión. Se añade un control de sesión en la cabecera (avatar / botón de login). El **historial sigue en localStorage tal cual** — este feature no toca la persistencia ni la asocia a usuarios (ver [FeatureHistorialSpecs.md](./FeatureHistorialSpecs.md)).

## Por qué
Hoy cualquiera puede llamar a `/api/generate-spec` de forma anónima; la única protección es un rate limit por IP en memoria ([lib/rateLimit.ts](../lib/rateLimit.ts)), que se resetea en cada cold start y no identifica a nadie. La generación tiene coste real (llamadas a Claude). Autenticar permite: (1) proteger el endpoint de coste, (2) tener una identidad estable por usuario para el rate limit, y (3) sentar la base para futuras features por-usuario. La decisión de stack ya está tomada: **Clerk**.

## Alcance
- **Incluye**: solo autenticación (login/logout/registro), protección de las rutas de generación y UI de sesión.
- **No incluye**: cambios al historial (sigue en localStorage, por navegador, no por usuario). Es una limitación conocida y aceptada para esta tarea.

## Decisiones abiertas (a confirmar antes de implementar)
1. **Alcance del gate** — _recomendado: opción B._
   - **A) Toda la app tras login**: sin sesión se redirige a sign-in; el `matcher` del middleware protege todo salvo rutas de Clerk. Más estricto, más simple.
   - **B) Solo generar** _(recomendado)_: la landing es pública y visible; el login solo se exige al pulsar "Generar" y en `/api/generate-spec`. Protege el coste sin ocultar el producto a un emprendedor que aún no tiene cuenta.
2. **UI de auth** — _recomendado: modal._
   - **A) Modal de Clerk** _(recomendado)_: `<SignInButton mode="modal">` + `<UserButton>`. Mínimo código, sin páginas propias, encaja con la UI limpia y mínima de [CLAUDE.md](../CLAUDE.md).
   - **B) Páginas propias**: rutas `/sign-in` y `/sign-up` con `<SignIn/>` / `<SignUp/>` embebidos. Más control y URLs propias, algo más de código.

El plan de abajo asume **B (solo generar) + A (modal)**; los pasos marcados con ⟡ cambian si se elige otra combinación.

## 1. Dependencia y variables de entorno
- Instalar `@clerk/nextjs`.
- Variables (server-side las secretas, nunca al browser):
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
- Crear/actualizar `.env.local.example` con ambas claves (placeholder). Documentarlas en la tabla de env de [CLAUDE.md](../CLAUDE.md).
- Con la opción de UI **B** se añadirían además `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `SIGN_UP_URL`; con **A (modal)** no hacen falta.

## 2. Provider en el layout
- Envolver el árbol en `<ClerkProvider>` dentro de [app/layout.tsx](../app/layout.tsx) (raíz, alrededor del `<body>` / `children`). Es un Server Component, compatible con el layout actual.

## 3. Middleware
- Crear `middleware.ts` en la raíz con `clerkMiddleware()` de `@clerk/nextjs/server` y el `config.matcher` estándar de Clerk (excluye estáticos y `_next`, incluye rutas de API).
- ⟡ Con **A (toda la app)**: usar `auth.protect()` para todo salvo rutas públicas de Clerk.
- ⟡ Con **B (solo generar)**: el middleware solo instala Clerk (no fuerza redirect global); la protección real se hace en la ruta de API (paso 4) y en el gating del botón (paso 5).

## 4. Proteger las rutas de API
- En [app/api/generate-spec/route.ts](../app/api/generate-spec/route.ts) (la que usa realmente `SpecForm`): al inicio del `POST`, obtener `const { userId } = await auth()` (de `@clerk/nextjs/server`); si no hay `userId`, devolver `401` con un JSON de error, antes de tocar Claude o el rate limit.
- Repetir en [app/api/generate/route.ts](../app/api/generate/route.ts) si sigue en uso, o eliminarla si es legacy (parece no usada por la UI actual — confirmar).
- **Rate limit por usuario**: cambiar la key de `checkRateLimit` de IP a `userId` en [lib/rateLimit.ts](../lib/rateLimit.ts) call-site, dando un límite estable por persona en vez de por IP compartida.

## 5. UI de sesión
- Cabecera en [app/layout.tsx](../app/layout.tsx) o en [app/page.tsx](../app/page.tsx) usando los componentes de Clerk:
  - `<SignedOut>` → `<SignInButton mode="modal">` (botón "Iniciar sesión").
  - `<SignedIn>` → `<UserButton />` (avatar con menú de logout).
- ⟡ Gating del botón "Generar" en [components/SpecForm.tsx](../components/SpecForm.tsx): si no hay sesión (`useAuth()` / `<SignedOut>`), el submit abre el modal de login en vez de llamar a la API. Así el flujo anónimo no dispara un 401 feo.
- Estilo Tailwind, mobile-first, coherente con la UI mínima existente (sin CSS custom).

## 6. Verificación
- Sin sesión: `POST /api/generate-spec` responde `401`; la UI ofrece login en vez de generar.
- Con sesión: generar funciona igual que hoy; el rate limit cuenta por usuario.
- `UserButton` permite cerrar sesión y volver al estado anónimo.
- El historial en localStorage se comporta idéntico a antes (no se toca).
- `npm run build` y `npm run lint` pasan.

## No incluye
- No asocia el historial al usuario ni lo mueve fuera de localStorage — sigue siendo por-navegador y compartido entre cuentas en el mismo dispositivo (limitación conocida, fuera de scope).
- No añade base de datos, backend con estado ni sincronización entre dispositivos.
- No añade roles, planes de pago, ni gating por features.
- No cambia el `SPEC_SYSTEM_PROMPT`, el esquema `Spec` ni la lógica de generación.
- No implementa organizaciones/equipos de Clerk ni SSO empresarial.
