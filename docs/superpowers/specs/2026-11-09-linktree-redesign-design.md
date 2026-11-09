# Design-Dokument: Linktree-Redesign nach Main_design.md

**Datum:** 2026-11-09  
**Status:** Entwurf — wartet auf Freigabe

## Intent und warum

Die bestehende Linktree-App (`linktree-react`) soll vollständig an die Design-Guidelines in `Main_design.md` angelehnt werden. Aktuell weicht sie stark ab: harte Licht-Farben, externe Google Fonts, `lucide-react` Icons, Karten mit Schatten und gerundeten Ecken, kein OS-Light/Dark-Mode. Ziel ist ein minimalistisches, textorientiertes Portfolio, das dem System-Farbschema folgt und keine zusätzlichen Bibliotheken oder Schriften einführt.

## Goals

- CSS-Design-Tokens nach `Main_design.md`: `--color-bg`, `--color-ink`, `--color-body`, `--color-muted`, `--color-faint`, `--color-rule`, `--color-accent` (oklch Rot)
- Systemfarben statt fest verdrahteter Flächen; Design folgt dem OS Light-/Dark-Mode
- Systemschriften (`--font-sans` für Fließtext, `--font-mono` für Navigation, Metadaten, Footer); keine Google Fonts, keine `lucide-react`
- Inline-SVGs mit 1,5 px Stroke und 24 × 24 ViewBox statt lucide-react Icons
- Maximal 600 px Inhaltsbreite, 20vh oberer Innenabstand, Basissystem `--spacing: 0.25rem`
- Sichtbare Fokus-Zustände: 2 px Outline in `--color-accent`, 2 px Offset
- Bestehende Inhalte beibehalten: Sektionen "Me / Social / Music", Impressum-Footer, Linkdaten

## Non-goals

- Kein neues M0x37-Portfolio mit Projektkarten, Kontaktliste, Ice-Bear-Sticker oder Skeleton-Ladezustand (Assets und Inhalte existieren nicht)
- Keine neuen Breakpoints außerhalb der bestehenden (40rem / 64rem / 80rem)
- Keine UI-Bibliothek, keine externen Schriften, keine neuen Abhängigkeiten

## Constraints

- Bestehende Tech-Stack: React 19 + TypeScript + Vite (bleibt unverändert)
- Bestehende Inhaltsstruktur (Links, Sektionen, Footer) bleibt erhalten
- Keine neuen npm-Pakete installieren; `lucide-react` und Google Fonts werden entfernt
- `css/style.css` wird zur zentralen Token- und Komponentenquelle (entspricht der Richtlinie; aktuell `src/index.css` + `src/App.css`)

## Approaches

Nur Ansatz A wurde ausgewählt (Nutzerwunsch). Alternativen wurden verworfen:
- **B (vollständiges Portfolio neu bauen):** verworfen, da Inhalte und Assets (bear_cutouts, SVG-Namemark) nicht existieren und der Nutzer den bestehenden Linktree-Inhalt behalten will.

## Entscheidungen (how it gets made)

1. **CSS-Architektur:** `src/index.css` wird auf die Design-Tokens von `Main_design.md` umgebaut (`:root` mit Systemfarben, `color-scheme`, `--spacing: 0.25rem`). `src/App.css` wird ersetzt durch component-spezifische Styles nach Guideline.
2. **Farben:** `--color-bg` = Weiß/Schwarz (Canvas), `--color-ink` = CanvasText, `--color-accent` = oklch Rot (Light: 57.7% 0.245 27.325, Dark: 70.4% 0.191 22.216).
3. **Schriften:** `--font-sans` = system-ui, `--font-mono` = ui-monospace, JetBrains Mono als Fallback (lokal, kein Google Fonts-Link).
4. **Icons:** Alle lucide-react Icons werden durch handgeschriebene Inline-SVGs (1,5 px Stroke, 24 × 24 ViewBox) ersetzt.
5. **Komponenten:** LinkCard wird zu einem schlichten Link mit dünner Regel, kein Schatten, kein abgerundeter Container; Hover wechselt zu `--color-accent`-Hintergrund mit kontrastierender Textfarbe; Fokus-Outline 2 px Akzent + 2 px Offset.
6. **Layout:** `.main-container` max. 600 px, `20vh` padding-top, Inhalte zentriert, Mobil min. 1.5rem Außenabstand.
7. **index.html:** Google Fonts preconnect/links entfernt; `theme-color` angepasst.

## Was dem Builder überlassen bleibt

- Detaillierte Pixelwerte innerhalb der Guideline-Rahmen (z. B. exakte Gap-Werte innerhalb des `--spacing`-Rasters)
- Benennung interner CSS-Klassen (solange Utility-Klassen wie `.font-mono`, `.text-muted` wiederverwendet werden)

---

Bitte bestätige, ob du mit diesem Design einverstanden bist. Sobald du freigibst, beginne ich mit der Umsetzung. Nenne mir falls vorhanden: Korrekturen oder Ergänzungen.