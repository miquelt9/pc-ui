import React from "react";

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Full-viewport backdrop; place a `Window` (or other chrome) as children. */
export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-overlay ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

Overlay.displayName = "Overlay";
