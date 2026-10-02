# @miquelt9/pc-ui

Windows 9x-style design system: **CSS first**, optional React wrappers. Presentational only — no window manager.

See [AGENTS.md](./AGENTS.md) for wiring notes.

## Vanilla (HTML/CSS/JS)

```html
<link rel="stylesheet" href="css/pc-ui.css">
```

```bash
cp ../pc-ui/src/pc-ui.css css/pc-ui.css
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/miquelt9/pc-ui@main/src/pc-ui.css">
```

Use `.pc-*` classes, or alias your existing names onto them. No npm or React required.

## Bundlers / React

```bash
npm install github:miquelt9/pc-ui
```

Git installs run `prepare` (builds `dist/`). Local sibling: `"@miquelt9/pc-ui": "file:../pc-ui"`.

```css
@import "@miquelt9/pc-ui/pc-ui.css";
```

```tsx
import { Window, Button, Taskbar } from "@miquelt9/pc-ui";
```

React is an optional peer. Theme by overriding CSS variables; mix consumer layout utilities with pc-ui chrome.

| Export | Role |
| --- | --- |
| `@miquelt9/pc-ui/pc-ui.css` | Single-file bundle |
| `@miquelt9/pc-ui/style.css` | Alias of `pc-ui.css` |
| `@miquelt9/pc-ui/tokens.css` | Variables |
| `@miquelt9/pc-ui/primitives.css` | Tokens + classes |

### Tokens

- **Colors:** `--pc-desktop-bg`, `--pc-chrome-bg`, `--pc-chrome-dark`, `--pc-window-body-bg`, `--pc-titlebar-bg`, `--pc-titlebar-text`, `--pc-terminal-bg`, `--pc-terminal-titlebar`, `--pc-terminal-text`, `--pc-text-main`, `--pc-text-muted`, `--pc-link`, `--pc-link-visited`, `--pc-link-active`
- **Semantic Feedback:** `--pc-color-error`, `--pc-color-error-bg`, `--pc-color-warning`, `--pc-color-warning-bg`, `--pc-color-success`, `--pc-color-success-bg`, `--pc-color-info`, `--pc-color-info-bg`
- **Interactive & Focus:** `--pc-button-hover-bg`, `--pc-button-active-bg`, `--pc-input-bg`, `--pc-titlebar-btn-fg`, `--pc-titlebar-btn-fg-dark`, `--pc-focus-ring`, `--pc-focus-ring-offset`
- **Bevels:** `--pc-bevel-light`, `--pc-bevel-dark`, `--pc-bevel-shadow`, `--pc-bevel-inset-shadow`
- **Typography & Scale:** `--pc-font-family`, `--pc-font-sans`, `--pc-font-size-xs`, `--pc-font-size-sm`, `--pc-font-size-md`, `--pc-line-height-tight`, `--pc-line-height-body`
- **Spacing (2px grid):** `--pc-space-1` (2px), `--pc-space-2` (4px), `--pc-space-3` (8px), `--pc-space-4` (12px), `--pc-space-5` (16px)
- **Layout & Overlay:** `--pc-tile-gap`, `--pc-tile-grow`, `--pc-overlay-bg`, `--pc-overlay-z`, `--pc-modal-width`, `--pc-modal-icon-size`, `--pc-toast-z`, `--pc-toast-offset-x`, `--pc-toast-offset-y`

Title-bar blue is `--pc-titlebar-bg`: `#1E5AA8` on the light theme, `#2B6CB0` on dark (and on `system` when the OS prefers dark). Caption text is `--pc-titlebar-text` (`#FFFFFF`). Terminal panes use `--pc-terminal-titlebar` (`#2C2C2C`). Names and theme values: [.agents/tokens.md](./.agents/tokens.md).

### Classes

`.pc-desktop` / `--tiled` · `.pc-workspace` · `.pc-split--row` / `--col` · `.pc-window` / `--dark` / `--fill` / `--freeform` · `.pc-titlebar` · `.pc-button` / `--primary` · `.pc-input` · `.pc-select` · `.pc-textarea` · `.pc-field` · `.pc-field-label` · `.pc-field-error` · `.pc-checkbox` · `.pc-radio` · `.pc-badge` / `--error` / `--warning` / `--success` / `--info` · `.pc-toast` · `.pc-toast-actions` · `.pc-toast-container` / `--bottom-right` / `--bottom-left` / `--top-right` / `--top-left` · `.pc-tabs` · `.pc-tab-list` · `.pc-tab` · `.pc-tab-panel` · `.pc-progress` / `--blocks` · `.pc-taskbar` · `.pc-overlay` / `--print-hidden` · `.pc-menu` · `.pc-overflow-menu` · `.pc-group` · `.pc-statusbar` · `.pc-bevel-outset` / `--inset` · `.pc-link` · `.pc-sr-only` · `.pc-theme-light` / `.pc-theme-dark` / `.pc-theme-system`

## Themes & Accessibility

- **WCAG AA Conformance:** Titlebars and interactive states meet WCAG AA contrast (≥ 4.5:1 for normal text). Focus rings use `:focus-visible` with a customizable dotted outline.
- **Dark Mode:** Set `data-pc-theme="dark"` (or class `.pc-theme-dark`) on `<html>`, `<body>`, or `<Desktop theme="dark">` for Night Win9x dark mode. Use `system` to follow `prefers-color-scheme`.
- **Terminal Windows:** `.pc-window--dark` renders a dark terminal-style window.
- **Overlay:** `.pc-overlay` is presentational backdrop chrome; consumers own focus trapping and escape handling for accessible dialogs.

## React

```tsx
import "@miquelt9/pc-ui/pc-ui.css";
import {
  Desktop,
  Workspace,
  Split,
  Window,
  Button,
  Input,
  Select,
  TextArea,
  Field,
  Checkbox,
  Radio,
  Badge,
  Toast,
  ToastContainer,
  ToastActions,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Progress,
  Taskbar,
  Overlay,
  Modal,
  ContentModal,
  Menu,
  MenuItem,
  OverflowMenu,
  Group,
  StatusBar,
  TitleBar,
} from "@miquelt9/pc-ui";
```

`Desktop tiled` + `Split` + `Window fill` for multi-pane layouts. `Modal` is a confirmation dialog. `ContentModal` is a free-form dialog (`Overlay` + `Window`). `OverflowMenu` is the portaled "more" menu. Details: [.agents/chrome.md](./.agents/chrome.md).

## Develop

```bash
npm install
npm run build
```

Commit `src/pc-ui.css`. Do not commit `dist/`.
