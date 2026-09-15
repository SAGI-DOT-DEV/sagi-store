# Admin UI

The supplied React/Vite designs have been converted into the existing Next.js App Router. There is no separate admin package or Vite runtime.

## Routes

- `/admin/login`: existing backend login flow.
- `/admin`: live performance dashboard.
- `/admin/products`: live admin catalog with search, status/category filters, sorting and pagination.
- `/admin/products/new`: create products with details, image URLs, variants, CAD prices, opening stock and shipping dimensions using `POST /api/v1/products`. Defaults to Draft and redirects to the created product editor.
- `/admin/products/[id]/edit`: real product editor. The old demo URL redirects to the catalog.
- `/admin/orders`: live order ledger with server search, status filters, pagination, details and confirmed fulfillment updates.
- `/admin/reports`: live experience-review analytics, date filters, paginated feedback and summary CSV export.
- `/admin/analytics`: optional Google Analytics 4 dashboard. See [Google Analytics setup](./google-analytics.md) for private backend credentials and public storefront tracking flags.
- `/admin/inventory`: live stock report with search, stock filters, local pagination and confirmed adjustments.
- `/admin/transactions`: live read-only payments ledger with search, status filters, pagination, attempts, timelines and Stripe events.

## Structure

`app/admin/layout.tsx` supplies scoped styling and metadata. The `(suite)` layout supplies shared navigation and the administrator access check. The storefront layout is not used in these routes.

`components/admin` contains shared navigation, sign-in, role verification, icons, image fallbacks, and smaller dashboard/report/editor sections. Original sample datasets are isolated in `preview-data.ts` files.

## Integration boundary

Login uses the existing AuthContext and validated service/action flow. AdminGate verifies the current user with `auth/me` and requires `ADMIN`. This client-side check is a UI gate, not a substitute for backend authorization. All future admin endpoints must continue to enforce authentication and role checks server-side.

The overview uses authenticated sales, product-performance, inventory and order-operations reports via `services/admin/overview.service.ts`. Each section has independent loading/error handling and stale-response protection.

Sales and top-selling variants are CAD-only for the last six calendar months or year to date. Revenue includes order totals (including shipping), based on current paid/fulfillment statuses and order creation dates, not payment settlement dates. Months use UTC and the current month is partial. CSV export contains the displayed monthly sales totals. Operations are current across all dates/currencies; each order displays its own currency. Awaiting shipment includes only PAID/PROCESSING. Low stock is available inventory of 10 or fewer after reservations.

Products use protected `GET /api/v1/admin/products` and `GET /api/v1/admin/products/:id`, including drafts and archived records. The public storefront endpoint remains active-only. Saving uses the existing admin-only `PATCH /api/v1/products/:id` through validated frontend actions. Editable fields: name, slug, description, origin, highlights, category and status. Images, variant pricing, inventory and shipping dimensions can be supplied on creation but are read-only in the existing-product editor. Image entry uses signed Cloudinary file uploads.

Product creation now uses file uploads instead of manual URL entry. `ProductImageUpload` accepts JPG/PNG/WebP files up to 10 MB each (50 total), obtains an admin-only signature from `/api/v1/uploads/products/cloudinary-signature`, and uploads directly to Cloudinary. Successful secure URLs are included in the product creation payload and saved as product images by the existing backend. Failed uploads must be retried or removed before submission. Removing an image from the form does not delete its Cloudinary asset; abandoned uploads require separate cleanup. The Cloudinary API secret stays on the backend.

Orders use admin-only `GET /api/v1/admin/orders` and `GET /api/v1/admin/orders/:id`. Search matches order IDs and customer name/email; all order statuses are filterable. The detail modal shows purchased-item snapshots, current catalog images (or placeholders), payment records and status history. Shipping addresses are current saved addresses, not historical snapshots. Amounts use the recorded order currency. Confirmed updates use `PATCH /api/v1/orders/:id/status` and follow PAID → PROCESSING → SHIPPED → OUT_FOR_DELIVERY → DELIVERED; the backend remains authoritative and sends its existing notifications. There are no manual payment, refund, cancellation or tracking actions in this UI.

Inventory reads `GET /api/v1/admin/reports/inventory`. Search and pagination operate on that report in the browser; summary totals cover all returned records. Available units exclude reservations; low stock is 1–10 available units. Confirmed adjustments post a signed quantity change and required reason to `POST /api/v1/admin/inventory/:variantId/adjust`. The existing backend enforces reserved-stock limits and records the audit trail. Missing inventory records are not created by this page. An uncertain mutation result locks the dialog and refreshes the report before another attempt.

Review reports read the protected `GET /api/v1/admin/reports/experience-reviews` endpoint, separate from the legacy product-review report. Overall, delivery and checkout averages cover the entire selected period, while feedback is paginated. Unanswered optional ratings are excluded from averages; empty averages display a dash. Last 30/90 days are rolling UTC windows anchored when the filter changes or Refresh is pressed. Summary CSV exports aggregates only, not customer comments or contact information. NPS, sentiment trends, moderation, replies and flags are not supported by this review model and are not shown.

Transactions use the existing protected `GET /api/v1/admin/transactions?q=...`, `GET /api/v1/admin/transactions/:id/timeline` and `GET /api/v1/admin/transactions/:id/stripe-events` endpoints. Search is server-side; status filtering and pagination operate on returned records in the browser. Amounts retain each payment's currency. Detail schemas discard raw webhook payloads and attempt metadata; the UI displays operational fields only. Timeline and event errors can be retried independently of the list. This UI does not perform refunds, retries, cancellations or webhook replays.

Source artwork URLs are retained; images fall back to the shared local placeholder if unavailable. The original `public/download*` files were unused HTML exports, not image assets.
