import { Loader2, Link2 } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

type ShortenFormProps = {
  loading: boolean;
  onSubmit: (url: string) => void;
};

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function ShortenForm({ loading, onSubmit }: ShortenFormProps) {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidUrl(url.trim())) {
      setValidationError("Ingresa una URL valida con http o https.");
      return;
    }

    setValidationError(null);
    onSubmit(url.trim());
  }

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <div className="relative">
        <Link2 className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          aria-label="URL para acortar"
          className="h-12 pl-10 text-base"
          disabled={loading}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://ejemplo.com/recurso"
          type="url"
          value={url}
        />
      </div>
      {validationError ? <p className="text-sm text-destructive">{validationError}</p> : null}
      <Button className="h-12 w-full sm:w-fit" disabled={loading} type="submit">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
        Acortar
      </Button>
    </form>
  );
}
