# AppKit language adapter

The trading app supports the twelve locales in `src/i18n/locales.ts`. Reown
AppKit is pinned to 1.8.23; its modal contains English literals and exposes no
locale option. `AppKitLocaleSynchronizer` follows next-intl's current locale.

`localize-modal.ts` observes only the body-level `w3m-modal` and its open shadow
roots. It changes existing text nodes and native placeholder/accessibility text,
not Lit templates, properties, event handlers, input values, QR payloads or wallet
signing messages. Known SDK phrases and anchored dynamic templates are in the
catalogs. Unknown provider errors stay verbatim rather than hiding error details.
Wallet/provider brands and external OAuth/extension/iframe screens are outside
this translation layer. English restores the exact original text.

Lazy custom-element upgrades are discovered using `whenDefined` / `updateComplete`.
There is no polling, global DOM rewrite, shadow-root monkey patch or vendored SDK
change. Observers are detached on unmount and old views are released after router
changes. Arabic sets the modal's language and right-to-left direction.

## Upgrade check

When updating any `@reown/*` dependency, review upstream modal/view strings and
open the modal, wallet search, QR, email/code, connection error and SIWE views.
Run `bun test tests/unit/appKitLocalization.test.ts` and verify the real UI in
Chinese, English, a long-label language and Arabic on desktop/mobile. New SDK
wording needs a catalog entry in every language; this is an adapter for a pinned
SDK, not a claim of upstream localization support.
