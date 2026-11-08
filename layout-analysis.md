# Layout-Analyse: Größen, Skalierung, Anordnung

Methode: `tools/shoot.js` (Screenshot 1440×900 + Overlay: rot = Headlines, blau = Fließtext, grün = Buttons, orange = Medien, lila gestrichelt = Sections, jeweils mit px-Maßen) und `tools/metrics.js` (gemessene Werte). Bilder in `shots/`.

## Quellen / Beispielprojekte

- **GitHub:** tweakcn (jnsahaj/tweakcn, ~10,5k ★, visueller shadcn-Theme-Editor), neobrutalism-components (ekmas, ~5,6k ★), 8bitcn-ui (TheOrcDev, ~2k ★), shadcn-landing-page (leoMirandaa, ~2k ★, hier als generische Referenz gemessen), shadcn-themer, juliobsz/skills („award-caliber websites“-Agent-Skill).
- **YouTube (Titel, noch nicht transkribiert — Rate-Limit):** Payton Clark Smith „How to properly layout a website“, Self-Made Web Designer „17 Swipeable Layout Examples“, Ankita Kulkarni „You're Using Shadcn UI the WRONG Way“, Better Stack „Your AI UI Looks Generic… (DESIGN.md)“, Mizko „Perfect Typography Scale“.
- **Gemessene Seiten:** stripe, mercury, linear, vercel, patagonia, teenage.engineering, rauno.me, shadcn-landing-page.

## Messwerte

| Seite | Größte Headline | Body | Verhältnis | Schriftgrößen im Viewport | Button-Höhe | Headline-Font |
|---|---|---|---|---|---|---|
| **shadcn-landing (Template)** | 60 | 16 | 3,8 | 14,16,18,20,24,30,36,48,60 | 40 | System-Sans |
| Stripe | 56 | 18 | 3,1 | 15 Stufen inkl. 9–11 px Microcopy | 48 | Söhne |
| Mercury | 49 | 14 | 3,5 | 12,14,16,18,**21**,24,28,32,**42,49,65** | 35 | Arcadia Display |
| Linear | 72 | 15 | 4,8 | 10–18 dicht, dann Sprung 24→48→64→72 | 28 | Inter |
| Vercel | 64 | 24 | 2,7 | 11–24, dann Sprung auf 56/64 | 32 | Geist |
| Patagonia | 48 | 16 | 3,0 | **nur 16, 28, 48** | – | Avenir Next |
| teenage.engineering | – | – | – | 9–40, alles klein, Produktfoto trägt | 44 | TE eigene |
| rauno.me | – | – | – | 14/16 + ein riesiges Grafikwort | – | Custom |

## Was die Zahlen zeigen

1. **Das Template verrät sich über die Skala.** 14·16·18·20·24·30·36·48·60 ist exakt Tailwinds `text-sm … text-6xl` — gleichmäßige Stufen, keine Entscheidung. Profi-Seiten haben **ungerade Werte** (21, 42, 49, 65) aus einer eigenen Skala oder `clamp()`, und einen **Sprung**: viele kleine Größen dicht beieinander, dann eine Lücke zur Display-Größe (Linear 24→48, Vercel 24→56).
2. **Eigene Schrift ist das billigste Unterscheidungsmerkmal.** Jede Profi-Seite hat eine Hausschrift (Söhne, Arcadia, Geist); nur das Template nutzt System-Sans. Linear nutzt Inter — aber mit 72 px und engem Tracking.
3. **Wenige Stufen reichen.** Patagonia kommt mit 3 Größen aus und wirkt trotzdem klar; Hierarchie kommt aus Bild + Weißraum.
4. **Buttons sind kleiner, als man denkt.** Linear 28 px, Vercel 32, Mercury 35; nur Stripe 48 als bewusste Conversion-Seite. Template-Default 40 px „mittel“ wirkt brav.
5. **Microcopy unter 13 px** (Stripe 9–11, Linear 10–12, TE 9) für Labels/Meta — schafft Tiefe zur großen Headline. Templates gehen nie unter 14.
6. **Textbreite:** Fließtext-Blöcke ~230–390 px schmal (Stripe 354, Linear 386) — kurze Zeilen, Text als Beiwerk zur Headline/zum Visual.

## Anordnung (aus den Overlays)

- **Template:** alles mittig, eine Spalte, Badge → H1 → Text → 2 Buttons → Screenshot. Symmetrisch, berechenbar.
- **Stripe/Linear/Vercel:** H1 **linksbündig** oder sehr breit, Visual rechts/unten **angeschnitten** (geht über den Rand), sichtbares Raster (Stripe Haarlinien).
- **Mercury:** Vollflächiges Foto/Video als Grund, Text darauf — Atmosphäre statt Karte.
- **teenage.engineering / Patagonia:** Produkt/Foto ist der Held, Typo klein und dienend.
- **rauno.me:** fast leer, ein grafisches Element — Persönlichkeit durch Weglassen.

## Regeln für uns

- Typo-Skala selbst setzen: z. B. 12 · 14 · 16 · 20 · **44 · 72** (Lücke zwischen Text- und Display-Bereich).
- Eine Hausschrift mit Charakter für Headlines; Tracking bei Display negativ (−2 bis −3 %).
- Microcopy 11–12 px uppercase/mono für Meta; Buttons 32–36 px Höhe, nur Haupt-CTA größer.
- Hero linksbündig oder asymmetrisch, Visual anschneiden; zentrierte Single-Column nur bewusst.

Hinweis: levain, itsnicethat, nothing waren durch Cookie-/Newsletter-Popups verdeckt — nicht ausgewertet.

## shadcn-Tuning (shadcn-lab/, `npx vite --port 8744`)

Gleiche Komponenten (Button, Card, Input, Label, Badge, Table), links Default, rechts getunt — nur über CSS-Variablen + className, `components/ui` unverändert:

| Default (generisch) | Getunt |
|---|---|
| Card mit Rahmen, Radius, Footer-Fläche | keine Card: 2px-Linie oben + Textblock |
| Badge „✨ Neu“ | Mono-Microcopy 11 px uppercase („Vorbestellung · Woche 46“) |
| Titel 16 px, Text 14 px (Ratio ~1,1) | Display 44 px / −3 % Tracking, Text 15 px (Ratio ~2,9) |
| „Get Started“ + Outline „Learn More“ | konkreter CTA „Platz reservieren“ + Textlink als Zweitaktion |
| Input mit Rahmen | Unterstrich-Input, Label sagt wofür |
| Zahlen linksbündig, Status als Pill-Badges | Zahlen rechts, `tabular-nums`, 1.180 statt 1180; Status als Punkt + Text, „Ausverkauft“ durchgestrichen |
| Geist + neutral grau | Bricolage Grotesque + JetBrains Mono, Palette Crumbz / Zyorex / Pelmatech, Radius je Marke (0.9rem / 2px / 6px) |
