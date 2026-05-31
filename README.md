# The Jinx Exchange

The Jinx Exchange is a playful static web app for sports fans who are convinced they jinx their own teams. It lets a fan create "jinx pacts" with simulated opposing fans, browse live/upcoming games from ESPN scoreboard endpoints, and track pact outcomes.

## What It Does

- Pulls scoreboard data from public ESPN endpoints.
- Lets users create local jinx pacts around real games.
- Tracks pact history, results, achievements, and stats in browser storage.
- Runs as a static HTML/CSS/JS app with no backend.

## Run Locally

Open `index.html` in a browser.

For a local web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

All user data is stored locally in the browser. The app does not create real accounts or connect users to real fans.
