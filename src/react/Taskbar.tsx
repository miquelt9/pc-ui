import React from "react";

export interface TaskbarProps extends React.HTMLAttributes<HTMLElement> {}

export const Taskbar = React.forwardRef<HTMLElement, TaskbarProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <footer ref={ref} className={`pc-taskbar ${className}`} {...props}>
        {children}
      </footer>
    );
  }
);

Taskbar.displayName = "Taskbar";
