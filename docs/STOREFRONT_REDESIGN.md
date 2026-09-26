# Storefront redesign

The supplied `project` is a design reference only. The live Next.js app does not import its Vite entry point, mock cart, mock products, or mock newsletter. It retains authentication, backend products/categories/recipes, cart mutations, and checkout.

## Editing the homepage

Start the standalone Studio from `studio-sabi-brand` with `npm run dev`, then open **Home Page → Featured showcases**. Add and reorder showcase entries. Each supports its label, title, subtitle, description, image upload, image description, button labels, optional badges, and relative primary link (for example `/products/plantain-flour`). The secondary button opens recipes. Publish to apply changes, then refresh the homepage.

The layout alternates solid white and black automatically. Images keep their original colours. Empty text/image fields use the supplied design's defaults. An empty badges list hides the badges. Without showcase entries, existing published Hero fields still control the first showcase; the remaining sections use defaults. No existing Sanity documents or fields are deleted or migrated.

Existing **Staples**, **Journals**, **Metrics**, **Philosophy**, and **Provenance** fields still control those editorial sections. Product prices, stock, product photos, categories, and recipes remain authoritative backend data, managed through the existing admin pages.

The active schema is `studio-sabi-brand/schemaTypes/index.ts` plus `homeSpotlights.ts`. Restart or redeploy that standalone Studio for the new fields to appear. The Studio is a separate Git repository; include its schema changes in its own deployment.

## Reusable UI

- `components/home`: featured showcases, recipe section, collection section.
- `components/catalog`: product cards, filters, feedback, gallery, purchase controls, quantity selector.
- `components/cart`: cart line items.
- `components/ui/SideDrawer`: animated portal drawer, Escape handling, focus trap and body scroll lock.
- `app/globals.css`: monochrome buttons, headings, containers and icon controls.

The imported reference and standalone Studio are excluded from the Next.js TypeScript project. They retain their own packages; neither is bundled into the storefront.
