# @miquelt9/pc-ui

Retro Windows 9x-style design system: **CSS first**, optional thin React wrappers.

Shared look for [miquelt9.github.io](https://github.com/miquelt9/miquelt9.github.io) (vanilla HTML/CSS/JS) and React apps such as bingo-musical.

For agent wiring steps, see [AGENTS.md](./AGENTS.md).

## Vanilla (github.io) — no npm

The personal site stays plain static files. Use **one stylesheet**:

```html
<link rel="stylesheet" href="css/pc-ui.css">
```

Copy from this repo:

```bash
cp ../pc-ui/src/pc-ui.css path/to/miquelt9.github.io/css/pc-ui.css
```

Or CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/miquelt9/pc-ui@main/src/pc-ui.css">
```

Then use classes like `.pc-window`, `.pc-titlebar`, `.pc-button`, `.pc-taskbar`, or alias your existing `.mainbox` / `.topbar` rules onto the same tokens. Keep your window-manager JS — you do **not** need React or a bundler.

## React / npm apps

```bash
npm install github:miquelt9/pc-ui
```

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "file:../pc-ui"
  }
}
```

```css
@import "@miquelt9/pc-ui/pc-ui.css";
```

React is an **optional** peer (only if you import components from `@miquelt9/pc-ui`).

### CSS exports

| Import | What it is |
| --- | --- |
| `@miquelt9/pc-ui/pc-ui.css` | Single-file bundle (preferred) |
| `@miquelt9/pc-ui/style.css` | Alias of `pc-ui.css` |
| `@miquelt9/pc-ui/tokens.css` | `:root` variables only |
| `@miquelt9/pc-ui/primitives.css` | Tokens via `@import` + classes |

### Tokens (high level)

- Desktop: `--pc-desktop-bg`
- Chrome / taskbar: `--pc-chrome-bg`
- Title bar: `--pc-titlebar-bg` / `--pc-titlebar-text`
- Terminal: `--pc-terminal-bg`, `--pc-terminal-titlebar`
- Bevel: `--pc-bevel-light`, `--pc-bevel-dark`, `--pc-bevel-shadow`
- Font: `--pc-font-family` (Source Code Pro)
- Tile gap / grow: `--pc-tile-gap`, `--pc-tile-grow`

### Useful classes

| Class | Role |
| --- | --- |
| `.pc-desktop` | Full-viewport cyan desktop |
| `.pc-desktop--tiled` | Column shell: workspace + taskbar |
| `.pc-workspace` | Flex root for tiled panes |
| `.pc-split--row` / `.pc-split--col` | Nested i3-style splits |
| `.pc-tile` | Optional flex cell wrapper |
| `.pc-window` / `--dark` / `--fill` | Window chrome; `--fill` fills its tile |
| `.pc-titlebar` / `--dark` | Title bar |
| `.pc-titlebar-btn` | `_` `□` `X` controls |
| `.pc-window-content` / `--plain` | Inset body |
| `.pc-button` / `--primary` | Bevelled button |
| `.pc-input`, `.pc-select`, `.pc-textarea` | Form controls |
| `.pc-taskbar`, `.pc-start-btn`, `.pc-taskbar-item`, `.pc-taskbar-clock` | Taskbar |
| `.pc-bevel-outset` / `.pc-bevel-inset` | Bevel helpers |
| `.pc-link` | Classic link colors |

## React components

```tsx
import "@miquelt9/pc-ui/pc-ui.css";
import {
  Button,
  Desktop,
  Workspace,
  Split,
  Window,
  TitleBar,
  Input,
  Select,
  TextArea,
  Taskbar,
} from "@miquelt9/pc-ui";

export function Example() {
  return (
    <Desktop tiled>
      <Workspace>
        <Split direction="row">
          <Window fill title="Editor" grow={2}>
            <p>Welcome to pc-ui</p>
            <Button variant="primary">OK</Button>
            <Input placeholder="Type something..." />
          </Window>
          <Split direction="col" grow={1}>
            <Window fill title="Preview">…</Window>
            <Window fill title="Terminal" variant="dark">…</Window>
          </Split>
        </Split>
      </Workspace>
      <Taskbar>
        <button type="button" className="pc-button pc-start-btn">
          Start
        </button>
        <div className="pc-taskbar-clock">12:00 PM</div>
      </Taskbar>
    </Desktop>
  );
}
```

| Component | Notes |
| --- | --- |
| `Desktop` | `tiled` → workspace fills viewport above taskbar |
| `Workspace` | Flex root for splits / fill windows |
| `Split` | `direction`: `row` \| `col`; optional `grow` |
| `Button` | `variant`: `default` \| `primary`; `active` pressed look |
| `TitleBar` | `title`, `icon`, `variant`, `onMinimize` / `onMaximize` / `onClose`, `controls` |
| `Window` | `fill` + `grow` for tiles; `contentVariant`: `default` \| `plain` |
| `Input` / `Select` / `TextArea` | Native elements + `.pc-*` classes |
| `Taskbar` | `<footer className="pc-taskbar">` |

Presentational only. Tiling is layout CSS — no drag, resize handles, or i3 keybinds.

## Develop this package

```bash
npm install
npm run build   # bundles src/pc-ui.css then tsc → dist/
```

Commit `src/pc-ui.css` so vanilla sites can copy it without Node.

## License

Personal / project use under [miquelt9/pc-ui](https://github.com/miquelt9/pc-ui).
