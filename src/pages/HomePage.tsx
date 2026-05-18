import { BarChart3, Clock3, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { ResultCard } from "../components/ResultCard";
import { ShortenForm } from "../components/ShortenForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useShorten } from "../hooks/useShorten";

export function HomePage() {
  const { result, loading, error, shorten } = useShorten();

  return (
    <main className="app-shell">
      <section className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <nav className="animate-soft-in flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img alt="LinkPilot" className="brand-mark h-10 w-10 rounded-md" src="/logo.svg" />
            <div>
              <p className="text-sm font-semibold leading-none">LinkPilot</p>
              <p className="mt-1 text-xs text-muted-foreground">URL shortener</p>
            </div>
          </div>
          <a
            className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-card/70 px-3 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-secondary max-[420px]:h-9 max-[420px]:px-2 max-[420px]:text-xs"
            href="/short/demo"
          >
            <Clock3 className="h-4 w-4" />
            Vista redirect
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-8 py-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,430px)] lg:gap-12">
          <div className="animate-fade-up grid gap-6">
            <div className="grid gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm text-primary shadow-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                Enlaces listos para compartir
              </div>
              <h1 className="hero-title max-w-3xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                Acorta URLs con una experiencia limpia y confiable.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Genera enlaces cortos, copia el resultado al instante y usa una ruta de espera antes de enviar al
                visitante al destino final.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Validacion", value: "HTTP/HTTPS", helper: "Solo URLs publicas", icon: ShieldCheck },
                { label: "Redirect", value: "5 segundos", helper: "Pantalla de espera", icon: Clock3 },
                { label: "Metricas", value: "por dia", helper: "Dashboard incluido", icon: BarChart3 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div className="hover-lift rounded-md border border-white/10 bg-card/70 p-4 shadow-sm" key={item.label}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold">{item.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.helper}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:gap-6">
              {[
                ["12k+", "Links creados"],
                ["99.9%", "Uptime"],
                ["<50ms", "Redirect"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-xl font-semibold tracking-normal sm:text-2xl">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up delay-200 grid gap-4">
            <Card className="glass-card hover-lift border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  Nuevo enlace
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ShortenForm loading={loading} onSubmit={shorten} />
                {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error.message}</p> : null}
                <div className="rounded-md border border-white/10 bg-muted/50 p-3 text-xs leading-5 text-muted-foreground">
                  Los enlaces no expiran y se registran con metricas diarias cuando alguien visita la ruta corta.
                </div>
              </CardContent>
            </Card>

            {result ? <ResultCard code={result.code} originalUrl={result.originalUrl} shortUrl={result.shortUrl} /> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
