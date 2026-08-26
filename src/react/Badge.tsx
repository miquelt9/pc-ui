import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "error" | "warning" | "success" | "info";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const classNames = [
      "pc-badge",
      variant !== "default" ? `pc-badge--${variant}` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classNames} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
