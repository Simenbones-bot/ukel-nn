# Ylva & Edel sin lønnsoversikt

En enkel nettside som holder oversikt over hvor mye penger Ylva og Edel har tjent på husarbeid. 10 kr per jobb, maks 1000 kr i visning. Hver gang en jobb registreres får man en tilfeldig animasjon med katter, enhjørninger, hjerter osv.

## Hvordan kjøre lokalt

Bare åpne `index.html` i en nettleser. Da brukes lokal lagring (kun synlig på den enheten).

## Sett opp delt lagring (Firebase) – ca. 5 minutter

For at både du og kona di skal kunne se og oppdatere samme data fra forskjellige enheter, må vi koble til en gratis sky-database (Firebase Realtime Database).

### Steg 1 – Lag Firebase-prosjekt

1. Gå til https://console.firebase.google.com og logg inn med Google-konto.
2. Klikk **«Add project»** (Legg til prosjekt). Gi det et navn, f.eks. `ylva-edel-lonn`.
3. Du kan skru av Google Analytics – det trengs ikke.

### Steg 2 – Slå på Realtime Database

1. I venstremenyen: **Build → Realtime Database**.
2. Klikk **«Create Database»**.
3. Velg en lokasjon (f.eks. *europe-west1*).
4. Velg **«Start in test mode»** (det er greit for et familieprosjekt).
5. Klikk **Enable**.

> Test mode lar hvem som helst med URL-en lese/skrive. Det er greit her, men ikke del URL-en offentlig. Vil du ha det strengere kan du sette regler senere.

### Steg 3 – Hent ut config

1. Gå til **Project settings** (tannhjul-ikonet øverst til venstre).
2. Under **«Your apps»**, klikk på `</>` (Web).
3. Gi appen et kallenavn (f.eks. `web`). Trenger ikke huske «Firebase Hosting».
4. Klikk **Register app**.
5. Du får en `firebaseConfig`-snutt som ser ca. slik ut:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "ylva-edel-lonn.firebaseapp.com",
     databaseURL: "https://ylva-edel-lonn-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "ylva-edel-lonn",
     // ...
   };
   ```

   **VIKTIG:** `databaseURL` må være med! Hvis den mangler i snutten, finner du den i Realtime Database-fanen.

### Steg 4 – Lim inn i index.html

Åpne `index.html`, finn blokken som starter med `const firebaseConfig = {` og bytt ut verdiene `"DIN_..."` med dine egne. Det holder å ha med disse fire:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "ylva-edel-lonn.firebaseapp.com",
  databaseURL: "https://ylva-edel-lonn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ylva-edel-lonn",
};
```

Lagre, commit og push:

```sh
git add index.html
git commit -m "Konfigurer Firebase"
git push
```

## Sett opp GitHub Pages (gratis hosting)

1. Gå til repo-et på GitHub → **Settings** → **Pages**.
2. Under **Source**, velg branchen som inneholder `index.html` (f.eks. `main` etter at du har merget), og mappen `/ (root)`.
3. Klikk **Save**.
4. Etter et minutt får du en URL av typen `https://<brukernavn>.github.io/ukel-nn/`. Bokmerk den på telefonene deres.

## Filer

- `index.html` – hele appen (HTML, CSS, JS i én fil)
- `README.md` – denne filen

## Tilpasninger

- Endre listen over jobber: rediger arrayet `CHORES` i `index.html`.
- Endre pris per jobb: variabelen `PRICE`.
- Endre maks-beløp i visning: variabelen `MAX`.
