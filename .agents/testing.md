# Tests

`npm test` runs Vitest (`vitest run`).

The suite checks three things that stay stable without a visual pass:

- `package.json` `exports` point at files that exist (`src/*.css`, and `dist/` after `prepare` / `npm run build`).
- Documented `--pc-*` token names in `README.md`, `AGENTS.md`, `.agents/tokens.md`, and code comments are defined in `src/tokens.css`. The catalog in `.agents/tokens.md` lists every token from that file. Title-bar blue hex values in those docs match `--pc-titlebar-bg` (`#1E5AA8` light, `#2B6CB0` dark). `src/pc-ui.css` still contains every token from `src/tokens.css` (the bundle is generated; do not edit it by hand).
- A few React primitives render the class names and attributes they already implement (`Button`, `Badge`, `Desktop`, `Split`, `Progress`, `Input`, `Field`, `Window`, `Modal`, `ContentModal`). `OverflowMenu` is covered with jsdom (open, place, activate, dismiss).

No browser or screenshot harness. Visual chrome stays in CSS.

CI is `.github/workflows/ci.yml`: pull requests and pushes to `main` run `npm ci` (which builds via `prepare`) and then `npm test`.
