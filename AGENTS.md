# Agent guide: `@miquelt9/pc-ui`

Instructions for AI agents (and humans) wiring this design system into consumer apps.

## What this package is

Presentational Windows 9x chrome only:

- CSS tokens (`src/tokens.css`)
- CSS primitives (`.pc-window`, `.pc-button`, `.pc-taskbar`, …)
- Thin React wrappers (`Button`, `Window`, `TitleBar`, `Input`/`Select`/`TextArea`, `Taskbar`)

It does **not** include window dragging, z-index managers, routing, or game logic. Consumers keep their own JS/behavior.

## Install

Prefer local while iterating, then GitHub:

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "file:../pc-ui"
  }
}
```

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "github:miquelt9/pc-ui"
  }
}
```

CSS is exported from source paths (not `dist`):

- `@miquelt9/pc-ui/tokens.css`
- `@miquelt9/pc-ui/primitives.css` (imports tokens)
- `@miquelt9/pc-ui/style.css` (alias of primitives)

React components come from `@miquelt9/pc-ui` (built `dist/`). **Always import CSS separately** — JS exports do not inject styles.

## Visual language (do not reinvent)

| Token / role | Value |
| --- | --- |
| Desktop | `--pc-desktop-bg` → `rgb(146, 246, 251)` |
| Chrome / taskbar | `--pc-chrome-bg` → `#EEF2F5` |
| Title bar | `--pc-titlebar-bg` → `rgb(106, 166, 240)` |
| Terminal | `--pc-terminal-bg` `#171421` / titlebar `#2C2C2C` |
| Bevel | 2px light `#FEFFFF` + dark `#808080`, shadow `2px 2px 0 #010101` |
| Font | Source Code Pro (`--pc-font-family`) |
| Links | `#0907ec` / visited `#572191` / active `#FF0000` |

Squared corners. No rounded-3xl glass docks, emerald gradients, or purple AI-default themes.

## Wiring: vanilla site (`miquelt9.github.io`)

1. Depend on or vendor `@miquelt9/pc-ui`.
2. Import primitives once (e.g. in the main stylesheet):

   ```css
   @import "@miquelt9/pc-ui/primitives.css";
   ```

3. Keep existing HTML/JS class names (`.mainbox`, `.topbar`, `.topbarButton`, `.taskbar`) by **aliasing** them to package classes instead of rewriting markup:

   ```css
   .mainbox { /* compose or extend .pc-window rules */ }
   .topbar { /* map to .pc-titlebar */ }
   .topbarButton { /* map to .pc-titlebar-btn */ }
   .taskbar { /* map to .pc-taskbar */ }
   ```

4. Delete duplicated bevel/titlebar/button rules from the site CSS once aliases use shared tokens.
5. Leave window-manager JS as-is; do not pull React into the static site unless asked.

## Wiring: React app (`bingo-musical`)

1. Install the package (`file:` or `github:`).
2. In the app entry CSS (e.g. `src/index.css`):

   ```css
   @import "@miquelt9/pc-ui/primitives.css";
   ```

3. Load **Source Code Pro**; drop dark zinc/emerald body chrome for on-screen UI.
4. Keep `@media print` / PDF paths clean (white paper cards) — do not wrap printed bingo cards in Win98 chrome.
5. Optional Tailwind bridge — map tokens in `tailwind.config.js` (e.g. `pc.desktop`, `pc.chrome`, `pc.title`). Tailwind is **not** a package dependency.
6. Replace chrome with React components where natural:

   - Shell / nav → `Taskbar` or bevelled bar + `.pc-button`
   - Panels / pages → `Window` + title bar (`_ □ X` as chrome; wire `onClose` only when something actually closes)
   - Controls / modals → `Button`, `Input`, `Select`, `TextArea`
   - Mini-player → small `Window`, not a glass dock

7. Do **not** make Bingo a full desktop OS (no drag/resize windows unless explicitly requested).

## Component checklist

| Need | Use |
| --- | --- |
| Bevelled button | `<Button>` or `.pc-button` / `.pc-button--primary` |
| Title bar | `<TitleBar>` or `.pc-titlebar` |
| Window frame | `<Window>` or `.pc-window` + `.pc-window-content` |
| Dark/terminal | `variant="dark"` / `.pc-window--dark` |
| Plain content (no inset body) | `contentVariant="plain"` |
| Text field | `<Input>` / `.pc-input` |
| Select / textarea | `<Select>` / `<TextArea>` |
| Bottom bar | `<Taskbar>` / `.pc-taskbar` |
| Desktop backdrop | `.pc-desktop` |

## Out of scope (unless user asks)

- Changing the GitHub profile README repo (`miquelt9/miquelt9`)
- Goose, custom cursor, or games from the personal site
- Draggable/resizable Bingo windows
- Publishing to npm (GitHub install is enough)

## Changing this package

- Prefer CSS tokens + primitives first; keep React wrappers thin (`className` + children).
- After CSS/TS changes: `npm run build` and bump consumers if they pin a commit.
- Do not add Tailwind, window managers, or peer deps beyond React unless requested.

## Verify after wiring

- **Bingo**: home → deck → editor → cards (print still white) → host → settings; spot-check a modal and mini-player.
- **Personal site**: windows, taskbar, start menu still look correct after CSS aliasing.
