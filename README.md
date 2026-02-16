# Levnemytivyloh.CZ — Astro 5 + Svelte 5 (Cloudflare Workers)

Web profesionálních mycích služeb firmy Alabastr Clean, s.r.o. Konverze z WordPress (Custom theme + Visual Composer) na moderní Astro 5 se Svelte 5 komponentami (runes). Deployuje se na **Cloudflare Workers** s custom doménou `levnemytivyloh.cz`.

## Požadavky

- Node.js 22+
- pnpm

## Instalace

```bash
pnpm install
```

## Vývoj

```bash
pnpm dev
```

Dev server běží na `http://localhost:4321`.

## Build

```bash
pnpm build
pnpm preview   # náhled produkčního buildu
```

Výstup se generuje do `dist/`. Statické stránky jsou prerenderované (výchozí chování Astro 5), objednávkový formulář funguje přes **Astro Actions** (SSR na Cloudflare Workers).

## Deploy (Cloudflare Workers)

Deploy probíhá automaticky přes GitHub integraci — každý push do `main` spustí build na Cloudflare.

Manuální deploy:

```bash
pnpm build && pnpm wrangler deploy
```

Konfigurace workeru je v `wrangler.jsonc`. Custom doména `levnemytivyloh.cz` je nastavena v sekci `routes`.

### Env proměnné

Env proměnné jsou definované pomocí **`astro:env`** modulu (typově bezpečné schéma v `astro.config.mjs`). Na produkci se nastavují přes Cloudflare CLI:

```bash
pnpm wrangler secret put RESEND_API_KEY
pnpm wrangler secret put ORDER_EMAIL
pnpm wrangler secret put ADMIN_PASSWORD
pnpm wrangler secret put TURNSTILE_SECRET_KEY
```

| Proměnná | Popis |
|---|---|
| `RESEND_API_KEY` | API klíč z [resend.com](https://resend.com) pro odesílání emailů |
| `ORDER_EMAIL` | Cílová adresa pro objednávky (default: info@levnemytivyloh.cz) |
| `ADMIN_PASSWORD` | Heslo pro administraci |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret pro anti-spam ochranu formuláře |

Pro lokální vývoj vytvořte `.env` soubor dle `.env.example`.

## Struktura projektu

```
src/
├── actions/
│   └── index.ts                # Astro Action — odeslání objednávky (Resend batch API)
├── components/
│   ├── Header.astro            # Logo, navigace, Facebook, vlajky CZ/EN
│   ├── Footer.astro            # Patička s kontakty (telefony, email)
│   ├── WeatherWidget.astro     # Widget počasí (Elfsight)
│   ├── HeroSection.astro       # Hero banner + 5 krokových karet
│   ├── AboutSection.astro      # O firmě
│   ├── ServicesSection.astro   # 3 služby s cenami (pricing cards)
│   ├── ReferencesGrid.astro    # Grid referenčních log
│   ├── Modal.svelte            # Znovupoužitelný modal (nativní <dialog>)
│   ├── StepCard.svelte         # Karta kroku s info popupem
│   ├── PricingCard.svelte      # Karta služby s cenou a objednávkou
│   ├── OrderForm.svelte        # Objednávkový formulář s validací
│   ├── OrderFormModal.svelte   # Modal wrapper pro formulář
│   ├── CookieConsent.svelte    # GDPR cookie banner
│   └── MobileMenu.svelte       # Hamburger menu pro mobily s vlajkami
├── data/
│   ├── popups.ts               # Texty info popupů
│   ├── references.ts           # Referenční loga
│   └── steps.ts                # 5 kroků (název, popis, obrázek, popup ID)
├── i18n/
│   └── translations.ts         # Překlady CZ/EN (navigace, hero, ceník, kontakty, SEO)
├── layouts/
│   └── BaseLayout.astro        # HTML shell, SEO, hreflang, canonical, JSON-LD
├── pages/
│   ├── index.astro             # CZ hlavní stránka + Schema.org
│   ├── kontakty.astro          # CZ kontakty
│   ├── objednavkovy-formular.astro  # CZ objednávkový formulář
│   ├── portfolio-sluzeb.astro  # CZ portfolio/reference
│   ├── zasady-ochrany-osobnich-udaju.astro  # CZ GDPR
│   └── en/
│       ├── index.astro         # EN homepage
│       ├── contacts.astro      # EN contacts
│       ├── order-form.astro    # EN order form
│       ├── portfolio.astro     # EN portfolio
│       └── privacy-policy.astro # EN privacy policy
├── styles/
│   ├── fonts.css               # @font-face (Alabastr, SpartanMB, Open Sans, Fontello, Weather Icons)
│   └── global.css              # CSS custom properties, reset, základní styly
└── public/
    ├── fonts/                  # Lokální fonty (woff, woff2)
    └── images/                 # Obrázky (loga, kroky, reference)
```

## Technologie

| Technologie | Použití |
|---|---|
| **Astro 5** | Framework, statické prerenderování + Astro Actions (SSR) |
| **Svelte 5** | Interaktivní komponenty (runes: `$state`, `$derived`, `$effect`, `$bindable`) |
| **Cloudflare Workers** | Hosting + SSR runtime |
| **Cloudflare D1** | Databáze objednávek |
| **Resend API** | Odesílání emailů (`batch.send` — notifikace + potvrzení zákazníkovi) |
| **Cloudflare Turnstile** | Anti-spam ochrana formuláře |
| **astro:env** | Typově bezpečné env proměnné se schéma validací |
| **astro-seo** | SEO meta tagy a OpenGraph |
| **@astrojs/sitemap** | Automatický sitemap s i18n podporou |
| **ClientRouter** | SPA navigace (view transitions) |
| **Schema.org JSON-LD** | Strukturovaná data (`LocalBusiness`, služby, kontakty) |
| **CSS Custom Properties** | Design tokeny (barvy, typografie, rozestupy) |
| **Nativní `<dialog>`** | Modální okna (nahrazuje jQuery Popup Maker) |

## i18n (vícejazyčnost)

Web je dostupný v češtině (výchozí) a angličtině:

- CZ stránky: `/`, `/kontakty/`, `/objednavkovy-formular/`, `/portfolio-sluzeb/`, `/zasady-ochrany-osobnich-udaju/`
- EN stránky: `/en/`, `/en/contacts/`, `/en/order-form/`, `/en/portfolio/`, `/en/privacy-policy/`
- Přepínání jazyků přes vlajky v headeru
- Hreflang tagy a `x-default` pro SEO
- Sitemap s i18n alternativami

## Objednávkový formulář

Formulář používá **Astro Actions** (`src/actions/index.ts`):

- Validace vstupu přes Zod schéma (`astro:schema`)
- Honeypot anti-spam pole + Cloudflare Turnstile
- Odeslání dvou emailů najednou přes `resend.batch.send()`:
  1. **Notifikace** na `ORDER_EMAIL` s detaily objednávky
  2. **Potvrzení** zákazníkovi na jeho email
- Uložení objednávky do Cloudflare D1 databáze
- Odesílatel: `formular@levnemytivyloh.cz` (doména ověřena v Resend)

## SEO

- **Meta tagy**: title, description, OpenGraph (přes `astro-seo`)
- **Schema.org JSON-LD**: `LocalBusiness` s nabídkou služeb, kontakty, otevírací dobou a oblastí působení
- **Hreflang**: CZ/EN alternativy + x-default
- **Canonical URL**: na každé stránce
- **Sitemap**: automaticky generovaný s i18n
- **robots.txt**: s odkazem na sitemap
- **Obrázky**: explicitní `width`/`height`, `loading="lazy"`
- **Fonty**: self-hosted (swap), externí CSS soubory pro kompatibilitu s view transitions
- **Přístupnost**: správná hierarchie nadpisů, WCAG AA kontrast

## Hydrační strategie

Svelte komponenty používají různé hydrační direktivy podle priority:

- `client:idle` — OrderFormModal, MobileMenu, CookieConsent, OrderForm (hydrace po načtení stránky)
- `client:visible` — StepCard, PricingCard (hydrace při scrollu)

## Příkazy

| Příkaz | Akce |
|---|---|
| `pnpm install` | Instalace závislostí |
| `pnpm dev` | Spustí dev server na `localhost:4321` |
| `pnpm build` | Produkční build do `./dist/` |
| `pnpm preview` | Náhled produkčního buildu |
| `pnpm wrangler deploy` | Manuální deploy na Cloudflare Workers |
