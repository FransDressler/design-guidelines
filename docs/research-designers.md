# Was gute Designer-Websites ausmacht und wie Profis arbeiten

> Stand 2026-11-08. Quellen: 5 YouTube-Transkripte (gelesen, nicht nur Titel) + eigene Ansicht von Referenzseiten im Browser.
> Noch offen (YouTube-Rate-Limit 429): Griffin Wooldridge „Why Every AI-Generated UI Looks the Same“, Cecilia Kim „How I Avoid Generic AI Generated Designs“, femke.design „Why AI-generated design falls short“, Better Stack „DESIGN.md“, Malewicz „Why Beautiful Websites Don't Convert“, Ilja van Eck „Breaking down my Awwwards winning project“.

## Kurzfassung: Warum mein erster Showcase AI-generiert wirkte

Ehrliche Selbstkritik am Maßstab der Quellen unten:
- **Zu viele Zutaten auf einmal**: Mono-Labels, Serif-Headline, Zahlenleiste, Badges, Tabelle, Formular — jedes Element „richtig“, zusammen ein Katalog. Profis nutzen *wenige* Zutaten, dafür konsequent.
- **Hierarchie-Sprünge zu klein**: Headline nur etwas größer als der Rest. Award-Seiten springen extrem (riesig vs. klein).
- **Platzhalter statt echtem Inhalt**: Lorem-artige Texte → Layout wurde nicht vom Inhalt getrieben.
- **Template-Spalte**: alles in einer zentrierten Spalte mit großen Rändern, Abschnitt nach Abschnitt im gleichen Rhythmus.
- **Keine Art Direction**: kein Bild, keine Grafik, kein Produkt. Nur Typo + Boxen.

## 1. Was Referenzseiten konkret machen (selbst angesehen)

| Seite | Was auffällt | Übertragbare Regel |
|---|---|---|
| **paco.me** | Winzige Schrift, reiner Text, Liste von Projekten, eine Serif-Kursive als Akzent, keine Buttons | Zurückhaltung + ein einziger Akzent wirkt souveräner als viele Effekte |
| **rauno.me** | Fast leer, grauer Fließtext, Inhalte als Liste mit Jahr rechts, Signatur-Detail | Persönlichkeit über *ein* Detail, nicht über Dekoration |
| **stripe.com** | Headline zweifarbig (Satzanfang dunkel, Fortsetzung grau), sichtbare Haarlinien-Rahmen des Rasters, echte Live-Zahl statt erfundener Statistik, Logos echter Kunden | Struktur sichtbar machen; Daten echt; Text-Hierarchie *innerhalb* eines Satzes |
| **godly.website** | Kuratiertes Grid echter Screenshots; fast jede gelistete Seite hat ein eigenes Bild-/Farbkonzept, kaum zwei gleich | Charakter kommt von Bildsprache und Komposition, nicht von UI-Komponenten |
| linear.app, basement.studio | Luden headless nicht vollständig (schwere Animationen) — nicht bewertet | – |

## 2. Video-Zusammenfassungen

### Kole Jain — „5 SaaS UI/UX mistakes that SCREAM you Vibe Code“ (207k Views) — https://youtu.be/PDcQJOPby1k
Redesign eines vibe-gecodeten URL-Shorteners live.
- **Emojis raus**, durch eine Icon-Bibliothek ersetzen (Phosphor, Lucide).
- **„Never let an AI choose your colors“** — AI greift zu hellen, nicht zueinander passenden Farben. Farbe lieber über *Daten* (Mini-Charts) als über Buttons/Icons ins Bild bringen.
- **„Never let an AI choose your layout“** — dieselben 4 KPI-Karten tauchen 3× auf; Karten ohne Funktion entfernen; Gradient-Avatar-Kreise mit Initialen sind ein Erkennungsmerkmal.
- Unwichtiges einklappen (Triple-Dot-Menü, Popover), Wichtiges vergrößern: Planname klein, **Preis groß**, weil Nutzer sich für den Preis interessieren.
- Zeigen, was der nächste Plan *zusätzlich* bringt; tatsächlichen Rabatt zeigen (Muster von Resend, Supabase).
- Landing Page: **Grafiken statt Icons** — z. B. leicht schräg gestellte echte Produkt-Screenshots. „Landing pages aren't about complexity, they're about presentation.“

### Adrian Zumbrunnen (BONT, Ex-Lead MediaMonks) — „5 keys to design AWWWARD winning websites“ — https://youtu.be/9TUzpQujYHA
1. **Wenige Zutaten**: 1–2 bewährte Schriften (oft einfach Helvetica), 2–3 Volltonfarben, 3–4 Hierarchiestufen, ein einheitlicher Asset-Stil.
2. **Typografie beherrschen**: „It's not the typeface, it's how you use it.“ Großer Hook-Titel, kleiner Text daneben erzeugt Tiefe. Klare, *große* Sprünge zwischen Stufen.
3. **Komposition**: Titel max. 1–5 Wörter (je weniger Wörter, desto größer). Raster mit wiederkehrenden Kanten. **Ganze Leinwand nutzen** statt zentrierter Spalte mit großen Rändern — „key differentiator between a templatish website and one that can win an award“. **Anteile variieren**: mal 100 % Bild, mal nur Text, mal 80/10 — nicht Text-Bild-Text-Bild.
4. **Animation**: ein großes Element beim Laden; kleine Details auf Scroll/Hover; **nicht alles animieren** — Animation ist Hierarchie.
5. **Art Direction**: „Do what's right, not what's trendy.“ Bildsprache folgt dem Thema (Produktfotos / Illustration / Dokumentarstil). Beispiel: Kunde hat Gelb, Designer wählten trendiges Cyan → abgelehnt.

### Self-Made Web Designer — „Give Me 7 Minutes & Your Web Design Skills Will Take Off“ (533k Views) — https://youtu.be/1NTKwpAVcHg
- Alles läuft auf **Layout, Farbe, Typografie** hinaus.
- Das **F-Pattern sei überholt** — Menschen schauen in vielen Mustern; stattdessen bewusst **visuelle Hierarchie** bauen. (Korrigiert meine erste GUIDELINES.md, die F/Z-Pattern zu stark gewichtet.)
- CTAs mit hohem Kontrast; **keine Ghost-Buttons** (nur Outline) für Haupt-Aktionen — werden übersehen.
- 60/30/10 als Startpunkt, kein Gesetz; Kontrast prüfen (Coolors).
- Eigene Erfahrung: schönes Redesign → **Umsatz brach ein**, weil Conversion ignoriert. Klarheit (wer, was, warum), Scanbarkeit, Motivation. Für Besucher designen, nicht für sich oder den Kunden.

### Self-Made Web Designer — „Complete Web Design Process“ (161k) — https://youtu.be/T5JglDcd54A
Workflow-Video (eher Freelance-Business):
- Phasen: Onboarding (Discovery Call, Vertrag) → Design & Dev → Launch → Offboarding.
- **Sitemap → extrem Low-Fi-Wireframe** (nur „Abschnitt 1 handelt von X“, keinerlei Designentscheidungen — sonst hängt der Kunde an Platzhalter-Schriften).
- Homepage zuerst und am längsten — ihre Abschnitte werden Bausteine für die übrigen Seiten.
- Entwürfe nie nur als Link schicken: per Loom-Video *begründen*, warum etwas so ist.

### Userfacet — „How Senior Designers Wireframe“ — https://youtu.be/66m1adPbHJk
- Mehrere Iterationen der **Kernseiten** (die 80 % der Zeit genutzt werden) zuerst.
- **Kein Lorem Ipsum** — echter Inhalt ist „50 % des Designs“; Fake-Text verdeckt Layoutprobleme. <!-- lint-ok -->
- Eher High-Fidelity-Wireframes, Interaktionen (Scroll, Animation, Popups) dokumentieren.
- Informationsarchitektur priorisieren, bevor es hübsch wird.

## 3. Workflow, den Profis gemeinsam haben

1. **Inhalt zuerst**: echte Texte, echte Zahlen, echte Bilder sammeln (oder zumindest realistische). Kein Lorem.
2. **Referenzen kuratieren**: Moodboard aus Godly / Awwwards / Siteinspire / Mobbin — nach *Thema* der Marke, nicht nach Trend.
3. **Struktur**: Sitemap → Wireframe nur mit Inhaltsblöcken; Kernseite mehrfach variieren.
4. **Zutaten festlegen** (Mini-Design-System): 1–2 Schriften, Typo-Skala mit großen Sprüngen, 2–3 Farben, Raster, ein Asset-Stil.
5. **Homepage komponieren**: Anteile Bild/Text/Farbe variieren, volle Breite nutzen, ein großer Moment oben.
6. **Animation zuletzt**, sparsam, als Hierarchie.
7. **Begründen + testen**: Entscheidungen erklären, Conversion/Klarheit prüfen, dogfooden.
8. Bei AI-Tools: AI für Logik und Code, **nicht für Farben, Layout und Art Direction** (Kole Jain); Stil vorgeben über eine DESIGN.md (Better-Stack-Video, Inhalt noch nicht verifiziert).

## 4. Konsequenzen für das Redesign der Components

- Weniger Komponenten, dafür eine **zusammenhängende Beispielseite** mit echtem (fiktivem, aber konkretem) Inhalt.
- Ein Schriftpaar, max. 3–4 Stufen, Headline wirklich groß (1–5 Wörter).
- Volle Breite + sichtbares Raster (Stripe-Haarlinien) statt Kartenstapel.
- Ein visuelles Asset (Produkt-Screenshot/Grafik) statt Icons.
- Abwechselnde Abschnittsrhythmen.
- Farben/Skelette: **warte auf deine Ressourcen**.
