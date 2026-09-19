# SAGI SEO

Set this frontend environment variable in Vercel and redeploy:

```ini
SITE_URL=https://sagi-store.vercel.app
```

Change it to the canonical HTTPS domain when you attach your own domain. Keep `BACKEND_API_URL` pointing to the backend, not the storefront.

Implemented:
- Logo-based PNG favicon and Apple home-screen icon, generated from `public/Asset 1 (1).png`.
- 1200 × 630 logo-based Open Graph image and Twitter large-image cards.
- Page titles, descriptions and canonical URLs for home, products, journals and individual products.
- Product metadata from the public backend catalog, with bounded requests and five-minute revalidation.
- Sitemap containing all public catalog pages (pagination included).
- Organization structured data using the real store name, URL and logo.
- No-index metadata for admin, checkout, purchase history, verification and review forms; preview/development builds are also no-index.

The robots file is not an access-control mechanism. Existing authentication is still required for private data. Recipe content currently opens in modals, so only the journals listing is included in the sitemap.

After deploying, check `/icon`, `/apple-icon`, `/opengraph-image`, `/robots.txt`, and `/sitemap.xml`. The sitemap needs a reachable backend; it fails rather than advertising an incomplete catalog if that backend is unavailable. Submit `/sitemap.xml` in Google Search Console once you verify ownership of your site. Indexing, rankings and social-preview refreshes are controlled by external services and are not guaranteed or immediate.

The original starter `app/favicon.ico` was removed; it remains recoverable from Git. Browsers may require a hard refresh to stop showing a cached old favicon.
