# Agent guide: `@miquelt9/pc-ui`

Instructions for AI agents (and humans) wiring this design system into consumer apps.

## What this package is

Presentational Windows 9x chrome only:

- **CSS** (primary API): tokens + primitives, also as one file `src/pc-ui.css`
- **Optional React** wrappers for apps that already use React

It does **not** include window dragging, keyboard tiling bindings, z-index managers, routing, or game logic. Consumers keep their own JS/behavior.

It **does** support presentational i3-style tiling: nested horizontal/vertical splits whose leaf windows fill their cells (fullscreen *within the layout*, not browser Fullscreen API).

## Two consumer modes

| Consumer | How to use pc-ui | Do NOT add |
| --- | --- | --- |
| **Vanilla** (`miquelt9.github.io`) | One CSS `<link>` + `.pc-*` classes / aliases | npm, React, bundlers, `dist/` JS |
| **React** (`bingo-musical`) | `npm` + CSS import + React components | Window-manager rewrites |

## Vanilla site (`miquelt9.github.io`) — preferred path

The personal site is static HTML/CSS/JS (no build). Treat pc-ui as **plain CSS**.

### Option A — vendor copy (best offline / no CDN)

1. Copy the single stylesheet into the site (no npm):

   ```bash
   cp ../pc-ui/src/pc-ui.css css/pc-ui.css
   ```

2. In `index.html` (and other pages), add one link — keep existing scripts as they are:

   ```html
   <link rel="stylesheet" href="css/pc-ui.css">
   ```

3. Alias existing site classes onto package classes so HTML/JS stay unchanged:

   ```css
   /* e.g. in styles/windows.css or a thin aliases.css */
   .mainbox { /* shared look via vars / same rules as .pc-window */ }
   .topbar { /* map toward .pc-titlebar */ }
   .topbarButton { /* map toward .pc-titlebar-btn */ }
   .taskbar { /* map toward .pc-taskbar */ }
   ```

   Or gradually add `.pc-window` / `.pc-titlebar` class names alongside old ones.

4. Remove duplicated bevel/titlebar/button rules from site CSS once tokens/primitives cover them.
5. Leave `windowManager.js` and friends alone — no React.

Re-copy `pc-ui.css` when the design system changes (or add a tiny sync script in the site repo).

### Option B — jsDelivr (no copy step)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/miquelt9/pc-ui@main/src/pc-ui.css">
```

Pin a tag/commit instead of `@main` for stability when you care.

### What vanilla does NOT need

- `npm install`, `package.json`, Vite/Webpack
- React / `dist/index.js`
- The tiling React helpers (`Desktop`, `Split`, …) — use the same CSS classes in HTML if needed

## React app (`bingo-musical`)

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "file:../pc-ui"
  }
}
```

or `"github:miquelt9/pc-ui"`.

```css
@import "@miquelt9/pc-ui/pc-ui.css";
```

```tsx
import { Window, Button, Taskbar } from "@miquelt9/pc-ui";
```

React is an **optional** peer — only required if you import JS components.

CSS exports:

- `@miquelt9/pc-ui/pc-ui.css` — single file (preferred)
- `@miquelt9/pc-ui/tokens.css` / `primitives.css` — split sources
- `@miquelt9/pc-ui/style.css` — alias of `pc-ui.css`

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

## Wiring: React app (`bingo-musical`) — continued

1. Install the package (`file:` or `github:`).
2. In the app entry CSS (e.g. `src/index.css`):

   ```css
   @import "@miquelt9/pc-ui/pc-ui.css";
   ```

3. Load **Source Code Pro**; drop dark zinc/emerald body chrome for on-screen UI.
4. Keep `@media print` / PDF paths clean (white paper cards) — do not wrap printed bingo cards in Win98 chrome.
5. Optional Tailwind bridge — map tokens in `tailwind.config.js` (e.g. `pc.desktop`, `pc.chrome`, `pc.title`). Tailwind is **not** a package dependency.
6. Replace chrome with React components where natural:

   - Shell / nav → `Taskbar` or bevelled bar + `.pc-button`
   - Panels / pages → `Window` + title bar (`_ □ X` as chrome; wire `onClose` only when something actually closes)
   - Controls / modals → `Button`, `Input`, `Select`, `TextArea`
   - Mini-player → small `Window`, not a glass dock

7. Do **not** make Bingo a full desktop OS (no drag/resize / i3 keybinds unless explicitly requested). Use `Desktop tiled` + `Workspace` + `Split` + `Window fill` when you need multi-pane fullscreen layouts.

## Tiling layout (i3-style)

Presentational only — no move/focus/keybind manager.

```tsx
import {
  Desktop,
  Workspace,
  Split,
  Window,
  Taskbar,
} from "@miquelt9/pc-ui";

<Desktop tiled>
  <Workspace>
    <Split direction="row">
      <Window fill title="Editor" grow={2}>…</Window>
      <Split direction="col" grow={1}>
        <Window fill title="Preview">…</Window>
        <Window fill title="Terminal" variant="dark">…</Window>
      </Split>
    </Split>
  </Workspace>
  <Taskbar>…</Taskbar>
</Desktop>
```

CSS equivalent:

- `.pc-desktop--tiled` — column shell; workspace grows, taskbar fixed
- `.pc-workspace` — flex root for tiles
- `.pc-split--row` / `.pc-split--col` — nested splits
- `.pc-window--fill` — leaf fills its cell; content scrolls
- `--pc-tile-grow` — relative size (also `grow` prop on `Window` / `Split`)
- `--pc-tile-gap` — gap between tiles (default `0`)

Single maximized pane: one `Window fill` directly inside `Workspace`.

## Component checklist

| Need | Use |
| --- | --- |
| Bevelled button | `<Button>` or `.pc-button` / `.pc-button--primary` |
| Title bar | `<TitleBar>` or `.pc-titlebar` |
| Window frame | `<Window>` or `.pc-window` + `.pc-window-content` |
| Dark/terminal | `variant="dark"` / `.pc-window--dark` |
| Plain content (no inset body) | `contentVariant="plain"` |
| Fill tile / pane | `fill` / `.pc-window--fill` |
| Tiled desktop shell | `<Desktop tiled>` / `.pc-desktop--tiled` |
| Tile root | `<Workspace>` / `.pc-workspace` |
| Horizontal / vertical split | `<Split direction="row\|col">` / `.pc-split--*` |
| Text field | `<Input>` / `.pc-input` |
| Select / textarea | `<Select>` / `<TextArea>` |
| Bottom bar | `<Taskbar>` / `.pc-taskbar` |
| Desktop backdrop | `.pc-desktop` |

## Out of scope (unless user asks)

- Changing the GitHub profile README repo (`miquelt9/miquelt9`)
- Goose, custom cursor, or games from the personal site
- Draggable/resizable Bingo windows or i3 keybind emulation
- Publishing to npm (GitHub install is enough)

## Changing this package

- Prefer CSS tokens + primitives first; keep React wrappers thin (`className` + children).
- After CSS/TS source changes: `npm run build` (regenerates `src/pc-ui.css` + `dist/`).
- Commit the generated `src/pc-ui.css` so vanilla sites can copy/link it without running Node.
- Do not add Tailwind, window managers, or required peer deps beyond optional React.

## Verify after wiring

- **Bingo**: home → deck → editor → cards (print still white) → host → settings; spot-check a modal and mini-player.
- **Personal site**: windows, taskbar, start menu still look correct after CSS aliasing.
