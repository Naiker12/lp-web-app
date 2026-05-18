import { BarChart3, Clock3, ShieldCheck, Sparkles } from "lucide-react";

import { ResultCard } from "../components/ResultCard";
import { ShortenForm } from "../components/ShortenForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useShorten } from "../hooks/useShorten";

export function HomePage() {
  const { result, loading, error, shorten } = useShorten();

  return (
    <main className="app-shell">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img alt="LinkPilot" className="brand-mark h-10 w-10 rounded-md" src="/logo.svg" />
            <div>
              <p className="text-sm font-semibold leading-none">LinkPilot</p>
              <p className="mt-1 text-xs text-muted-foreground">URL shortener</p>
            </div>
          </div>
          <a
            className="inline-flex h-10 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-secondary"
            href="/short/demo"
          >
            <Clock3 className="h-4 w-4" />
            Vista redirect
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                Enlaces listos para compartir
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-6xl">
                Acorta URLs con una experiencia limpia y confiable.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Genera enlaces cortos, copia el resultado al instante y usa una ruta de espera antes de enviar al
                visitante al destino final.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Validacion", value: "HTTP/HTTPS", icon: ShieldCheck },
                { label: "Redirect", value: "5 segundos", icon: Clock3 },
                { label: "Metricas", value: "por dia", icon: BarChart3 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div className="rounded-md border bg-card/80 p-4 shadow-sm" key={item.label}>
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="border-primary/20 shadow-xl shadow-primary/5">
              <CardHeader>
                <CardTitle>Nuevo enlace</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ShortenForm loading={loading} onSubmit={shorten} />
                {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error.message}</p> : null}
              </CardContent>
            </Card>

            {result ? <ResultCard originalUrl={result.originalUrl} shortUrl={result.shortUrl} /> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
