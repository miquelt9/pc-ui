import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
  active?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", active = false, children, ...props }, ref) => {
    const classNames = [
      "pc-button",
      variant === "primary" ? "pc-button--primary" : "",
      active ? "active" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
