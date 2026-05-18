import { Check, Copy, ExternalLink, Link2 } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ResultCardProps = {
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

export function ResultCard({ shortUrl, originalUrl }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyText(shortUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Card className="border-primary/30 bg-primary/5 shadow-sm">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Link2 className="h-5 w-5" />
        </div>
        <CardTitle>URL corta generada</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="rounded-md border bg-card p-4">
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
        </div>
      </CardContent>
    </Card>
  );
}
