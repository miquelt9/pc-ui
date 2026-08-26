import React from "react";

export interface DesktopProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column layout: workspace grows, taskbar stays at the bottom. */
  tiled?: boolean;
}

export const Desktop = React.forwardRef<HTMLDivElement, DesktopProps>(
  ({ className = "", tiled = false, children, ...props }, ref) => {
    const classNames = ["pc-desktop", tiled ? "pc-desktop--tiled" : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Desktop.displayName = "Desktop";
