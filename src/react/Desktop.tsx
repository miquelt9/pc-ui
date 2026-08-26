import React from "react";

export type DesktopTheme = "light" | "dark" | "system";

export interface DesktopProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column layout: workspace grows, taskbar stays at the bottom. */
  tiled?: boolean;
  /** System color theme: "light" (default), "dark", or "system" (follows OS prefers-color-scheme). */
  theme?: DesktopTheme;
}

export const Desktop = React.forwardRef<HTMLDivElement, DesktopProps>(
  ({ className = "", tiled = false, theme, children, ...props }, ref) => {
    const classNames = ["pc-desktop", tiled ? "pc-desktop--tiled" : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} data-pc-theme={theme} {...props}>
        {children}
      </div>
    );
  }
);

Desktop.displayName = "Desktop";
