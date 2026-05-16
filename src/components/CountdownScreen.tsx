import { Loader2 } from "lucide-react";

type CountdownScreenProps = {
  seconds: number;
};

export function CountdownScreen({ seconds }: CountdownScreenProps) {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border bg-card shadow-sm">
          <span className="text-5xl font-semibold text-primary">{seconds}</span>
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Preparando redireccion</h1>
        <p className="mt-2 text-sm text-muted-foreground">Estamos validando el enlace antes de enviarte al destino.</p>
        <Loader2 className="mx-auto mt-6 h-5 w-5 animate-spin text-primary" />
      </div>
    </section>
  );
}
