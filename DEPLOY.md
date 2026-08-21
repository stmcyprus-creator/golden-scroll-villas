# Деплой статической сборки

```bash
npm run build   # сборка + автопроверка SEO в HTML
```

Результат: `dist/client/` — заливается на любой статический хостинг (Node не нужен).

## Автопроверка SEO

`scripts/verify-static-seo.mjs` запускается после каждой сборки и падает с ненулевым кодом,
если в любом сгенерированном HTML нет `<title>`, `description`, `og:title/description/type/url`,
`twitter:card`, `<link rel="canonical">`, а на главной — валидного JSON-LD.
Проверка читает файлы напрямую, без запуска сервера.

## Кэш CDN

Файл `public/_headers` (Netlify / Cloudflare Pages) уже настроен:
хешированные ассеты — `max-age=31536000, immutable`, HTML — `max-age=0, must-revalidate`.

### Nginx

```nginx
location ~* \.(js|css|woff2|webp|avif|jpg|png|svg)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
location ~* \.html$ {
  add_header Cache-Control "public, max-age=0, must-revalidate";
}
location = / {
  add_header Cache-Control "public, max-age=0, must-revalidate";
}
gzip on;
gzip_types text/css application/javascript image/svg+xml application/json;
```

### Apache (.htaccess)

```apache
<FilesMatch "\.(js|css|woff2|webp|avif|jpg|png|svg)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\.html$">
  Header set Cache-Control "public, max-age=0, must-revalidate"
</FilesMatch>
```

### S3 / CloudFront

```bash
aws s3 sync dist/client s3://BUCKET --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable"
aws s3 sync dist/client s3://BUCKET --exclude "*" --include "*.html" \
  --cache-control "public, max-age=0, must-revalidate"
```
