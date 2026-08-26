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

## React app (`bingo-musical`) — npm, not a CSS copy

[bingo-musical](https://github.com/miquelt9/bingo-musical) is a **Vite + React 18 + Tailwind + React Router** SPA (`package.json`, `vite.config.ts`, `src/main.tsx`). Do **not** vendor `pc-ui.css` into `public/` the way github.io does. Install the package and use the React components.

### Install

Sibling checkout (preferred while iterating):

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "file:../pc-ui"
  }
}
```

GitHub (CI / deploy). `prepare` runs `tsc` so `dist/` exists even though it is gitignored:

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "github:miquelt9/pc-ui"
  }
}
```

```tsx
import "@miquelt9/pc-ui/pc-ui.css";
import { Window, Button, Taskbar, Desktop } from "@miquelt9/pc-ui";
```

Or in [`src/index.css`](https://github.com/miquelt9/bingo-musical/blob/main/src/index.css):

```css
@import "@miquelt9/pc-ui/pc-ui.css";
```

CSS exports: `pc-ui.css` (preferred), `style.css` (alias), `tokens.css`, `primitives.css`.

React is a peer Bingo already provides (`react` / `react-dom` ^18). Tailwind stays Bingo’s own dependency — do not add it to pc-ui.

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

## Wiring: React app (`bingo-musical`) — files to touch

Keep routes, deck logic, YouTube player, print CSS, and `jspdf`. Restyle **on-screen chrome only**.

1. [`index.html`](https://github.com/miquelt9/bingo-musical/blob/main/index.html) — Source Code Pro; drop Plus Jakarta / `dark` / zinc body classes.
2. [`src/index.css`](https://github.com/miquelt9/bingo-musical/blob/main/src/index.css) — `@import "@miquelt9/pc-ui/pc-ui.css"`; keep `@media print` so cards stay white paper.
3. Optional [`tailwind.config.js`](https://github.com/miquelt9/bingo-musical/blob/main/tailwind.config.js) token bridge (layout utilities only; chrome comes from pc-ui classes):

   ```js
   colors: {
     pc: {
       desktop: "var(--pc-desktop-bg)",
       chrome: "var(--pc-chrome-bg)",
       title: "var(--pc-titlebar-bg)",
     },
   }
   ```

4. [`src/components/layout/AppShell.tsx`](https://github.com/miquelt9/bingo-musical/blob/main/src/components/layout/AppShell.tsx) — replace `bg-zinc-950` / glass header with `Desktop` + `Taskbar` (or bevelled top bar) for Decks / Editor / Cards / Host / Settings. Mini-player is a small `Window`, not a glass dock.
5. Pages (`HomePage`, `EditorPage`, `CardsPage`, `HostPage`, `SettingsPage`) — zinc `rounded-3xl` cards become `Window` + title bar (`_ □ X` as chrome; wire `onClose` only when a modal actually closes).
6. Shared controls / modals — `Button`, `Input`, `Select`, `TextArea`. Mix Tailwind for spacing/grid (`className="w-full max-w-xl"`) with pc-ui chrome.
7. `CardPreview` — on-screen preview may sit in a window; printed/PDF cards stay clean paper.

Do **not** turn Bingo into a full desktop OS (no drag/resize / i3 keybinds unless asked). Multi-pane fullscreen: `Desktop tiled` + `Workspace` + `Split` + `Window fill`.

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
