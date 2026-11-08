# Sticker & Grain

Einbinden: `stickers/stickers.css` + `stickers/stickers.js`. Das Elternelement braucht `position:relative` (`.media` hat das).

```html
<html data-stickers="stamp" data-grain="on">        <!-- Standard-Variante, Körnung an -->
<span class="sticker" data-sticker="badge" style="right:6%;top:-28px">4 €/Tag</span>
```

| Variante | Look | Passt zu |
|---|---|---|
| `stamp` | runder Doppelring-Stempel in Akzentfarbe | Handwerk, Architektur, Garantie, Preise |
| `tape` | Klebeband in der Pop-Farbe mit gerissenen Enden | Portfolio, Notizen, „neu“ |
| `badge` | Sternform in der Pop-Farbe | Shop, Food, Angebote |
| `scribble` | Handschrift mit gezeichnetem Pfeil (Caveat, wird nur bei Bedarf geladen) | Events, Kreativ, persönliche Hinweise |
| `none` | blendet alle Sticker aus | seriöse Marken |

Regeln:
- Höchstens 1–2 Sticker pro Viewport, immer am **Rand** eines Bildes oder Blocks, nie mitten im Text.
- Die Neigung ergibt sich fest aus dem Text, also immer gleich und nicht zufällig.
- Sticker sind Dekoration (`aria-hidden`). Wichtige Infos müssen zusätzlich im Text stehen.
- `?stickers=…` in der URL überschreibt alle Varianten. Das nutzt der Generator.
