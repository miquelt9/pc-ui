# Shared chrome

Presentational shell pieces. Consumers own routing, focus traps, and data.

## Overflow menu

`<OverflowMenu>` / `.pc-overflow-menu*`.

The trigger is a `.pc-button`. Pass `triggerIcon` to replace the default 16px horizontal-dots SVG (no icon-library dependency). `triggerLabel` adds the labeled trigger. `align` is `"right"` (default) or `"left"`.

The panel is portaled to `document.body` with `.pc-overflow-menu-panel--floating` and flips above the trigger when there is room. Escape, an outside pointer down, or an item click closes it. An empty `items` list renders nothing.

## Dialogs

| Need | Use |
| --- | --- |
| Confirm / warning / danger | `<Modal>` — `.pc-window--modal`, optional `.pc-window--modal-warning` / `--danger`, OK and Cancel |
| Free-form body (forms, pickers, long content) | `<ContentModal>` — `.pc-overlay.pc-overlay--print-hidden` + `.pc-window.pc-window--freeform` |
| Custom shell | `<Overlay>` + `<Window>` |

`ContentModal` closes on backdrop click and on Escape (capture phase), and clicks inside the window do not dismiss it. `className` is applied to the window, so a consumer can still pass a wider or scrolling shell. The default window is `width: 100%` and `max-width: 32rem`. It does not render confirm/cancel actions; put those in `children` when the dialog needs them. `open={false}` renders nothing.

`.pc-overlay--print-hidden` hides that backdrop when printing.

## Title bar

`<TitleBar>` / `.pc-titlebar`, also rendered by `<Window>` and both modals.

The bar is a two-column grid: the caption column can shrink and ellipsize, and the control column stays on the trailing edge. `.pc-titlebar--dark` remains the terminal caption. App page headers (back buttons, mobile section nav) are not part of this package.
