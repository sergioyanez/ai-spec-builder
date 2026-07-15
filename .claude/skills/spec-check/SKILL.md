---
name: spec-check
description: Audita las specs del proyecto (specs/ y openspec/specs/) antes de construir. Busca contradicciones entre secciones, señala secciones vagas o ambiguas, y devuelve una lista de puntos a clarificar. Solo reporta, no corrige nada.
disable-model-invocation: true
---

# /spec-check

Revisa la calidad de las specs **antes** de empezar a construir.
Esta skill **solo reporta**: nunca edita ni corrige las specs.

## Pasos

1. **Leer las specs**
   - `specs/*.md` — specs de features en lenguaje natural.
   - `openspec/specs/**/spec.md` — specs canónicas de OpenSpec (requisitos + escenarios).
   - Si el usuario indicó una spec o feature concreta, limitate a ella; si no, revisá todas.
   - Leé también `CLAUDE.md` como referencia de restricciones del proyecto, para detectar specs que las contradigan.

2. **Buscar contradicciones entre secciones**
   Compará secciones dentro de una misma spec y entre specs distintas. Buscá:
   - Requisitos que se contradicen (una sección dice A, otra dice lo contrario).
   - Solapamientos donde dos specs describen el mismo comportamiento de forma distinta.
   - Conflictos con las restricciones del proyecto (p. ej. una spec asume base de datos cuando no la hay).

3. **Señalar secciones vagas o ambiguas**
   Marcá texto que no es construible tal cual:
   - Términos sin definir o subjetivos ("rápido", "simple", "intuitivo") sin criterio medible.
   - Requisitos sin condición clara (falta el cuándo/entonces, no se sabe qué dispara el comportamiento).
   - Casos límite no cubiertos (errores, estados vacíos, límites, permisos).
   - Requisitos sin escenario que los verifique.

4. **Devolver puntos a clarificar**
   Producí una lista accionable de preguntas concretas que hay que resolver **antes** de construir.
   No propongas la implementación; solo lo que falta decidir o precisar.

## Salida

```
## Revisión de specs

**Specs revisadas:** <lista>

### Contradicciones
1. <spec/sección> ↔ <spec/sección> — <en qué se contradicen>

### Secciones vagas o ambiguas
1. <spec/sección> — <qué es ambiguo y por qué no es construible>

### Puntos a clarificar antes de construir
- [ ] <pregunta concreta 1>
- [ ] <pregunta concreta 2>

Solo es un reporte: no se modificó ninguna spec.
```

## Guardas

- Nunca edites ni corrijas las specs: esta skill es de solo lectura.
- Si una spec está clara y sin conflictos, decilo explícitamente en vez de forzar hallazgos.
- Priorizá contradicciones y ambigüedades que bloquean la construcción sobre detalles menores.
- Si no hay specs, indicalo y no inventes.
