import React from "react";

export interface StatusBarProps extends React.HTMLAttributes<HTMLElement> {}

export const StatusBar = React.forwardRef<HTMLElement, StatusBarProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <footer ref={ref} className={`pc-statusbar ${className}`.trim()} {...props}>
        {children}
      </footer>
    );
  }
);

StatusBar.displayName = "StatusBar";

export interface StatusBarPaneProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StatusBarPane = React.forwardRef<HTMLDivElement, StatusBarPaneProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-statusbar-pane ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

StatusBarPane.displayName = "StatusBarPane";
