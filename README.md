# @miquelt9/pc-ui

Retro Windows 9x-style Design System (CSS tokens, primitives, React components).

## Installation

```bash
npm install github:miquelt9/pc-ui
```

Or for local development:

```json
{
  "dependencies": {
    "@miquelt9/pc-ui": "file:../pc-ui"
  }
}
```

## CSS Setup

Import design tokens and primitives into your application stylesheet or entry file:

```css
/* Tokens and component primitives */
@import "@miquelt9/pc-ui/primitives.css";

/* Or individual imports */
@import "@miquelt9/pc-ui/tokens.css";
```

## React Components Usage

```tsx
import React, { useState } from "react";
import "@miquelt9/pc-ui/primitives.css";
import { Button, Window, TitleBar, Input, Select, TextArea, Taskbar } from "@miquelt9/pc-ui";

export function App() {
  const [active, setActive] = useState(false);

  return (
    <div className="pc-desktop">
      <Window
        title="My Computer"
        onMinimize={() => {}}
        onMaximize={() => {}}
        onClose={() => {}}
      >
        <p>Welcome to pc-ui</p>
        <Button variant="primary" onClick={() => setActive(!active)}>
          Click Me
        </Button>
        <Input placeholder="Type something..." />
      </Window>

      <Taskbar>
        <button className="pc-button pc-start-btn">Start</button>
        <div className="pc-taskbar-clock">12:00 PM</div>
      </Taskbar>
    </div>
  );
}
```

## Components Included

- **`Button`**: Bevelled retro buttons with `primary` and `active` states.
- **`TitleBar`**: Window title bar with minimize, maximize, and close controls.
- **`Window`**: Classic bevelled window frame with integrated title bar and content area.
- **`Input` / `Select` / `TextArea`**: Bevelled form control primitives.
- **`Taskbar`**: Bottom taskbar container with slot support.
