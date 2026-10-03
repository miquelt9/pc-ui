# Working in `@miquelt9/pc-ui`

Presentational Windows 9x chrome. CSS is the API; React wrappers are thin. This file is how to change the repo. Consumer wiring stays in [AGENTS.md](../AGENTS.md) and [README.md](../README.md).

## Scope

- Add or adjust tokens, classes, and optional React wrappers that match the current look.
- Leave routing, focus traps, z-order, drag/resize, print policy, and app data to the consumer.
- Do not redesign the look (palette, bevel, type, density, or chrome shapes) without Product. A token tweak that keeps the Win9x feel is in scope; a new visual language is not.
- Do not add Tailwind, CSS-in-JS, window-manager logic, or required dependencies beyond optional React.

## Docs

| File | What it is |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Package shape and exports |
| [DESIGN.md](./DESIGN.md) | Look intent |
| [tokens.md](./tokens.md) | Every `--pc-*` token |
| [chrome.md](./chrome.md) | Overflow menu, dialogs, title bar |
| [testing.md](./testing.md) | What `npm test` locks |
| [../AGENTS.md](../AGENTS.md) | Consumer wiring and the component checklist |
| [../README.md](../README.md) | Install path and public surface |

Link those files. Do not paste the token catalog or chrome behavior into a new note.

## Changes

- New chrome: a token and a CSS class first, then a thin React wrapper (`className` + children). Generic names only (no app-specific copy).
- After CSS or TypeScript edits, run `npm run build`. That rewrites `src/pc-ui.css` and `dist/`. Commit `src/pc-ui.css`. Do not edit the bundle by hand, and do not commit `dist/`.
- Do not rename public exports, classes, or tokens unless the task says so.

## Verify

`npm test` runs Vitest. CI (`.github/workflows/ci.yml`) runs `npm ci` (which builds via `prepare`) and then `npm test` on pull requests and on pushes to `main`. Details: [testing.md](./testing.md).
