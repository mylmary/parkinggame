# Mary's Parking Game

A mobile-first colour-matching parking puzzle. Tap a car to move it into an available parking bay. Matching passengers board automatically, up to four per car; the car then leaves and frees its space. Clear the queue to complete each level.

## Run locally

Open `index.html` in a modern browser. The game has no external runtime dependencies.

## Build

Requires Node.js 22 or newer.

```bash
npm run check
npm run build
```

The production-ready static site is written to `dist/index.html`.

## GitHub Actions

The workflow in `.github/workflows/build.yml` runs on pushes to `main` and can be started manually from the Actions tab. It checks the game source, builds the static site, and uploads `dist/` as the `marys-parking-game-build` artifact for 14 days.

**GitHub Pages is not configured yet.** When you are ready to publish, enable Pages with GitHub Actions and add a deployment workflow.

## Controls

- Tap an enabled car to move it into the next free parking bay.
- Cars without any matching passengers waiting are disabled.
- Matching passengers board automatically; each car carries up to four.
- A car leaves after it has boarded passengers and no more matching passengers remain, or once it reaches capacity.
- Clear the passenger queue to complete the level.
- **New arrangement** restarts the current level with a fresh layout.

The best score is saved in local browser storage on the device you play on. Current level progress is not saved between sessions.
