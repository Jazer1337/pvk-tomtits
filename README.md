## Installing/updating
- There is only one html file (`index.html`) and one bundled js file (`src/js/bundle.js`) which the html file uses. The tool `npm` is used to bundle all js files into the combined js file (in order to avoid cross-origin resource sharing error). To compile this bundled js file:
  - Install `npm`.
  - Navigate to the directory `npm`.
  - Run `npm run build`.
  - The file `src/js/bundle.js` is now updated and will be read when opening `index.html`. No further linking is necessary in the html file.

## Files
- Only the content in `src/js/index.js` will be included in the bundled js file. Any listeners, graph making, and solving must be included in this file (not necessarily written directly but may be imported).

- `src/js/map.js` defines the whole map, i.e. nodes and edges. May be edited.

- `src/js/game.js` handles generating the visual frame and event callbacks. May be edited.

- `src/js/graph.js` defines classes `Node`, `Edge`, and `Graph`. No need to edit these. 

- `src/js/solve.js` is used to find a path that visits all specified nodes. No need to edit this, unless for optimization.
