# Mary's Parking Game

A mobile-first colour-matching parking puzzle. Tap a car to move it into an available parking bay; passengers of the matching colour walk over and board. Send full cars away, clear the passenger queue, and progress through levels.

## Play

The game is published with GitHub Pages. After the first successful **Deploy to GitHub Pages** workflow, open:

`https://mylmary.github.io/parkinggame/`

## Run locally

Open `index.html` in a modern browser. No build tools or external libraries are required.

## Publishing

The GitHub Actions workflow in `.github/workflows/deploy.yml` deploys the site whenever changes are pushed to `main`, and can also be run manually from the Actions tab. In the repository settings, ensure **Pages → Build and deployment → Source** is set to **GitHub Actions**.

## Controls

- Tap a car to select it and send it to the next free bay.
- Matching passengers board automatically, up to the car's capacity.
- A full car drives away and frees its bay.
- Clear the passenger queue to complete the level.
- Use the shuffle button if you need a fresh arrangement.

Progress is saved in the browser on the device you play on.