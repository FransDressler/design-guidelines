# SEO-Checkliste + Tool

```bash
node tools/seo-audit.js <url>               # On-Page-Checks, Exit 1 bei Fehlern
node tools/seo-audit.js <url> --lighthouse  # zusätzlich Lighthouse-SEO-Score
node tools/meta.js --title "…" --desc "…" --url "…" [--image …] [--jsonld local-business]   # fertiger <head>-Block + Warnungen
node tools/sitemap.js https://domain.de/ [ordner]                                          # sitemap.xml aus allen .html (noindex wird übersprungen)
```

Bausteine:
- `seo/head.html`: Grundausstattung mit Platzhaltern
- `seo/jsonld/`: Vorlagen für organization, local-business, event, product, person, article, faq, breadcrumb. Das Audit meldet einen **Fehler**, wenn `{{…}}`-Platzhalter stehen geblieben sind oder das JSON kaputt ist.
- `robots.txt`: verweist auf die Sitemap

Schreibregeln für Title und Description: Was es ist, für wen oder wo, und eine Zahl (Preis, Menge, Jahr, Ort). `tools/meta.js` warnt bei Floskeln und wenn keine Zahl vorkommt.

| Check | Ziel | Warum |
|---|---|---|
| `<title>` | 30–60 Zeichen, Hauptbegriff vorne, pro Seite eindeutig | Überschrift im Suchergebnis |
| Meta-Description | 70–160 Zeichen, konkreter Nutzen | Snippet-Text, beeinflusst Klickrate |
| genau 1 `<h1>` | beschreibt die Seite | Hauptthema für Crawler und Screenreader |
| Überschriften-Reihenfolge | keine Ebene überspringen (h2 → h4) | Gliederung |
| `alt` an jedem Bild | beschreibend, dekorativ = `alt=""` | Bildersuche, Barrierefreiheit |
| `lang` | richtige Sprache | Sprachzuordnung |
| Viewport-Meta | `width=device-width` | Mobile-First-Indexierung |
| Canonical | absolute URL der Seite | verhindert Duplikate |
| Open Graph + Twitter Card | title, description, image (1200×630), url | Vorschau beim Teilen |
| Linktexte | sagen, wohin es geht – kein „hier“ / „mehr“ | Kontext für Crawler |
| Inhalt | genug eigener Text (Faustregel ≥ 200 Wörter für Inhaltsseiten) | Thin Content |
| JSON-LD | `Organization`, `Product`, `Article`, `FAQPage` je nach Seite | Rich Results |
| robots.txt / sitemap.xml | am Domain-Root erreichbar, Sitemap in robots.txt verlinkt | Crawling |

**GitHub-Pages-Hinweis:** Bei Projektseiten (`user.github.io/repo/`) liegt der Domain-Root im Repo `user.github.io`. robots.txt muss dort hin. Die `sitemap.xml` dieses Projekts liegt unter `/design-guidelines/sitemap.xml` und lässt sich in der Search Console einreichen.

Nicht automatisiert: Keyword-Recherche, Backlinks, Ladezeit unter echten Bedingungen (dafür Lighthouse Performance oder PageSpeed Insights).
