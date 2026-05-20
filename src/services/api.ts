export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const apiUrl = import.meta.env.VITE_API_URL;
const baseShortUrl = import.meta.env.VITE_BASE_SHORT_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is required");
}

if (!baseShortUrl) {
  throw new Error("VITE_BASE_SHORT_URL is required");
}

async function readError(response: Response, fallback: string) {
  let message = fallback;

  try {
    const body = (await response.json()) as { message?: string; error?: string };
    message = body.message ?? body.error ?? message;
  } catch {
    message = response.statusText || message;
  }

  return new ApiError(message, response.status);
}

export type ShortenResponse = {
  code: string;
  shortUrl: string;
  originalUrl: string;
};

export async function shortenUrl(url: string): Promise<ShortenResponse> {
  const response = await fetch(new URL("/shorten", apiUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw await readError(response, "No se pudo acortar la URL.");
  }

  const body = (await response.json()) as {
    code?: string;
    short_url?: string;
    url_original?: string;
  };

  if (!body.code) {
    throw new ApiError("La API no devolvio el codigo generado.", response.status);
  }

  const shortUrl = `${baseShortUrl.replace(/\/$/, "")}/short/${encodeURIComponent(body.code)}`;

  return {
    code: body.code,
    shortUrl,
    originalUrl: body.url_original ?? url,
  };
}

export async function resolveCode(codigo: string): Promise<string> {
  const resolveUrl = new URL(`/${encodeURIComponent(codigo)}`, apiUrl);
  resolveUrl.searchParams.set("resolve", "true");

  const response = await fetch(resolveUrl);

  if (response.status === 404) {
    throw new ApiError("Este enlace no existe.", 404);
  }

  if (!response.ok) {
    throw await readError(response, "No se pudo resolver este enlace.");
  }

  return new URL(`/${encodeURIComponent(codigo)}`, apiUrl).toString();
}
