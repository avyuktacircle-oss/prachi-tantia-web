# Brand guidelines — Avyukta Circle

This site follows the **Avyukta Circle** brand system. Source: internal usage guide (logo, digital RGB, typography, business applications).

## Digital colour (RGB)

Use these values for screens and web. Implementation: Tailwind tokens under `brand.*` in `tailwind.config.ts`.

| Role | Hex | Token |
|------|-----|--------|
| Primary | `#075A82` | `brand-navy` |
| Secondary | `#367999` | `brand-teal` |
| Secondary | `#6C9DB4` | `brand-sky` |
| Accent | `#E5AB30` | `brand-gold` |
| Accent (light) | `#EABB58` | `brand-goldLight` |

Secondary palette notes in the guide are marked *as per client suggestion*; the hex values above are the approved digital set.

## Typography

| Use | Family | Weights |
|-----|--------|---------|
| Headings & display | **Poppins** | Regular (400), Bold (700) |
| Body & UI copy | **Open Sans** | Regular (400), Bold (700) |

Loaded via `next/font` in `app/layout.tsx` as CSS variables `--font-poppins` and `--font-open-sans`.

## Logo & pattern

Full logo usage, clear space, and single-colour variants are defined in the master brand PDF. A **brand pattern** asset is specified in that document for decorative use where appropriate.

## Contact (business card reference)

As on official collateral:

- **Prachi Tantia** — Founder, Avyukta Circle · Yoga and Wellness Coach  
- Phone: +91 90994 59469  
- Email: avyuktacircle@gmail.com  
- Web: [avyuktacircle.org](https://avyuktacircle.org)
