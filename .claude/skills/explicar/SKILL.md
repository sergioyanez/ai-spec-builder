---
name: explicar
description: Resume en lenguaje no técnico los archivos modificados en la sesión — qué cambió y por qué le importa al producto. Pensada para personas sin conocimientos técnicos. Máximo una pantalla, sin jerga.
disable-model-invocation: true
---

# /explicar

Explica los cambios de la sesión en palabras simples, para alguien que no programa.

## Pasos

1. **Detectar los archivos modificados en la sesión**
   ```bash
   git status --short
   ```
   Considerá cambios sin commitear y, si hacen falta para dar contexto, los commits de la sesión (`git log --oneline`).
   Si algún archivo no deja claro el cambio, mirá su contenido lo justo para entender el efecto real.

2. **Traducir cada cambio a lenguaje de producto**
   Para cada archivo o grupo de cambios relacionados, respondé dos cosas:
   - **Qué cambió** — en una frase, como se lo contarías a un usuario.
   - **Por qué importa** — qué gana la persona que usa el producto (más rápido, más claro, menos errores, algo nuevo que antes no existía).
   Agrupá archivos que forman una sola mejora; no listes uno por uno si cuentan la misma historia.

## Reglas

- **Sin jerga técnica.** Nada de nombres de funciones, rutas de archivos, librerías, "API", "estado", "componente", "commit", etc. Hablá del producto y del usuario.
- **Máximo una pantalla.** Sé breve: pocas líneas por cambio.
- Si un cambio es puramente interno y no afecta al usuario, decilo en una línea (ej. "mejora interna, sin cambios visibles").
- Si no hay archivos modificados, decilo y no inventes.

## Salida

```
## Qué cambió en esta sesión

- **<cambio en lenguaje simple>**
  Por qué importa: <beneficio para quien usa el producto>

- **<otro cambio>**
  Por qué importa: <beneficio>
```
