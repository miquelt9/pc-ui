# Design

Windows 9x chrome: squared corners, beveled edges, flat system colors, monospace UI type. The look lives in the tokens. Do not add rounded glass, gradients, or a second palette.

## Tokens first

Theme by overriding custom properties on `:root`, a `.pc-theme-*` class, or `[data-pc-theme]`. Do not fork a component to restyle it. Names and theme values, including title-bar blue (`--pc-titlebar-bg`): [tokens.md](./tokens.md).

Light is the default. Dark is Night Win9x (deep teal desktop, charcoal chrome, title-bar blue). `system` follows `prefers-color-scheme`. `variant="dark"` (`.pc-window--dark`) is the DOS/terminal pane in both themes, not the app-wide dark theme.

## Chrome

Buttons, windows, menus, dialogs, and bars share the same bevel and title-bar language. Overflow menu, dialogs (`Modal`, `ContentModal`, `Overlay`), and the title bar: [chrome.md](./chrome.md). The full component checklist: [AGENTS.md](../AGENTS.md).

## No look drift

New pieces use the existing tokens, the 2px spacing scale, and squared bevels. A visual redesign (palette, corner radius, density, or a different chrome metaphor) needs Product.
