# Tests

`npm test` runs Vitest (`vitest run`).

The suite checks three things that stay stable without a visual pass:

- `package.json` `exports` point at files that exist (`src/*.css`, and `dist/` after `prepare` / `npm run build`).
- Documented `--pc-*` token names are in `src/tokens.css`, and `src/pc-ui.css` still contains every token from that file (the bundle is generated; do not edit it by hand).
- A few React primitives render the class names and attributes they already implement (`Button`, `Badge`, `Desktop`, `Split`, `Progress`, `Input`, `Field`, `Window`, `Modal`).

No browser or screenshot harness. Visual chrome stays in CSS.

CI is `.github/workflows/ci.yml`: pull requests and pushes to `main` run `npm ci` (which builds via `prepare`) and then `npm test`.
