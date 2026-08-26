# @miquelt9/pc-ui

Retro Windows 9x-style design system: CSS tokens, bevelled primitives, and thin React wrappers.

Shared visual language for [miquelt9.github.io](https://github.com/miquelt9/miquelt9.github.io) (vanilla) and React apps such as bingo-musical.

For agent-oriented wiring steps, see [AGENTS.md](./AGENTS.md).

## Installation

```bash
npm install github:miquelt9/pc-ui
```

Local sibling checkout:

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "file:../pc-ui"
  }
}
```

Peer deps: `react` and `react-dom` `>=18` (only needed if you import React components).

## CSS

Import styles separately — the JS entry does not inject CSS.

```css
@import "@miquelt9/pc-ui/primitives.css";
```

Exports:

| Import | What it is |
| --- | --- |
| `@miquelt9/pc-ui/tokens.css` | `:root` CSS variables |
| `@miquelt9/pc-ui/primitives.css` | Tokens + component classes |
| `@miquelt9/pc-ui/style.css` | Alias of `primitives.css` |

### Tokens (high level)

- Desktop: `--pc-desktop-bg`
- Chrome / taskbar: `--pc-chrome-bg`
- Title bar: `--pc-titlebar-bg` / `--pc-titlebar-text`
- Terminal: `--pc-terminal-bg`, `--pc-terminal-titlebar`
- Bevel: `--pc-bevel-light`, `--pc-bevel-dark`, `--pc-bevel-shadow`
- Font: `--pc-font-family` (Source Code Pro)

### Useful classes

| Class | Role |
| --- | --- |
| `.pc-desktop` | Full-viewport cyan desktop |
| `.pc-window` / `--dark` | Window chrome |
| `.pc-titlebar` / `--dark` | Title bar |
| `.pc-titlebar-btn` | `_` `□` `X` controls |
| `.pc-window-content` / `--plain` | Inset body |
| `.pc-button` / `--primary` | Bevelled button |
| `.pc-input`, `.pc-select`, `.pc-textarea` | Form controls |
| `.pc-taskbar`, `.pc-start-btn`, `.pc-taskbar-item`, `.pc-taskbar-clock` | Taskbar |
| `.pc-bevel-outset` / `.pc-bevel-inset` | Bevel helpers |
| `.pc-link` | Classic link colors |

## React

```tsx
import "@miquelt9/pc-ui/primitives.css";
import {
  Button,
  Window,
  TitleBar,
  Input,
  Select,
  TextArea,
  Taskbar,
} from "@miquelt9/pc-ui";

export function Example() {
  return (
    <div className="pc-desktop">
      <Window
        title="My Computer"
        onMinimize={() => {}}
        onMaximize={() => {}}
        onClose={() => {}}
      >
        <p>Welcome to pc-ui</p>
        <Button variant="primary">OK</Button>
        <Input placeholder="Type something..." />
      </Window>

      <Taskbar>
        <button type="button" className="pc-button pc-start-btn">
          Start
        </button>
        <div className="pc-taskbar-clock">12:00 PM</div>
      </Taskbar>
    </div>
  );
}
```

| Component | Notes |
| --- | --- |
| `Button` | `variant`: `default` \| `primary`; `active` pressed look |
| `TitleBar` | `title`, `icon`, `variant`, `onMinimize` / `onMaximize` / `onClose`, `controls` |
| `Window` | Composes `TitleBar`; `contentVariant`: `default` \| `plain` |
| `Input` / `Select` / `TextArea` | Native elements + `.pc-*` classes |
| `Taskbar` | `<footer className="pc-taskbar">` |

Wrappers are presentational only. No drag, resize, or window manager.

## Consumer patterns

**Vanilla (github.io):** import primitives once; alias existing classes (`.mainbox`, `.topbar`, …) onto package styles so HTML/JS stay unchanged.

**React:** import primitives + components; replace zinc/glass chrome with windows and taskbar; keep print/PDF layouts free of Win98 decoration.

## Develop this package

```bash
npm install
npm run build
```

`tsc` emits ESM + declarations under `dist/`. CSS ships from `src/` via package `exports`.

## License

Personal / project use under [miquelt9/pc-ui](https://github.com/miquelt9/pc-ui).
