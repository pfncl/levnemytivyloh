# Myči.CZ — Astro 5 + Svelte 5 (Cloudflare Workers)

Web profesionálních mycích služeb firmy Alabastr Clean, s.r.o. Konverze z WordPress (Custom theme + Visual Composer) na moderní Astro 5 se Svelte 5 komponentami (runes). Deployuje se na **Cloudflare Workers** s custom doménou `myci.cz`.

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

Konfigurace workeru je v `wrangler.jsonc`. Custom doména `myci.cz` je nastavena v sekci `routes`.

### Env proměnné

Env proměnné jsou definované pomocí **`astro:env`** modulu (typově bezpečné schéma v `astro.config.mjs`). Na produkci se nastavují přes Cloudflare CLI:

```bash
pnpm wrangler secret put RESEND_API_KEY
pnpm wrangler secret put ORDER_EMAIL
```

| Proměnná | Popis |
|---|---|
| `RESEND_API_KEY` | API klíč z [resend.com](https://resend.com) pro odesílání emailů |
| `ORDER_EMAIL` | Cílová adresa pro objednávky (default: info@myci.cz) |

Pro lokální vývoj vytvořte `.env` soubor dle `.env.example`.

## Struktura projektu

```
src/
├── actions/
│   └── index.ts                # Astro Action — odeslání objednávky (Resend batch API)
├── components/
│   ├── Header.astro            # Logo, objednávka tlačítko, telefony
│   ├── Footer.astro            # Patička s logem a weather widgetem
│   ├── WeatherWidget.astro     # Widget počasí (Elfsight)
│   ├── HeroSection.astro       # Hero banner + 5 krokových karet
│   ├── ServicesSection.astro   # 4 služby s cenami
│   ├── ReferencesGrid.astro    # Grid 12 referenčních log
│   ├── Modal.svelte            # Znovupoužitelný modal (nativní <dialog>)
│   ├── StepCard.svelte         # Karta kroku s info popupem
│   ├── ServiceCard.svelte      # Karta služby s info popupem
│   ├── OrderForm.svelte        # Objednávkový formulář s validací
│   ├── OrderFormModal.svelte   # Modal wrapper pro formulář
│   ├── CookieConsent.svelte    # GDPR cookie banner
│   └── MobileMenu.svelte       # Hamburger menu pro mobily
├── data/
│   ├── popups.ts               # Texty 8 info popupů
│   ├── references.ts           # 12 referenčních log
│   ├── services.ts             # 4 služby (název, cena, popup ID)
│   └── steps.ts                # 5 kroků (název, popis, obrázek, popup ID)
├── layouts/
│   └── BaseLayout.astro        # HTML shell, SEO meta tagy (astro-seo), JSON-LD, fonty
├── pages/
│   ├── index.astro             # Hlavní stránka + Schema.org structured data
│   └── zasady-ochrany-osobnich-udaju.astro  # GDPR stránka
├── styles/
│   ├── fonts.css               # @font-face (Alabastr, SpartanMB, Fontello, Weather Icons)
│   └── global.css              # CSS custom properties, reset, základní styly
└── public/
    ├── fonts/                  # Lokální fonty (woff, woff2)
    └── images/                 # Obrázky ve WebP (loga, galerie, reference)
```

## Technologie

| Technologie | Použití |
|---|---|
| **Astro 5** | Framework, statické prerenderování + Astro Actions (SSR) |
| **Svelte 5** | Interaktivní komponenty (runes: `$state`, `$derived`, `$effect`, `$bindable`) |
| **Cloudflare Workers** | Hosting + SSR runtime |
| **Resend API** | Odesílání emailů (`batch.send` — notifikace + potvrzení zákazníkovi) |
| **astro:env** | Typově bezpečné env proměnné se schéma validací |
| **astro-seo** | SEO meta tagy a OpenGraph |
| **Schema.org JSON-LD** | Strukturovaná data (`LocalBusiness`, služby, kontakty) |
| **CSS Custom Properties** | Design tokeny (barvy, typografie, rozestupy) |
| **Nativní `<dialog>`** | Modální okna (nahrazuje jQuery Popup Maker) |

## Objednávkový formulář

Formulář používá **Astro Actions** (`src/actions/index.ts`):

- Validace vstupu přes Zod schéma (`astro:schema`)
- Honeypot anti-spam pole
- Odeslání dvou emailů najednou přes `resend.batch.send()`:
  1. **Notifikace** na `ORDER_EMAIL` s detaily objednávky
  2. **Potvrzení** zákazníkovi na jeho email
- Odesílatel: `formular@myci.cz` (doména ověřena v Resend)

## SEO

- **Meta tagy**: title, description, OpenGraph (přes `astro-seo`)
- **Schema.org JSON-LD**: `LocalBusiness` s nabídkou služeb, kontakty, otevírací dobou a oblastí působení
- **Obrázky**: WebP formát, explicitní `width`/`height`, `loading="lazy"`
- **Fonty**: Google Fonts načítané asynchronně (preload + swap)
- **Přístupnost**: správná hierarchie nadpisů (h1→h2→h3), WCAG AA kontrast

## Hydrační strategie

Svelte komponenty používají různé hydrační direktivy podle priority:

- `client:idle` — OrderFormModal, MobileMenu, CookieConsent (hydrace po načtení stránky)
- `client:visible` — StepCard, ServiceCard (hydrace při scrollu)

## Komunikace Astro ↔ Svelte

Header (Astro) nemůže přímo otevřít modal (Svelte). Řešení přes event delegaci:

1. Header: `<button data-open-modal="order-form">`
2. OrderFormModal: `document.addEventListener('click', ...)` filtruje `[data-open-modal]`

## Porovnání s WordPress originálem

| Metrika | WordPress | Astro 5 |
|---|---|---|
| CSS | ~700 KB | 7 KB |
| JS soubory | 1400+ | 17 chunků (~62 KB) |
| Build čas | — | ~3s |
| Obrázky | JPG/PNG | WebP |
| Závislosti | jQuery, Visual Composer, Popup Maker, Gravity Forms, Complianz, TRX Addons | Astro, Svelte |

## Příkazy

| Příkaz | Akce |
|---|---|
| `pnpm install` | Instalace závislostí |
| `pnpm dev` | Spustí dev server na `localhost:4321` |
| `pnpm build` | Produkční build do `./dist/` |
| `pnpm preview` | Náhled produkčního buildu |
| `pnpm wrangler deploy` | Manuální deploy na Cloudflare Workers |
