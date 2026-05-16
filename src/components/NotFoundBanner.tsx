import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type NotFoundBannerProps = {
  codigo?: string;
};

export function NotFoundBanner({ codigo }: NotFoundBannerProps) {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg border-destructive/40">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Este enlace no existe</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {codigo ? `No encontramos un destino para el codigo ${codigo}.` : "No encontramos este enlace corto."}
            </p>
          </div>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
