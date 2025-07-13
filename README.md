# F1 Inside

## Inhoudsopgave
1. [Inleiding](#inleiding)
2. [Screenshot](#screenshot)
3. [Benodigdheden](#benodigdheden)
4. [Installatie-instructies](#installatie-instructies)
5. [Inloggegevens Testgebruiker](#inloggegevens-testgebruiker)
6. [Overige Commando's](#overige-commandos)

---

## Inleiding
F1 Inside is een applicatie voor fans van de Formule 1-autosport. Het project is ontwikkeld om liefhebbers, naast de live-uitzendingen, te voorzien van alle ins en outs over de coureurs en teams uit de rijke geschiedenis van de sport.

De kernfunctionaliteiten zijn:
* Gebruikers kunnen zich **registreren en inloggen**.
* Zoeken en filteren op **coureurs en teams** om details te bekijken.
* Coureurs en teams toevoegen aan een persoonlijke **favorietenlijst**.
* Het **weeroverzicht** voor de eerstvolgende race bekijken.

---

## Screenshot
Hieronder staat een screenshot van de nieuwspagina van de applicatie.

![Screenshot van de F1 Inside nieuwspagina](https://github.com/jeffrey-ho1/f1-inside-react-project/blob/main/public/Images/Screenshot-news-page.png?raw=true)

---

## Benodigdheden
Om dit project lokaal te kunnen draaien, heb je de volgende zaken nodig:

* **Node.js**: v22.12.0
* **NPM**: 10.9.0
* **Data bronnen**: De applicatie haalt data op van de volgende bronnen:
    * **NOVI Backend**: Voor gebruikersauthenticatie en favorieten.
    * **NewsAPI**: Voor het laatste Formule 1 nieuws.
    * **WeatherAPI**: Voor de weersvoorspelling van de volgende race.
    * **Open f1 API**: Voor coureur- en teaminformatie (vereist geen API key).
    * **f1api.dev**: Voor aanvullende Formule 1 data (vereist geen API key).
* **Code-editor**: Een editor zoals WebStorm of Visual Studio Code.

---

## Installatie-instructies
Volg de onderstaande stappen om de applicatie lokaal op te zetten:

1.  **Clone de repository** naar je lokale machine:
    ```bash
    git clone [https://github.com/jeffrey-ho1/f1-inside-react-project]
    ```
2.  **Navigeer** naar de projectmap:
    ```bash
    cd f1-inside
    ```
3.  **Installeer** de benodigde packages:
    ```bash
    npm install
    ```
4.  **Maak een `.env` bestand** aan in de hoofdmap van het project. Kopieer de onderstaande inhoud en plak deze in het nieuwe `.env` bestand. Alle benodigde API-sleutels zijn hierin al opgenomen.
    ```env
    # News API
    VITE_NEWS_API_KEY="33e204fef4ff4d908fa49e1b732a18ab"

    # Weather API
    VITE_WEATHER_API_KEY="8e2aacaeb7344c1caad02858252106"
    
    # NOVI Backend
    VITE_BACKEND_API_URL="[https://api.datavortex.nl/foneinside](https://api.datavortex.nl/foneinside)"
    VITE_BACKEND_API_KEY="foneinside:dcxE4x9BZ0Z1iqNx1x1H"
    ```
5.  **Start de applicatie**:
    ```bash
    npm start
    ```
De applicatie is nu te bekijken op `http://localhost:3000`.

---

## Inloggegevens Testgebruiker
Indien er al testgebruikers beschikbaar zijn, kun je met de volgende gegevens inloggen om de functionaliteit voor ingelogde gebruikers te testen:

* **Gebruikersnaam**: `noviF1inside`
* **Wachtwoord**: `Novif1inside12345!!`

---

## Overige Commando's
Naast `npm start` zijn de volgende standaard commando's beschikbaar:

* `npm test`: Start de test-runner in interactieve watch-modus.
* `npm run build`: Maakt een geoptimaliseerde productie-build van de applicatie in de `build`-map.