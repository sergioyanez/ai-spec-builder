import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const benefits = [
  {
    title: "Sin conocimientos técnicos",
    description:
      "Describí tu producto en unas pocas frases, en tu propio idioma. Nada de jerga ni plantillas.",
  },
  {
    title: "Al instante",
    description:
      "Recibí en segundos un documento técnico completo, estructurado por secciones.",
  },
  {
    title: "Listo para compartir",
    description:
      "Copiá el spec y entregáselo a cualquier desarrollador para empezar a construir.",
  },
];

export default async function Landing() {
  // /  is public; signed-in users are sent straight to the generator.
  const { userId } = await auth();
  if (userId) redirect("/app");

  return (
    <main className="min-h-screen bg-gradient-to-b from-hero-start to-hero-end px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          AI Spec Builder
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Convertí tu idea en un documento técnico completo, listo para
          compartir con cualquier desarrollador.
        </p>

        <div className="mt-10">
          <Link
            href="/sign-in"
            className="inline-flex items-center rounded-full bg-accent px-8 py-3 text-base font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Empezar
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-card-border bg-canvas p-6 text-left shadow-card"
          >
            <h2 className="text-lg font-semibold text-ink">
              {benefit.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{benefit.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
