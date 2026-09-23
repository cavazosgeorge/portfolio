# Portfolio design system

A product builder's portfolio: direct positioning, readable technical depth, and real interfaces as evidence of shipped work. The public site and writing use the same shell and type system; the authenticated CMS retains its existing Chakra implementation.

## Direction

Cool paper `#f3f6fa`, white `#ffffff`, ink `#17283d`, slate `#526176`, cobalt `#294ddd`, pale blue `#e5ecff`. Dark mode maps those roles to deep blue, light ink and a lighter cobalt. All surfaces are flat; no gradients or colored card-edge accents.

Manrope carries headings with a firm, compact rhythm; Source Sans 3 keeps long project descriptions and writing comfortable. Code alone uses a monospace fallback. Text is left aligned and reading measure is bounded. Large type and actual product screenshots are the focal points; labels, navigation and metadata stay quiet.

Layout: a broad positioning statement beside a compact professional context column; then generous product spreads (screen / description), a compact archive, experience, writing, about and contact. On phones each spread becomes a single column with the product screen before its details. Navigation becomes a Radix Sheet with focus containment, Escape dismissal and focus return.

Plan review: avoid an interchangeable dashboard-card hero, numbered decorative labels and fabricated proof metrics. Use the existing positioning copy and production content. Screenshots are real public guest interfaces captured September 22, 2026. CMS-provided images take precedence over bundled previews. Preserve the existing first-three-featured presentation and API ordering.

## Components and contracts

- Project-owned shadcn from the official registry, Radix base, `components.json`, Tailwind v4 through PostCSS (compatible with the existing Vite build).
- Buttons, cards, sheets, badges, fields, input, textarea, separators, skeletons, alerts and empty states live in `src/components/ui`.
- Theme roles and reusable page treatments live in `src/styles/global.css`; `cn` composes classes. Reusable controls have comfortable 44–48px targets and an opaque visible ring.
- Preserve `data-theme`, `color-mode` localStorage and blocking bootstrap. No entrance animation; only brief user-triggered transitions. Reduced motion disables movement and smooth scrolling.
- Preserve routes, SEO title/description, published content and all CMS/API contracts. No database migrations.
- Development-only `/design-system` showcases default, focus, disabled, pending, error and form states; excluded from production route registration.
