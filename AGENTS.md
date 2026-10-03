# Agent guide: `@miquelt9/pc-ui`

Presentational Windows 9x chrome. CSS is the primary API; React wrappers are optional and thin (`className` + children). Consumers own behavior: routing, drag, z-order, focus, print, data.

How to change this repo: [.agents/AGENTS.md](./.agents/AGENTS.md). Package shape: [.agents/ARCHITECTURE.md](./.agents/ARCHITECTURE.md). Look: [.agents/DESIGN.md](./.agents/DESIGN.md).

## Consumers

| Kind | How to use | Do not add |
| --- | --- | --- |
| **Static HTML/CSS/JS** | One stylesheet (`pc-ui.css`) + `.pc-*` classes or aliases | npm, React, bundlers |
| **Bundled app (React, etc.)** | `npm` + CSS import + optional React components | Window-manager logic inside this package |

Do not vendor CSS into an app that already has a bundler. Do not pull React into a static site.

## Vanilla (no build)

Copy or CDN-link the bundled file:

```html
<link rel="stylesheet" href="css/pc-ui.css">
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/miquelt9/pc-ui@main/src/pc-ui.css">
```

```bash
cp ../pc-ui/src/pc-ui.css css/pc-ui.css
```

Pin a tag/commit on the CDN when you need a frozen look. Alias existing class names onto `.pc-*` if you cannot change markup. Keep the consumer’s own JS.

## Bundled / React

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "file:../pc-ui"
  }
}
```

or `"github:miquelt9/pc-ui"` (`prepare` builds `dist/`).

```css
@import "@miquelt9/pc-ui/pc-ui.css";
```

```tsx
import { Window, Button, Taskbar } from "@miquelt9/pc-ui";
```

React is an optional peer. Do not add Tailwind, CSS-in-JS, or extra peers to this package. Layout utilities may come from the consumer; chrome comes from pc-ui.

Exports: `pc-ui.css` (preferred), `style.css`, `tokens.css`, `primitives.css`.

## Visual language

Preserve tokens; do not invent rounded glass, gradients, or unrelated palettes.

| Role | Token |
| --- | --- |
| Desktop | `--pc-desktop-bg` |
| Chrome / bars | `--pc-chrome-bg` |
| Title bar | `--pc-titlebar-bg` (`#1E5AA8` light, `#2B6CB0` dark) / `--pc-titlebar-text` |
| Dark / terminal | `--pc-terminal-bg` / `--pc-terminal-titlebar` (`#2C2C2C`) |
| Bevel | `--pc-bevel-light`, `--pc-bevel-dark`, `--pc-bevel-shadow`, `--pc-bevel-inset-shadow` |
| Font & Scales | `--pc-font-family`, `--pc-font-sans`, `--pc-font-size-xs`, `--pc-font-size-sm`, `--pc-font-size-md`, `--pc-space-1` … `--pc-space-5` |
| Links | `--pc-link`, `--pc-link-visited`, `--pc-link-active` |
| Feedback | `--pc-color-error`, `--pc-color-warning`, `--pc-color-success`, `--pc-color-info` |
| Buttons / Inputs | `--pc-button-hover-bg`, `--pc-button-active-bg`, `--pc-input-bg`, `--pc-focus-ring` |

Squared corners. Override `:root` (or a wrapper) to theme without forking.

## Themes / Dark mode

Night Win9x theme: deep teal desktop, charcoal chrome, title bars in the title-bar blue `--pc-titlebar-bg` (`#2B6CB0`; light theme uses the same token at `#1E5AA8`). Activated by class or `data-pc-theme` attribute (or React `<Desktop theme="...">`). Default is light; `system` follows `prefers-color-scheme`. Token names: [.agents/tokens.md](./.agents/tokens.md).

| Theme | CSS class | Attribute | React |
| --- | --- | --- | --- |
| Light (default) | `.pc-theme-light` | `data-pc-theme="light"` | `<Desktop theme="light">` |
| Dark (Night Win9x) | `.pc-theme-dark` | `data-pc-theme="dark"` | `<Desktop theme="dark">` |
| Follow OS | `.pc-theme-system` | `data-pc-theme="system"` | `<Desktop theme="system">` |

Apply the attribute or class on `<html>`, `<body>`, or `<Desktop>`. Note: Per-window `variant="dark"` (`.pc-window--dark`) remains the DOS/terminal pane in both light and dark modes.

## Tiled layout

Presentational splits only — no keybinds or move/resize manager.

```tsx
<Desktop tiled>
  <Workspace>
    <Split direction="row">
      <Window fill title="Main" grow={2}>…</Window>
      <Split direction="col" grow={1}>
        <Window fill title="Side">…</Window>
        <Window fill title="Log" variant="dark">…</Window>
      </Split>
    </Split>
  </Workspace>
  <Taskbar>…</Taskbar>
</Desktop>
```

CSS: `.pc-desktop--tiled`, `.pc-workspace`, `.pc-split--row` / `--col`, `.pc-window--fill`, `--pc-tile-grow`, `--pc-tile-gap`. One fill window in a workspace is a single maximized pane.

## Checklist

| Need | Use |
| --- | --- |
| Button | `<Button>` / `.pc-button` / `--primary` / `[aria-busy]` |
| Title bar | `<TitleBar>` / `.pc-titlebar` (caption ellipsizes; controls stay visible) |
| Window | `<Window>` / `.pc-window` + `.pc-window-content` |
| Dark | `variant="dark"` / `.pc-window--dark` |
| No inset body | `contentVariant="plain"` |
| Fill pane | `fill` / `.pc-window--fill` |
| Tiled shell | `<Desktop tiled>` / `.pc-desktop--tiled` |
| Dark mode / Theme | `<Desktop theme="dark">` / `.pc-theme-dark` / `.pc-theme-system` |
| Splits | `<Split>` / `.pc-split--*` |
| Fields | `<Input>` `<Select>` `<TextArea>` `<Field>` |
| Checkbox / Radio | `<Checkbox>` `<Radio>` / `.pc-checkbox` / `.pc-radio` |
| Badge | `<Badge>` / `.pc-badge` / `--error` `--warning` `--success` `--info` |
| Toast / Notification | `<Toast>` / `<ToastContainer>` / `<ToastActions>` / `.pc-toast` / `.pc-toast-actions` (footer or inline) / `.pc-toast-container` / `--bottom-right` `--bottom-left` `--top-right` `--top-left` |
| Tabs | `<Tabs>` `<TabList>` `<Tab>` `<TabPanel>` / `.pc-tabs` |
| Progress bar | `<Progress>` / `.pc-progress` / `--blocks` |
| Taskbar | `<Taskbar>` / `.pc-taskbar` |
| Dialog backdrop | `<Overlay>` / `.pc-overlay` |
| Modal / confirm | `<Modal>` / `.pc-window--modal` / `--warning` / `--danger` |
| Free-form modal | `<ContentModal>` / `.pc-window--freeform` inside `.pc-overlay` |
| Menu | `<Menu>` / `.pc-menu` |
| Overflow menu | `<OverflowMenu>` / `.pc-overflow-menu` |
| Group box | `<Group>` / `.pc-group` |
| Status bar | `<StatusBar>` / `.pc-statusbar` |
| Screen reader text | `.pc-sr-only` |

## Extending this package

Prefer new **tokens + CSS classes** first, then a thin React wrapper. Keep names generic (no app-specific copy). Do not add drag/resize, routers, or required deps beyond optional React.

After CSS/TS changes: `npm run build` (rewrites `src/pc-ui.css` + `dist/`). Commit `src/pc-ui.css` for vanilla copy/link.

## Verify after wiring

Spot-check windows, buttons, forms, overlays, and any print stylesheet the consumer already has (print should stay whatever that app needs — do not force chrome onto paper).
