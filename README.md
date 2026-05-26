# Ylva & Edel sin lønnsoversikt

Enkel nettside som holder oversikt over husarbeid-lønn. 10 kr per jobb, maks 1000 kr i visning. Data lagres i Google Sheets – begge foreldre ser det samme i sanntid.

## Test uten oppsett

Åpne `index.html` i nettleser. Da brukes lokal lagring (kun på den enheten). Bra for å prøve design og animasjoner.

---

## Koble til Google Sheets – ca. 5 minutter

### Steg 1 – Lag Google Sheets-arket

1. Gå til **sheets.google.com** og lag et nytt ark
2. Gi fanen (arket) nederst navnet **`kids`** (dobbeltklikk på «Sheet1»)
3. Fyll inn disse cellene:

   | | A | B |
   |---|---|---|
   | **2** | Ylva | 0 |
   | **3** | Edel | 0 |

   (Rad 1 kan du la stå tom, eller skrive «Navn» / «Kroner» som overskrift)

### Steg 2 – Lag Apps Script

1. I arket: trykk **Extensions → Apps Script**
2. Slett alt som står i editoren
3. Kopier inn innholdet fra filen **`apps-script/Code.gs`** i dette repoet
4. Klikk **Lagre** (diskikonet)

### Steg 3 – Deploy som web app

1. Trykk **Deploy → New deployment**
2. Klikk tannhjulet ved «Select type» → velg **Web app**
3. Fyll inn:
   - **Description**: `Chore tracker`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Trykk **Deploy**
5. Godkjenn tilgang (Google ber deg logge inn og godkjenne)
6. Kopier **Web app URL** – den ser ut som:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Steg 4 – Lim inn URL i index.html

Åpne `index.html` på GitHub (branch: `claude/kids-chore-tracker-2g0aP`), finn linjen:

```js
const SCRIPT_URL = "";
```

Bytt til:

```js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec";
```

Commit direkte på branchen. Etter ~30 sek oppdateres GitHub Pages, og siden viser **«✓ Synkronisert med Google Sheets»**.

---

## GitHub Pages (gratis hosting)

1. GitHub-repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `claude/kids-chore-tracker-2g0aP`, mappe: `/ (root)`
4. **Save** → vent ~1 min → du får URL-en `https://simenbones-bot.github.io/ukel-nn/`

---

## Filer

| Fil | Beskrivelse |
|---|---|
| `index.html` | Hele appen – HTML, CSS og JS i én fil |
| `apps-script/Code.gs` | Kode som limes inn i Google Apps Script |
| `README.md` | Denne filen |

## Tilpasninger

- Oppgaveliste: rediger `CHORES`-arrayet i `index.html`
- Pris per jobb: variabelen `PRICE`
- Maks-beløp i visning: variabelen `MAX`
- Pollingsintervall: `setInterval(syncFromSheets, 5000)` — 5000 = 5 sekunder
