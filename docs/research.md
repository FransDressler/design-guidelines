# Recherche: Woran man „AI-generierte“ Websites erkennt und welche Farben Profis nutzen

> Stand: Nov 2026. Grundlage: Beobachtungen zu Outputs von v0, Lovable, Bolt, Claude/GPT-Artifacts und shadcn/Tailwind-Templates, dazu die Design-Systeme von Stripe, Linear, Vercel, GitHub (Primer), IBM Carbon, Apple HIG und Material 3 sowie NN/g-Studien (Lesemuster). Die Einordnung ist meine Synthese, keine einzelne Quelle.

## 1. Die AI-Signatur: warum sich alles gleich anfühlt

LLMs geben den statistischen Mittelwert ihrer Trainingsdaten aus. Seit 2023 besteht dieser Mittelwert aus Tailwind, shadcn/ui und Landingpage-Templates. Darum fällt keines der folgenden Merkmale allein auf. **Kommen mehrere zusammen, sieht man es sofort.**

### Farbe
- **Violett→Indigo→Blau-Verlauf** (`from-purple-500 to-blue-500`), oft auf Text per `bg-clip-text`. Das ist der stärkste Einzelindikator.
- Tailwind-Defaultpalette ohne Anpassung: `indigo-600`, `slate-900`, `gray-50`.
- Dunkler Hintergrund mit Neon-Glow und „Aurora“-Blobs (unscharfe Farbkreise hinter dem Hero).
- Jede Farbe ist gleich gesättigt, es fehlt eine echte Neutralfarbe mit Temperatur.

### Layout
- Immer dieselbe Abfolge: zentrierter Hero → Logo-Leiste → **3-Spalten-Feature-Grid mit Icon im runden Quadrat** → Testimonials → 3 Pricing-Karten (mittlere „Most Popular“) → FAQ-Akkordeon → CTA-Banner → 4-Spalten-Footer.
- Alles zentriert, alles symmetrisch, alle Abschnitte gleich hoch gepolstert (`py-24` überall).
- Karten in Karten in Karten, jede mit `rounded-2xl`, `shadow-lg` und `border`.

### Typografie
- Inter (oder Geist) für alles, eine einzige Schrift in 3 Gewichten.
- Riesige H1 mit `tracking-tight` und einem Wort im Verlauf.
- Badge-Pill über der H1 („✨ New: AI-powered …“).

### Text
- „Unlock / Supercharge / Elevate / Seamless / Effortless / Revolutionize your workflow“. <!-- lint-ok -->
- Dreierlisten überall, Gedankenstriche, „Built for X. Designed for Y.“
- Erfundene Kennzahlen („10,000+ teams“, „99.9 % uptime“) und Testimonials von „Sarah J., CEO“.
- Emojis als Icons (🚀 ⚡ ✨), Lucide-Icons ohne Bezug zum Inhalt.

### Details
- Glasmorphismus (`backdrop-blur`) ohne Grund, Hover-Scale `1.05` auf jeder Karte, Fade-in-up-Animation auf jedem Abschnitt.
- Keine echten Bilder, keine Produktscreenshots, nur Gradienten und Icons.
- Perfekte Konsistenz ohne Haltung: nichts bricht das Raster, nichts ist eigen.

**Kern:** AI-Design wirkt *generisch*, nicht *schlecht*. Erkennbar ist es daran, dass jede Entscheidung die sicherste ist und keine einzige aus dem Inhalt kommt.

## 2. Was professionelle Seiten anders machen

| Merkmal | Generisch | Professionell |
|---|---|---|
| Farbe | 1 Akzent, voll gesättigt, plus Verlauf | Fast nur Neutralfarben (90 %), ein Akzent sparsam eingesetzt, Neutralfarben leicht getönt (warm oder kalt) |
| Raster | Alles zentriert | Linksbündig, asymmetrisch, mit klarer Lese-Achse |
| Typo | Eine Sans | Kontrast aus Serif + Sans oder Sans + Mono, eigene Größenskala |
| Inhalt | Platzhalter-Claims | Konkrete Zahlen, echte Screenshots, Fachsprache der Zielgruppe |
| Dichte | Viel Luft, wenig Information | Dichte, wo sie gebraucht wird (Tabellen, Spezifikationen) |
| Ecken/Schatten | `rounded-2xl` + `shadow-lg` | Kleine Radien (2–6 px), Hairline-Borders statt Schatten |

## 3. Farbpaletten, die professionell wirken

Prinzip **60/30/10**: 60 % Grundfläche, 30 % Struktur und Text, 10 % Akzent. Der Akzent steht nur auf Handlungen (CTA, Links, Status).

### A. „Paper & Ink“ (redaktionell, warm)
| Rolle | Hex |
|---|---|
| Grund | `#F5F1EA` |
| Fläche | `#FBF9F5` |
| Text | `#1C1A17` |
| Text gedämpft | `#6B655C` |
| Linie | `#DDD6CA` |
| Akzent | `#B4441F` (Ziegel) |

Vorbilder: Stripe Press, The Browser Company, Literatur- und Studio-Seiten.

### B. „Graphite & Signal“ (Tool / Dev, kühl)
| Rolle | Hex |
|---|---|
| Grund | `#0E0F11` |
| Fläche | `#16181C` |
| Text | `#E8E6E1` |
| Gedämpft | `#8A8F98` |
| Linie | `#262A30` |
| Akzent | `#D7FF3F` (Signalgelb) **oder** `#FF5A1F` |

Vorbilder: Linear, Vercel, Raycast. Dunkel und ohne Violett.

### C. „Forest & Bone“ (seriös, vertrauenswürdig)
| Rolle | Hex |
|---|---|
| Grund | `#EEF0EA` |
| Text | `#16251E` |
| Primär | `#1F4D3A` (Tannengrün) |
| Akzent | `#C9A227` (Messing) |
| Linie | `#CDD3C8` |

Vorbilder: Banken, Kanzleien, Nachhaltigkeit (Monzo Business, Patagonia-artig).

### D. „Swiss“ (klassisch, institutionell)
Weiß `#FFFFFF`, Schwarz `#111111`, Grau `#767676`, Akzent Signalrot `#E10600`. Vorbilder: Museen, Architekturbüros, IBM Carbon.

### E. „Navy & Coral“ (B2B, freundlich)
Grund `#F7F8FA`, Text `#0B1F3A`, Primär `#0B1F3A`, Akzent `#FF6B4A`, Linie `#E3E7EE`.

**Regeln**
- Neutralfarben immer leicht tönen, nie reines `#000`/`#FFF` *und* reines Grau mischen.
- Kontrast für Text mindestens WCAG AA (4.5:1). Alle Text/Grund-Paare oben erfüllen das.
- Kein Verlauf als Hauptfarbe. Wenn ein Verlauf vorkommt, dann subtil und innerhalb eines Farbtons.
