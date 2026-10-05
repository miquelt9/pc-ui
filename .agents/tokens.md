# Tokens

Custom properties live in `src/tokens.css` (and the generated `src/pc-ui.css` bundle). Override them on `:root`, a `.pc-theme-*` class, or `[data-pc-theme]`. Names below are the ones the stylesheet defines.

The page background is `--pc-desktop-bg`.

## Title-bar blue

`--pc-titlebar-bg` is the title-bar blue: the active window caption color in this design system. Caption text is `--pc-titlebar-text`. Theme by overriding those two properties. Progress fills (`.pc-progress-bar`) use the same background, so they follow the title-bar blue.

| Theme | `--pc-titlebar-bg` | `--pc-titlebar-text` |
| --- | --- | --- |
| Light (`:root`, `.pc-theme-light`, `[data-pc-theme="light"]`) | `#1E5AA8` | `#FFFFFF` |
| Dark (`.pc-theme-dark`, `[data-pc-theme="dark"]`, and `.pc-theme-system` / `[data-pc-theme="system"]` when the OS prefers dark) | `#2B6CB0` | `#FFFFFF` |

Terminal panes (`.pc-window--dark`, `.pc-titlebar--dark`) keep the DOS chrome: `--pc-terminal-titlebar` (`#2C2C2C`) and `--pc-terminal-text` (`#FFFFFF`) in both themes.

## Catalog

Every `--pc-*` property in `src/tokens.css`. Light values are the `:root` defaults.

### Colors

- `--pc-desktop-bg` — desktop (`rgb(146, 246, 251)` light, `#0d454c` dark)
- `--pc-chrome-bg` — window chrome and bars
- `--pc-chrome-dark` — darker chrome shade for consumer overrides (bar primitives use the main chrome background)
- `--pc-window-body-bg` — window body
- `--pc-titlebar-bg` — title-bar blue (see above)
- `--pc-titlebar-text` — title-bar caption
- `--pc-terminal-bg` — terminal window body
- `--pc-terminal-titlebar` — terminal caption bar
- `--pc-terminal-text` — terminal text
- `--pc-text-main` — default text
- `--pc-text-muted` — secondary text
- `--pc-link` — unvisited links
- `--pc-link-visited` — visited links
- `--pc-link-active` — active links

### Feedback

- `--pc-color-error` / `--pc-color-error-bg`
- `--pc-color-warning` / `--pc-color-warning-bg`
- `--pc-color-success` / `--pc-color-success-bg`
- `--pc-color-info` / `--pc-color-info-bg`

### Interactive

- `--pc-button-hover-bg`
- `--pc-button-active-bg`
- `--pc-input-bg`
- `--pc-titlebar-btn-fg` — minimize / maximize / close glyph on a normal title bar
- `--pc-titlebar-btn-fg-dark` — those glyphs on a terminal title bar
- `--pc-focus-ring`
- `--pc-focus-ring-offset`

### Bevel

- `--pc-bevel-light`
- `--pc-bevel-dark`
- `--pc-bevel-shadow`
- `--pc-bevel-inset-shadow`

### Type and spacing

- `--pc-font-family`
- `--pc-font-sans`
- `--pc-font-size-xs`
- `--pc-font-size-sm`
- `--pc-font-size-md`
- `--pc-line-height-tight`
- `--pc-line-height-body`
- `--pc-space-1` — 2px
- `--pc-space-2` — 4px
- `--pc-space-3` — 8px
- `--pc-space-4` — 12px
- `--pc-space-5` — 16px

### Layout, overlay, toast

- `--pc-tile-gap`
- `--pc-tile-grow`
- `--pc-overlay-bg`
- `--pc-overlay-z`
- `--pc-modal-width`
- `--pc-modal-icon-size`
- `--pc-toast-z`
- `--pc-toast-offset-x`
- `--pc-toast-offset-y`
