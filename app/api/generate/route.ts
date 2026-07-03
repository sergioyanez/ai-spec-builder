import { NextRequest, NextResponse } from "next/server";
import anthropic from "@/lib/anthropic";
import { SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  const { idea, sections } = await req.json();

  if (!idea || idea.trim().length === 0) {
    return NextResponse.json(
      { error: "Por favor describí tu producto antes de generar." },
      { status: 400 }
    );
  }

  if (!sections || sections.length === 0) {
    return NextResponse.json(
      { error: "Seleccioná al menos una sección." },
      { status: 400 }
    );
  }

  const sectionList = (sections as string[]).map((s) => `- ${s}`).join("\n");

  const userMessage = `Descripción del producto:\n${idea.trim()}\n\nSecciones a incluir en el documento:\n${sectionList}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json(
      { error: "Respuesta inesperada del modelo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ spec: content.text });
}
