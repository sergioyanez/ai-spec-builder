# Plantilla Spec-First para Claude
**Estructura tu proyecto antes de escribir una línea de código o prompt**

Créditos: dominicode | Construye con IA: De la Idea al Producto con Claude y Specs

> [!IMPORTANTE]
> Instrucción: Haz una copia de este documento (Archivo → Hacer una copia) y rellena cada sección antes de abrir Claude.

---

## SECCIÓN 1 — Visión del producto

La descripción más corta y clara de lo que construyes. Una o dos oraciones. Si no puedes explicarlo en dos oraciones, aún no está claro.

**Preguntas guía:**
- ¿Qué hace exactamente este producto?
- ¿Para quién es?
- ¿Qué problema resuelve en una frase?

**Ejemplo:**
> "Una herramienta para que freelancers gestionen sus proyectos y facturas desde un solo lugar, sin necesidad de usar hojas de cálculo separadas."

**Tu visión:**

Es la herramienta que convierte la idea de un emprendedor en un documento técnico completo — sin necesidad de saber programar. Describe tu producto en unas pocas oraciones y recibe al instante las especificaciones listas para compartir con cualquier desarrollador.

---

## SECCIÓN 2 — Usuarios y casos de uso

Quién usa el producto y para qué. No perfiles de marketing — acciones concretas que realiza cada tipo de usuario.

**Preguntas guía:**
- ¿Quién es el usuario principal?
- ¿Hay usuarios con roles diferentes? (admin, usuario estándar, visitante)
- ¿Cuáles son las 3 acciones principales que hace cada usuario?

**Ejemplo:**
> Usuario freelancer: crea proyectos, registra horas trabajadas, genera facturas.
> Usuario cliente: ve el progreso del proyecto, aprueba facturas.

**Tus usuarios y casos de uso:**

1. **Transformar una idea en documento técnico** — Tiene una idea pero no sabe cómo comunicársela a un desarrollador. Escribe su idea en lenguaje cotidiano y obtiene un spec profesional listo para compartir.
2. **Estimar alcance y costo** — Usa el documento generado para pedir presupuestos comparables entre distintos desarrolladores o agencias.
3. **Validar si su idea es viable** — Al ver el stack, los endpoints y las fases del MVP, entiende la complejidad real de lo que quiere construir antes de invertir dinero.
4. **Iterar sobre el producto** — Cuando la idea evoluciona, vuelve a generar una nueva versión del spec para mantenerlo actualizado sin depender de nadie técnico.

---

## SECCIÓN 3 — Funcionalidades

La lista completa de lo que hace el sistema, organizada por módulos. Escribe cada funcionalidad como "El usuario puede..." o "El sistema permite..." Esto te fuerza a pensar desde el comportamiento, no desde el código.

**Preguntas guía:**
- ¿Qué módulos tiene el sistema?
- ¿Qué puede hacer el usuario en cada módulo?
- ¿Qué hace el sistema automáticamente?

**Ejemplo:**
> Módulo de proyectos:
> - El usuario puede crear proyectos y editar nombre y descripción.
> - El usuario puede archivar proyectos completados.
> - El usuario puede ver el historial de horas por proyecto.
>
> Módulo de facturación:
> - El sistema calcula el total automáticamente.
> - El usuario puede generar una factura en PDF.
> - El usuario puede marcar facturas como pagadas.

**Tus funcionalidades:**

### INPUT — Lo que el usuario ingresa al sistema
- El usuario puede escribir la descripción de su producto en lenguaje natural, sin vocabulario técnico.
- El usuario puede seleccionar qué secciones desea incluir en su especificación.
- El usuario puede elegir un ejemplo predefinido como punto de partida.
- El usuario puede modificar y reescribir su descripción cuantas veces quiera antes de generar.

### OUTPUT — Lo que el sistema devuelve
- El sistema permite generar un documento técnico completo a partir de una descripción breve.
- El sistema permite visualizar la especificación organizada por secciones claras y legibles.
- El sistema permite copiar el documento generado con un clic para usarlo en otro contexto.
- El sistema permite estimar la complejidad del producto a través del stack y las fases del MVP (caso de uso 3 y 4).

### ESTADOS — Ciclo de vida del documento
- El usuario puede generar una nueva versión del spec cuando su idea evoluciona (caso de uso 5).
- El sistema permite mantener visible la última especificación generada dentro de la sesión.
- El usuario puede regenerar el documento cambiando las secciones seleccionadas sin reescribir la descripción.
- El sistema permite indicar visualmente cuando está procesando la solicitud (estado de carga).

---

## SECCIÓN 4 — Flujos de usuario

Los pasos exactos que sigue un usuario para completar cada acción principal. Incluye el flujo cuando todo funciona (happy path) y qué pasa cuando algo falla.

**Preguntas guía:**
- ¿Cuáles son las 3-5 acciones más importantes en tu producto?
- ¿Qué pasos sigue el usuario para completar cada una?
- ¿Qué pasa si algo sale mal en cada paso?

**Ejemplo — Crear una factura:**
1. El usuario va a "Facturas" en el menú.
2. Hace clic en "Nueva factura".
3. Selecciona el proyecto (el sistema rellena automáticamente el cliente y horas).
4. El usuario revisa el total y puede editarlo.
5. Hace clic en "Generar PDF".
- Error: si no hay horas registradas, el sistema muestra un aviso antes de generar.

**Tus flujos principales:**

### Flujo principal — Happy path

1. El usuario abre la app y ve la pantalla de inicio con el campo de descripción vacío y las secciones preseleccionadas por defecto.
2. El usuario escribe la descripción de su producto (o elige un ejemplo).
3. El usuario revisa y ajusta las secciones que quiere incluir.
4. El usuario presiona "Generar especificación técnica".
5. El sistema muestra el estado de carga mientras procesa.
6. El sistema presenta el documento generado, organizado por secciones.
7. El usuario lee, evalúa y copia el documento.

### Flujos alternativos — Qué pasa si algo falla

| Situación | Qué hace el sistema |
|---|---|
| El usuario presiona generar sin escribir nada | Muestra mensaje: "Por favor describí tu producto antes de generar" |
| El usuario no seleccionó ninguna sección | Muestra mensaje: "Seleccioná al menos una sección" |
| Error de conexión o fallo de la API | Muestra mensaje: "Hubo un error al generar. Intentá de nuevo" y reactiva el botón |
| La descripción es demasiado vaga | El sistema genera igual, pero el output tendrá menos detalle — no hay bloqueo |
| El usuario regenera cambiando secciones | El sistema reemplaza el documento anterior con el nuevo, sin acumular versiones |

**Estado final exitoso**

El usuario tiene un documento técnico completo, legible, copiable y listo para compartir con un desarrollador — sin haber escrito una sola línea de código ni usado vocabulario técnico.

---

## SECCIÓN 5 — Arquitectura

La estructura técnica del sistema. Qué componentes necesita, cómo se comunican, qué tecnologías usar. Si no tienes decisiones técnicas previas, deja este campo en "a decidir" y usa Claude con el resto de la spec para definirla.

**Preguntas guía:**
- ¿Es una app web, móvil o ambas?
- ¿Necesita backend propio o puede usar servicios externos?
- ¿Cómo se almacenan los datos?
- ¿Hay autenticación de usuarios?
- ¿Se integra con otros servicios?

**Ejemplo:**
> Frontend: React (web)
> Backend: Node.js + API REST
> Base de datos: PostgreSQL
> Autenticación: Supabase Auth
> Hosting: Vercel (frontend) + Railway (backend)

**Tu arquitectura:**

### Stack tecnológico
- **Frontend**: Next.js 16 con React y Tailwind CSS
- **Backend**: API Routes de Next.js (serverless, mismo repositorio)
- **IA**: Anthropic SDK conectando con el modelo Claude
- **Deploy**: Vercel (integración nativa con Next.js)

### Decisiones clave
- No hay base de datos en v1 — todo el estado vive en el cliente durante la sesión.
- La API key de Anthropic nunca se expone al frontend; todas las llamadas pasan por la API Route.
- Un solo repositorio para frontend y backend simplifica el deploy y el mantenimiento.

### Flujo de datos

```
Browser (Next.js)
    └── POST /api/generate
            └── API Route (serverless)
                    └── Anthropic SDK → Claude API
```

**Dos puntos de seguridad importantes:**
- La API key de Anthropic vive en variables de entorno de Vercel (`ANTHROPIC_API_KEY`) y nunca llega al browser.
- La API Route actúa como proxy: el cliente solo ve `/api/generate`, nunca la URL ni las credenciales de Anthropic.

---

## SECCIÓN 6 — Requisitos no funcionales

Las restricciones que el sistema debe cumplir aunque el usuario no las vea directamente. Muchos proyectos los ignoran hasta que el problema aparece en producción.

**Preguntas guía:**
- ¿Cuántos usuarios simultáneos necesita soportar?
- ¿Hay datos sensibles?
- ¿Necesita funcionar sin conexión?
- ¿En qué idiomas?

**Ejemplo:**
> Rendimiento: carga inicial < 3 segundos.
> Seguridad: datos de cada usuario privados e inaccesibles para otros.
> Escalabilidad: diseñado para hasta 1.000 usuarios en v1.
> Idioma: español en la primera versión.

**Tus requisitos:**

### Rendimiento
- La respuesta de Claude debe llegar en menos de 15 segundos en condiciones normales.
- El frontend debe cargar en menos de 3 segundos en conexiones estándar.
- No hay base de datos ni queries: la latencia depende casi exclusivamente de la API de Anthropic.

### Seguridad
- La API key de Anthropic nunca se expone al cliente — solo vive en variables de entorno del servidor.
- No se almacena ningún dato del usuario: ni la descripción del producto ni el spec generado persisten en ningún backend.
- La API Route valida que el input no esté vacío antes de llamar a Anthropic.
- El deploy en Vercel incluye HTTPS por defecto.

### Accesibilidad
- La interfaz debe ser usable en mobile y desktop.
- Los mensajes de error deben ser claros y en lenguaje no técnico.
- Contraste de texto suficiente para lectura cómoda (WCAG AA como mínimo).

### Fuera del alcance — lo que NO vamos a construir en v1

| ❌ No incluido | Razón |
|---|---|
| Autenticación / login de usuarios | Sin cuentas, sin fricción. El valor es inmediato. |
| Guardado de specs generadas | Sin base de datos en v1. El usuario copia y guarda por su cuenta. |
| Historial de generaciones | Requiere auth + storage. No es el foco. |
| Exportación a PDF o Word | Complejidad de implementación no justificada en MVP. |
| Multilenguaje (inglés, etc.) | Solo español en v1. |
| Edición del spec dentro de la app | El usuario edita en su herramienta de preferencia. |
| Colaboración en equipo | Feature de v2 o v3. |
| Integración con Jira, Notion, GitHub | Out of scope hasta validar el núcleo. |
| Selección de modelo de Claude | Siempre Sonnet 4. Sin configuración expuesta. |
| Modo offline | Depende 100% de la API de Anthropic. |

> Definir el alcance negativo es tan importante como el positivo — le dice al equipo de desarrollo dónde está el borde y evita el scope creep.

---

*¿Quieres aprender a usar esta plantilla en un proyecto real de principio a fin? El curso **Construye con IA: De la Idea al Producto con Claude y Specs** estará disponible en Udemy.*

---

### Features
        Exportar como Markdown
        Exportar como PDF
