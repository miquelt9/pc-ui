import React from "react";

export interface GroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactNode;
}

export const Group = React.forwardRef<HTMLFieldSetElement, GroupProps>(
  ({ className = "", legend, children, ...props }, ref) => {
    return (
      <fieldset ref={ref} className={`pc-group ${className}`.trim()} {...props}>
        {legend != null ? <legend>{legend}</legend> : null}
        {children}
      </fieldset>
    );
  }
);

Group.displayName = "Group";
