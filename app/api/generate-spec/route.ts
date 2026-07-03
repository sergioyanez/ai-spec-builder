import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import anthropic from "@/lib/anthropic";
import { SPEC_SYSTEM_PROMPT } from "@/lib/prompts";

const SPEC_KEYS = [
  "vision",
  "users",
  "features",
  "flows",
  "architecture",
  "requirements",
] as const;

function extractJson(text: string): string {
  const trimmed = text.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    return trimmed;
  }
  return trimmed.slice(start, end + 1);
}

function isValidSpec(value: unknown): value is Record<(typeof SPEC_KEYS)[number], unknown> {
  if (typeof value !== "object" || value === null) return false;
  return SPEC_KEYS.every((key) => key in value);
}

export async function POST(req: NextRequest) {
  let description: unknown;

  try {
    const body = await req.json();
    description = body?.description;
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición debe ser JSON válido." },
      { status: 400 }
    );
  }

  if (typeof description !== "string" || description.trim().length === 0) {
    return NextResponse.json(
      { error: "El campo 'description' es obligatorio y debe ser un texto no vacío." },
      { status: 400 }
    );
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: SPEC_SYSTEM_PROMPT,
      messages: [{ role: "user", content: description.trim() }],
    });

    if (message.stop_reason === "refusal") {
      return NextResponse.json(
        { error: "El modelo no pudo generar una especificación para esta descripción." },
        { status: 422 }
      );
    }

    const block = message.content[0];
    if (!block || block.type !== "text") {
      return NextResponse.json(
        { error: "Respuesta inesperada del modelo." },
        { status: 502 }
      );
    }

    let spec: unknown;
    try {
      spec = JSON.parse(extractJson(block.text));
    } catch {
      return NextResponse.json(
        { error: "No se pudo interpretar la especificación generada por el modelo." },
        { status: 502 }
      );
    }

    if (!isValidSpec(spec)) {
      return NextResponse.json(
        { error: "La especificación generada no tiene el formato esperado." },
        { status: 502 }
      );
    }

    return NextResponse.json({ spec });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Error de autenticación con el servicio de IA." },
        { status: 500 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "El servicio de IA está saturado. Intentá de nuevo en unos segundos." },
        { status: 429 }
      );
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Error del servicio de IA: ${error.message}` },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Ocurrió un error inesperado al generar la especificación." },
      { status: 500 }
    );
  }
}
