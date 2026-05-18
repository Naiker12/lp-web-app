import { Loader2, ShieldCheck } from "lucide-react";

type CountdownScreenProps = {
  seconds: number;
};

export function CountdownScreen({ seconds }: CountdownScreenProps) {
  return (
    <section className="app-shell flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg rounded-md border bg-card p-8 text-center shadow-xl shadow-primary/5">
        <img alt="LinkPilot" className="brand-mark mx-auto h-14 w-14 rounded-md" src="/logo.svg" />
        <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border bg-secondary shadow-sm">
          <span className="text-5xl font-semibold text-primary">{seconds}</span>
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Preparando redireccion</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Validamos el codigo antes de enviarte al destino final.
        </p>
        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Enlace verificado
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
      </div>
    </section>
  );
}
