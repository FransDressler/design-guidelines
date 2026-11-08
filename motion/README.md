# Motion

Einbinden: `motion/motion.css` + `motion/motion.js` (ohne Framework, ~4 KB). Demo: `motion/index.html`.

Stärke für die ganze Seite: `<html data-motion="calm|lively|bold">`. Davon hängen Distanz, Dauer, Easing und Stagger ab.

| Attribut | Wirkung | Einsatz |
|---|---|---|
| `data-reveal="up|left|clip|scale"` | Einblenden beim Scrollen. Geschwister werden automatisch gestaffelt | Listen, Karten, Bilder |
| `data-split` / `data-split="chars"` | Wörter oder Buchstaben steigen aus einer Maske | **eine** Headline pro Seite |
| `data-marquee` / `="fast"` | Endloses Laufband, pausiert bei Hover | Kundenlogos, Event-Infos |
| `data-magnetic` | Button folgt dem Mauszeiger leicht | nur die Haupt-Handlung |
| `data-hover-preview="bild.jpg"` | Vorschaubild folgt dem Mauszeiger | Projektlisten |
| `data-count="812"` | Zahl zählt hoch, wenn sichtbar | eine Kennzahl |
| `.draw` | Unterstreichung zeichnet sich ein | Textlinks |
| Seitenwechsel | Weiches Überblenden zwischen Seiten (View Transitions API) | automatisch |

Regeln:
- Inhalt wird nur versteckt, wenn das Skript läuft. Ohne JS ist alles sichtbar.
- Bei `prefers-reduced-motion` gibt es keine Bewegung, und das Laufband steht still.
- Höchstens **eine** auffällige Animation pro Viewport: Split-Headline **oder** Laufband **oder** Zähler.
- `calm` für seriöse Marken (Kanzlei, Gesundheit), `bold` nur für Events, Sport und Musik.
