# Feature: Home page pública

> Estado: **propuesta**. Mini-spec de 4 campos. Depende de la auth ya
> implementada con Clerk (ver [FeatureLogin.md](./FeatureLogin.md)).

## Qué hace
Añade una **home page pública en `/`**, visible **sin sesión**, que presenta la
app antes de mandar a nadie al login. La home muestra:
- **Nombre**: "AI Spec Builder".
- **Descripción de una línea**: convierte tu idea en un documento técnico
  completo, listo para compartir con cualquier desarrollador.
- **Tres beneficios** (breves, orientados al emprendedor no técnico).
- **Un botón CTA "Empezar"** que lleva al login de Clerk (`/sign-in`).

Para dejar `/` libre como home, **el generador se mueve a `/app`** y queda
protegido: solo accesible con sesión activa. El comportamiento por sesión en `/`:
- **Sin sesión** → se ve la home pública.
- **Con sesión** → `/` **redirige a `/app`** (el generador), no muestra la home.

El diseño es coherente con el resto de la app: **Tailwind, mismos colores**
(negro/blanco, `rounded-full`, tipografía Geist), mobile-first, sin CSS custom.

## Por qué
Hoy `/` está detrás del middleware de Clerk, así que un visitante sin sesión cae
directo en el formulario de login **sin ningún contexto**: no sabe qué es la app
ni por qué debería registrarse. Una home pública da ese contexto, reduce la
fricción de entrada y convierte visitas frías en registros. La app sigue cerrada
donde importa (el generador y `/api/*`), pero la puerta de entrada explica el
producto antes de pedir credenciales.

## Criterios de aceptación
- [ ] `GET /` **sin sesión** responde **200** y renderiza la home (no redirige a `/sign-in`).
- [ ] `/` deja de estar protegida: se añade a las rutas públicas del `proxy.ts` (junto a `/sign-in`, `/sign-up`).
- [ ] La home muestra: nombre, descripción de una línea, **tres** beneficios y un CTA "Empezar".
- [ ] El CTA "Empezar" navega al **login de Clerk** (`/sign-in`).
- [ ] El generador vive ahora en **`/app`** y está **protegido**: `GET /app` sin sesión → **redirect a `/sign-in`** (307).
- [ ] `GET /` **con sesión** → **redirect a `/app`** (no se muestra la home al usuario ya autenticado).
- [ ] El generador funciona en `/app` **igual que antes** (formulario, historial en localStorage, resultado, copiar).
- [ ] `/api/generate-spec` sigue **protegida** por el middleware (sin sesión → 307).
- [ ] La home usa **solo Tailwind** con los colores/estilos actuales; se ve bien en móvil (mobile-first).
- [ ] `npm run build` compila y `npm run lint` pasa sin errores nuevos.

## No incluye
- **No** cambia el flujo de auth de Clerk: sigue siendo el login existente; el CTA solo enlaza a `/sign-in`.
- **No** añade página de precios, testimonios, FAQ, footer legal ni ninguna sección más allá de nombre + descripción + 3 beneficios + CTA.
- **No** toca la lógica del generador (`SPEC_SYSTEM_PROMPT`, esquema `Spec`, `SpecForm`, `SpecOutput`, historial) — solo lo **reubica** de `/` a `/app`.
- **No** añade base de datos, backend con estado ni persistencia por usuario (el historial sigue en localStorage, tal cual).
- **No** implementa i18n, modo oscuro, animaciones ni assets nuevos (ilustraciones, logo custom, imágenes).
- **No** añade una segunda ruta de app protegida ni reestructura `/api/*`.
- **No** cubre la migración a instancia de producción de Clerk (sigue en development; ver [FeatureLogin.md](./FeatureLogin.md)).
