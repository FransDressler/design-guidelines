# Skeletons

Einbinden: `skeletons/skeletons.css` + `skeletons/skeletons.js`. Demo: `skeletons/index.html`.

| Modus | Wirkung | Passt zu |
|---|---|---|
| `pixel` | Pixelblöcke flackern beim Laden, dann wird das Bild von grob zu scharf (64 → 4 px) und die letzten Blöcke lösen sich zufällig auf | Tech, Gaming, Retro, Kreativ |
| `scan` | Lichtbalken läuft beim Laden durch, danach Aufdecken von oben nach unten | Produkt, SaaS, Sport |
| `blur` | Fläche atmet, dann Blur-up mit leichtem Zoom | Food, Mode, Fotografie |
| `type` | Blinkender Cursor und Bildname wie im Terminal, dann Aufdecken in 6 Stufen | Portfolio, Agentur, Dev-Tools |

```html
<html data-skeleton="pixel">                                   <!-- Standard für die ganze Seite -->
<figure data-skel-media><img src="…" alt="…"></figure>             <!-- nutzt den Standard -->
<figure data-skel-media="blur" data-skel-wait="300">…</figure>     <!-- eigener Modus, Mindestwartezeit in ms -->

<div data-skel-text data-skel-wait="900">                          <!-- Text-Skeleton -->
  <div class="skel-lines"><i class="skel-line w60"></i><i class="skel-line"></i></div>
  …echter Inhalt…
</div>
```

Regeln: Die Animation startet erst, wenn das Element sichtbar ist. Bei `prefers-reduced-motion` erscheinen die Bilder ohne Effekt. Pro Seite nur **einen** Modus verwenden.
