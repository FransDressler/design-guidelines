# Design-Guidelines: menschlich, gerichtet, nicht generisch

## 1. Wie Menschen Seiten wirklich nutzen

- **Scannen statt lesen.** Nutzer lesen etwa 20–28 % des Textes (NN/g). Überschriften, das erste Wort einer Zeile und Zahlen tragen die Information.
- **F-Pattern** bei Textseiten: Der Blick geht oben quer, dann etwas tiefer noch einmal quer, dann die linke Kante hinunter. → Das Wichtige steht links und oben, Zeilen beginnen mit Schlüsselwörtern.
- **Z-Pattern** bei wenig Inhalt (Hero, Landing): Logo → Nav/CTA oben rechts → diagonal → CTA unten rechts.
- **Layer-Cake**: Gute Seiten lassen sich allein über die Zwischenüberschriften verstehen.
- **Banner-Blindheit**: Was wie Werbung aussieht (bunte Box, Banner rechts), wird übersehen.
- **Hick's Law**: Mehr Optionen bedeuten längere Entscheidung. Pro Bereich gibt es **eine** Primäraktion.
- **Fitts's Law**: Wichtige Ziele sind groß und nah (Touch-Ziel ≥ 44 px).
- **Jakob's Law**: Nutzer erwarten Konventionen (Logo oben links = Home, Warenkorb oben rechts). Kreativ wird im Ausdruck, nicht in der Bedienung.
- **Peak-End-Regel**: In Erinnerung bleiben der stärkste Moment und das Ende, also Erfolgszustand und Footer bewusst gestalten.

## 2. Attention Guidance: den Blick führen

Hierarchie in genau dieser Reihenfolge der Mittel (das stärkste zuerst):
1. **Größe** – eine klar dominante Sache pro Ansicht.
2. **Kontrast / Farbe** – der Akzent nur auf Handlungen und das Wichtigste. Kommt er überall vor, führt er nirgendwohin.
3. **Position** – oben links beginnt der Blick, Leerraum rahmt.
4. **Isolation** – Weißraum um ein Element hebt es stärker hervor als ein Rahmen.
5. **Richtung** – Blickrichtung von Personen auf Fotos, Pfeile, Linien, angeschnittene Elemente am Rand („da geht's weiter“).
6. **Bewegung** – nur für Zustandsänderungen und nie dauerhaft.

**Squint-Test:** Die Augen zusammenkneifen. Bleiben genau 1–2 Dinge sichtbar, ist die Hierarchie richtig.

**Leserhythmus:** Zeilenlänge 55–75 Zeichen, Zeilenhöhe 1.5 bei Fließtext und 1.1–1.2 bei Headlines. Abstände folgen der Gruppierung (Gestalt-Nähe): Innerhalb einer Gruppe ist der Abstand klein, zwischen Gruppen groß, mindestens das Doppelte.

## 3. Pattern, die funktionieren

- **Linksbündiger Hero** mit konkreter Aussage und Beleg (Screenshot, Zahl, Zitat) statt zentriertem Slogan.
- **Progressive Disclosure:** erst das Wesentliche, Details auf Nachfrage.
- **Asymmetrische Raster** (z. B. 5/7, 4/8) statt 3 gleicher Karten.
- **Listen und Tabellen** für Vergleiche, keine Karten-Grids.
- **Inline-Validierung** in Formularen, Labels über dem Feld, Fehlertext unter dem Feld in Klartext.
- **Zustände entwerfen:** leer, laden, Fehler, Erfolg. Daran erkennt man echte Produkte.
- **Konkrete Microcopy:** „Rechnung als PDF senden“ statt „Absenden“.

## 4. Vermeiden (Anti-AI-Checkliste)

- [ ] Kein Violett/Blau-Verlauf, kein Verlaufstext, keine Aurora-Blobs
- [ ] Keine Badge-Pill mit ✨ über der H1
- [ ] Kein 3-Spalten-Icon-Grid als Feature-Sektion
- [ ] Kein „Most Popular“-Pricing-Schema aus drei Karten, sofern es nicht wirklich passt
- [ ] Keine Buzzwords: unlock, seamless, supercharge, elevate, revolutionize, effortless <!-- lint-ok -->
- [ ] Keine erfundenen Zahlen und Testimonials
- [ ] Nicht alles zentrieren, nicht jede Sektion gleich hoch
- [ ] Kein `rounded-2xl` + `shadow-lg` auf allem, keine Karten in Karten
- [ ] Keine Emojis als Icons, keine dekorativen Icons ohne Funktion
- [ ] Kein Glas-Blur, kein Hover-Scale, kein Fade-in auf jeder Sektion
- [ ] Nicht nur Inter: Schriftkontrast herstellen

## 5. Was stattdessen Charakter gibt

- **Eine Haltung pro Projekt** (redaktionell, technisch, institutionell) und alle Entscheidungen daraus ableiten.
- **Typo-Paar:** Serif-Display (Fraunces, Newsreader, Instrument Serif) + Sans (IBM Plex Sans, Söhne/Inter Tight) + Mono für Zahlen und Labels (JetBrains Mono, IBM Plex Mono).
- **Hairlines statt Schatten**, Radien 2–6 px, sichtbares Raster.
- **Nummerierung, Labels in Versalien/Mono, Fußnoten**: redaktionelle Details.
- **Echte Inhalte**: Screenshots, Fotos, Daten. Ein echtes Bild schlägt zehn Icons.
- **Ein bewusster Regelbruch** pro Seite (übergroße Zahl, angeschnittenes Element, Randnotiz).
