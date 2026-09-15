# Google Analytics setup

The storefront sends consent-based GA4 events. `/admin/analytics` reads reports through the protected backend `GET /api/v1/admin/analytics?days=30` endpoint. No Google private key belongs in the frontend.

## Google setup

1. Create a GA4 property and Web data stream for the public storefront URL. Choose the appropriate reporting time zone and CAD currency.
2. Copy the stream's Measurement ID (`G-...`) and the property's numeric Property ID. These are different identifiers, and neither is the Google Cloud project ID.
3. In the Web stream settings, **disable Enhanced Measurement** for this integration. This app sends its own page views and shopping events. Automatic history/form/search events can duplicate tracking or collect URL parameters. Do not add another GA/GTM snippet for the same stream.
4. In Google Cloud, enable **Google Analytics Data API**. Create a dedicated service account for analytics reporting (do not reuse the backup account).
5. In GA Admin → Property access management, add the service account's `client_email` with **Viewer** access. Google Cloud project permissions alone do not grant analytics property access.
6. Obtain a JSON key for that service account and store it privately. Encode the entire JSON file as Base64 for the backend environment variable. Base64 is not encryption. Never commit or paste the private key in chat.

## Frontend environment

Add to `front-end/.env` locally and the frontend hosting environment for deployment:

```dotenv
NEXT_PUBLIC_GA_ENABLED=true
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID
NEXT_PUBLIC_GA_DEBUG=false
```

Tracking is off unless enabled and a valid measurement ID is present. Localhost/127.0.0.1 are excluded unless DEBUG is true. To test locally, use a separate test GA4 property and `NEXT_PUBLIC_GA_DEBUG=true`, then restart Next.js. Production must use false. Public env variables are build-time values: rebuild/redeploy the frontend after changing them.

## Backend environment

Add to `sagi-backend/.env` and the backend host (Render):

```dotenv
GA4_ENABLED=true
GA4_PROPERTY_ID=123456789
GA4_SERVICE_ACCOUNT_JSON_BASE64=YOUR_BASE64_ENCODED_SERVICE_ACCOUNT_JSON
```

Restart/redeploy the backend after setting these. Existing `googleapis` is reused; no additional package or database migration is needed. Setting `GA4_ENABLED=false` disables API reporting and shows the setup state in admin. This does not switch off browser tracking; use the separate frontend flag for that.

PowerShell encoding (replace the path with your newly downloaded analytics key):

```powershell
$analyticsKeyPath = 'C:\path\to\analytics-service-account.json'
$analyticsJson = Get-Content -LiteralPath $analyticsKeyPath -Raw -ErrorAction Stop
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($analyticsJson)) | Set-Clipboard
```

Paste from the clipboard directly into the private backend variable. This is separate from the backup encryption key and Google Drive credentials.

## Tracking behavior

- Basic opt-in: the Google script is not loaded until Allow analytics is selected. Decline leaves the store usable. Privacy settings allow withdrawal; GA collection is disabled and accessible GA cookies are expired.
- Admin routes are excluded. Query strings and fragments are not sent as page locations; referral URLs are reduced to their origin. No customer profile, address, Stripe session IDs or raw search terms are intentionally sent.
- Events: manual SPA `page_view`, live-product `view_item`, backend-successful `add_to_cart`, `begin_checkout` before redirect, `purchase` after the backend confirms payment, and search activity counts without query text.
- Purchase value is item subtotal; shipping is separate. A stable order ID is `transaction_id`. Browser storage suppresses repeat submissions on reload; GA's transaction ID also supports deduplication. Analytics failure never blocks checkout.
- Purchase tracking is browser-based, not a Stripe webhook/Measurement Protocol integration. Customers who do not return to the success page, decline consent or block Google may be absent. The database/Stripe remains authoritative for revenue and fulfillment. No historic orders are backfilled.
- Reporting uses the property's date boundaries, includes today, and caches results for 5 minutes per period. It is not real-time. Top lists are limited to 10 rows; event counts are not a unique-user funnel. Optional Google privacy thresholds are indicated.
- Update the site's privacy notice to describe your analytics use and retention choices before launch. The banner is not a guarantee of legal compliance.

## Verification

1. Use a test property for local development. Restart both apps after configuring environments.
2. Before consent, verify no requests to googletagmanager.com or Google Analytics collection endpoints in browser Network tools.
3. Allow analytics, browse storefront routes, then inspect GA DebugView. Check that one page view occurs per path navigation and URLs have no query strings.
4. Add an item successfully, begin checkout, and complete a Stripe test payment with webhook processing enabled. Purchase should appear only after confirmed payment; reloading should not resend it from that browser.
5. Visit `/admin/analytics` with an ADMIN account. Reporting may lag DebugView. Empty reports initially are normal. Verify non-admin users cannot access `/api/v1/admin/analytics`.
6. Decline via Privacy settings and verify collection stops. Test admin navigation too.

Official references: [GA4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart), [manual pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views), [consent](https://developers.google.com/tag-platform/security/guides/consent).
