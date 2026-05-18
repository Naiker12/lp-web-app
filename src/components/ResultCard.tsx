import { BarChart3, Check, Copy, ExternalLink, Link2 } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ResultCardProps = {
  code: string;
  shortUrl: string;
  originalUrl: string;
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const element = document.createElement("textarea");
  element.value = value;
  element.setAttribute("readonly", "");
  element.style.position = "fixed";
  element.style.opacity = "0";
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
}

const analyticsBaseUrl = import.meta.env.VITE_ANALYTICS_URL ?? "https://d1gk8s6mgxls13.cloudfront.net";

export function ResultCard({ code, shortUrl, originalUrl }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyText(shortUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
    <Card className="glass-card border-primary/30 bg-primary/5">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Link2 className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <CardTitle>URL corta generada</CardTitle>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{code}</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="rounded-md border border-primary/30 bg-primary/10 p-4">
          <a className="break-all text-lg font-semibold text-primary hover:underline" href={shortUrl}>
            {shortUrl}
          </a>
          <p className="mt-2 line-clamp-2 break-all text-sm text-muted-foreground">{originalUrl}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={handleCopy} type="button">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copiado" : "Copiar"}
          </Button>
          <Button asChild type="button" variant="outline">
            <a href={shortUrl} rel="noreferrer" target="_blank">
              <ExternalLink className="h-4 w-4" />
              Abrir
            </a>
          </Button>
          <Button asChild type="button" variant="outline">
            <a href={`${analyticsBaseUrl.replace(/\/$/, "")}/stats/${encodeURIComponent(code)}`} rel="noreferrer" target="_blank">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
    <div
      className={`fixed bottom-5 right-5 z-50 rounded-md border border-white/10 bg-card px-4 py-3 text-sm font-medium shadow-2xl transition-all ${
        copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <span className="inline-flex items-center gap-2">
        <Check className="h-4 w-4 text-primary" />
        Enlace copiado al portapapeles
      </span>
    </div>
    </>
  );
}
