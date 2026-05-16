import { ShieldCheck } from "lucide-react";

import { ResultCard } from "../components/ResultCard";
import { ShortenForm } from "../components/ShortenForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useShorten } from "../hooks/useShorten";

export function HomePage() {
  const { result, loading, error, shorten } = useShorten();

  return (
    <main className="app-shell">
      <section className="mx-auto grid min-h-screen w-full max-w-5xl content-center gap-6 px-4 py-8 sm:px-6">
        <div className="grid gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Acortador LP
          </div>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-normal sm:text-5xl">
            Crea enlaces cortos listos para compartir.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Pega una URL publica y genera un enlace corto con redireccion controlada por los servicios Lambda.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nuevo enlace</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ShortenForm loading={loading} onSubmit={shorten} />
            {error ? <p className="text-sm text-destructive">{error.message}</p> : null}
          </CardContent>
        </Card>

        {result ? <ResultCard originalUrl={result.originalUrl} shortUrl={result.shortUrl} /> : null}
      </section>
    </main>
  );
}
