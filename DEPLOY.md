# Деплой статической сборки

```bash
npm run build   # сборка + автопроверка SEO в HTML
```

Результат: `dist/client/` — заливается на любой статический хостинг (Node не нужен).

## Автопроверка SEO

`scripts/verify-static-seo.mjs` запускается после каждой сборки и падает с ненулевым кодом,
если в любом сгенерированном HTML нет `<title>`, `description`, `og:title/description/type/url`,
`twitter:card`, `<link rel="canonical">`, а на главной — валидного JSON-LD.
Дополнительно проверяется: JSON-LD валиден и имеет `@context: https://schema.org` с ожидаемым `@type`
(главная — RealEstateAgent/Organization, /privacy — WebPage), а `canonical` и `og:url` на всех страницах
указывают на один baseUrl и совпадают с адресом самой страницы (без дефолтных/пустых значений).
Проверка читает файлы напрямую, без запуска сервера.

baseUrl берётся из `SEO_BASE_URL` (или `VITE_SITE_URL`), по умолчанию — https://golden-scroll-villas.lovable.app:

```bash
SEO_BASE_URL=https://example.com npm run build
```

## CI

`.github/workflows/build-and-seo-check.yml` — на каждый PR и push в main выполняет
`bun run build` (сборка + SEO-проверка). При падении выгружает артефакт `prerendered-html`
со сгенерированными HTML, sitemap.xml и robots.txt; при успехе — артефакт `static-site` с `dist/client`.

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
