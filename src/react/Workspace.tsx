import React from "react";

export interface WorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Flex container for tiled windows / splits (fills parent). */
export const Workspace = React.forwardRef<HTMLDivElement, WorkspaceProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-workspace ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

Workspace.displayName = "Workspace";
