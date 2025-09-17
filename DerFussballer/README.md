# Vereinsmanager

Ein modernes, optisch ansprechendes React-Programm (Vite + TypeScript + Tailwind), mit dem du **Datenbanken** (JSON-Dateien) erstellen, speichern und laden kannst. In der Datenbank kannst du **Mannschaften** anlegen und verwalten: **Gründungsdatum**, **Vereinsname**, **Filtername** und ein **Wappen (PNG 1024×1024)**.

## Features
- Neue **Datenbank** erstellen (lokal gespeichert und als Datei exportierbar)
- **Datenbank speichern** (als JSON-Datei)
- **Datenbank laden** (JSON-Datei wieder einlesen)
- **Mannschaften anlegen** (Name, Filtername, Gründungsdatum, Wappen)
- **Wappen-Upload** mit automatischer **Skalierung auf 1024×1024 PNG**
- **Mannschaften verwalten** (Liste, Suchen/Filtern, Bearbeiten, Löschen)
- **Schönes UI** mit Tailwind, kleine Animationen via Framer Motion

> **Hinweis:** Alle Daten bleiben im Browser (LocalStorage). Über „Speichern“ exportierst du eine JSON-Datei, die du später wieder laden kannst.

## Los geht's

```bash
npm install
npm run dev
```
Öffne dann die lokale Dev-URL aus der Konsole.

Für ein Production-Build:
```bash
npm run build
npm run preview
```

## Projektstruktur
- `src/` – Code (React + TS)
- `src/components/ui/` – kleine UI-Bausteine
- `src/lib/` – Datenbank-Funktionen (JSON Import/Export, LocalStorage)
- `src/utils/` – Bildverarbeitung (PNG 1024×1024)

## Datenformat
Gespeicherte Datenbanken sind JSON mit Versionierung:
```json
{
  "version": 1,
  "name": "Meine Vereine",
  "createdAt": "2025-09-17T21:53:59.485477Z",
  "updatedAt": "2025-09-17T21:53:59.485477Z",
  "teams": [ /* ... */ ]
}
```

Jedes Team hat:
```json
{
  "id": "uuid",
  "name": "FC Beispiel",
  "filterName": "FCB",
  "foundingDate": "2000-01-01",
  "crestDataUrl": "data:image/png;base64,..."
}
```

## GitHub
Du kannst dieses Projekt **als ZIP** hochladen und später mit Pull Requests erweitern. CI/CD oder GitHub Pages lassen sich leicht ergänzen.

---
© 2025 – Vereinsmanager