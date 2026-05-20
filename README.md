# lp-web-app

Frontend SPA para acortar URLs y manejar la redireccion de enlaces cortos.

## Rutas

- `/`: formulario para acortar URLs.
- `/short/:codigo`: pantalla de espera y redireccion.

## Variables

Variables requeridas para el build en AWS:

- `VITE_API_URL`: URL base del API Gateway que expone `POST /shorten` y `GET /{codigo}`.
- `VITE_BASE_SHORT_URL`: URL publica de esta SPA, usada para generar enlaces `/short/:codigo`.

## Validacion

```powershell
pnpm run lint
pnpm run build
```

## Deploy

El workflow `.github/workflows/lp-web-app.yml` ejecuta:

```txt
pnpm install --frozen-lockfile
pnpm run build
aws s3 sync dist s3://$S3_BUCKET_NAME --delete
aws cloudfront create-invalidation --paths "/*"
```

Variables de GitHub necesarias:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
