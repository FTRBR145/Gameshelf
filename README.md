# GameShelf

A static game download catalog built with plain HTML, CSS, and JavaScript. Game files stay on Google Drive; this site only opens their links.

## Run locally

Start a static server from the project folder, for example `python -m http.server 8000`, then open `http://localhost:8000`.

## Add a game

Add an object to the `window.GAMES` list in `assets/games.js`. Follow the `Game` and `GameFile` JSDoc types at the top of that file. Catalog cards and `game.html?game=slug` pages are generated from the list. Save each cover in `assets/` and set its relative path in the `artwork` property.

## GitHub Pages

Upload this folder to a public GitHub repository. Under **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/(root)**. The site will be available at `https://USERNAME.github.io/REPOSITORY/` after Pages finishes deploying.
