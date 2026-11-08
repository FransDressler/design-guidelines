# Blank — Web-Builder-Library für Agenten

Für Claude, JAIDE, Codex & Co. Ziel: Websites, die **nicht** nach Template aussehen. Du baust nicht frei, sondern **kombinierst**: ein Layout, eine Palette, ein Schriftpaar, eine Motion-Stufe, ein Skeleton, ein Sticker-Set. Die Kombination legt ein **Seed** fest. So entstehen viele unterschiedliche Seiten, die trotzdem alle die Regeln einhalten.

## Ablauf (immer in dieser Reihenfolge)

1. **Inhalt zuerst.** Echte Aussagen, Zahlen und Namen sammeln, bevor du ein Layout wählst. Regeln: `docs/CONTENT.md`.
2. **Seed wählen.** Mit `node tools/permute.js [seed]` bekommst du eine Kombination. Den Seed nicht zufällig wählen, sondern passend zur Marke. Dafür stehen bei jedem Token `mood` und `fits`.
3. **Layout aus `layouts/`** als Gerüst kopieren. Sections aus `sections/` einsetzen.
4. **Tokens einbinden:** `tokens/tokens.css`, am `<html>` dann `data-palette`, `data-type`, `data-radius` und `data-density` setzen.
5. **Motion und Skeletons** über `data-*`-Attribute (`motion/README.md`, `skeletons/README.md`). Höchstens **eine** auffällige Animation pro Viewport.
6. **Persönlich machen** mit Stickern, Grain und Akzent (`stickers/`). Höchstens 1–2 Sticker pro Viewport.
7. **Prüfen:** `node tools/seo-audit.js <url>` ohne Fehler, `node tools/shoot-mobile.js <url> <name>` ohne Overflow.

## Harte Regeln

- **Keine Standardstufen von Tailwind** (14/16/18/20/24/30/36/48/60) als einzige Schriftskala. Nimm `--fs-*` aus den Tokens.
- **Kein zentrierter Hero** mit Badge, Gradient-Headline und zwei Buttons. Kein Bento-Grid aus gleich großen Karten.
- **Akzentfarbe nur für Handlungen**, Verteilung 60/30/10.
- **Kein Lorem ipsum, keine Floskeln** („seamless“, „empower“, „revolutionize“, „unlock“). Siehe `docs/CONTENT.md`. <!-- lint-ok -->
- **Jede Animation** hat einen Fallback für `prefers-reduced-motion`. Kein Inhalt wird nur durch Animation sichtbar.
- **Touch-Ziele mindestens 44 px**, Fließtext mindestens 16 px auf Mobil, kein horizontales Scrollen der Seite.
- **SEO-Grundausstattung** auf jeder Seite: `seo/head.html`.

## Wo was liegt

| Ordner | Inhalt |
|---|---|
| `tokens/` | Paletten, Schriftpaare, Radien, Dichte als JSON + CSS |
| `layouts/` | Grundlayouts (ganze Seiten) |
| `sections/` | Hero, Features, Preise, Kontakt, Footer in Varianten |
| `motion/` | Reveal, Text-Split, Marquee, Hover, Seitenwechsel |
| `skeletons/` | Pixel-Dissolve, Scanline, Blur-up, Typewriter |
| `stickers/` | SVG-Sticker, Stempel, Grain |
| `seo/` | Head-Snippet, JSON-LD-Vorlagen, Sitemap-Generator |
| `tools/` | permute, seo-audit, shoot, shoot-mobile, metrics |
| `docs/` | Recherche, Guidelines, Paletten, Layout-Analyse, Content |
