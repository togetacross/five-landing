# Prémium Residence – Next.js (JavaScript) starter

Ez egy Next.js **JavaScript** (App Router) alap projekt egy újépítésű ingatlanprojekthez.

## Funkciók

- Landing: `/` (marketing + 360° “húzható” látványkép)
- Lakáslista + keresés/szűrés: `/lakasok`
  - emelet (Gyorsszűrés: Földszint, 1–3)
  - méret (m²) kétoldalú slider
  - ár (M Ft) kétoldalú slider
  - kert (checkbox)
  - erkély (checkbox)
  - tájolás (dropdown)
  - a szűrők az URL-ben vannak → link egyszerűen küldhető
- Minden lakásnak saját URL: `/lakas/a01-01` (ID-ből képzett slug)
- Alaprajz PNG lakásonként: `public/floorplans/A01-01.png`

## Adatforrás

Alapértelmezés: `public/units.csv`

Opcionálisan beállítható Google Sheet publikált CSV:

1. Google Sheets → **File → Share → Publish to web**
2. Sheet: pl. `Units`, Format: **CSV**
3. Másold ki a CSV URL-t
4. Hozz létre `.env.local` fájlt és add meg:

```bash
UNITS_CSV_URL="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
```

## CSV oszlopok (HU)

Kötelező oszlopok:

- `Lakás` (ID, pl. `A01-01`)
- `m2`
- `Erkély (m2)`
- `Kert (m2)`
- `FK (mft)` (Ft-ban tárolt ár; UI M Ft-ban mutatja/szűri)
- `KK (mft)` (Ft-ban tárolt ár; UI M Ft-ban mutatja/szűri)
- `Emelet` (0 = földszint)
- `Elérhető` (Igen/Nem)
- `Tájolás` (Dél / Kelet / Nyugat / Észak / Délkelet / Délnyugat ...)

## Futtatás

```bash
npm install
npm run dev
```

Megnyitás: http://localhost:3000

## Megjegyzés

A “360” nézet most egy húzható látványkép (public/hero360.jpg). Később cserélhető valódi panorámára vagy WebGL/ThreeJS megoldásra, a komponens változtatása nélkül.
