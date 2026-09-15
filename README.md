This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## SAGI Culinary Boutique — Next.js frontend

This project is the Next.js App Router version of the original SAGI React storefront. The UI remains intentionally componentized: shared chrome lives in `components/`, the cart state is in `context/`, catalog content is in `data/`, and screen-level compositions are in `views/`.

### Development

```bash
npm install
npm run dev
```

The storefront is available at `http://localhost:3000`.

### Production

```bash
npm run build
npm run start
```

Set the public backend URL in the frontend environment according to the API client integration. Keep frontend environment files out of Git when they contain deployment-specific values.
# Authentication integration

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend origin (for example, `http://localhost:3000` locally or the Render API URL in production). Authentication is organized into:

- `services/api-client.ts` for HTTP requests and API errors
- `services/auth.service.ts` for backend auth operations
- `services/auth.actions.ts` for validated mutations
- `schemas/auth.schema.ts` for Zod validation
- `context/AuthContext.tsx` for the browser session
- `components/auth/` for the login/register UI

The navbar Account control supports sign in, registration, email-verification messaging, session refresh, and sign out.

### Sanity home content

The home page reads an optional `homePage` document from Sanity. Copy `.env.sanity.example` into `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. Without those values, the curated local content is used automatically. The navbar remains hard-coded.

The standalone Studio lives at `front-end/studio-sabi-brand` and is run independently:

```bash
cd studio-sabi-brand
npm run dev
```
