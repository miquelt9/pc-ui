import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
  active?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", active = false, type = "button", children, ...props }, ref) => {
    const classNames = [
      "pc-button",
      variant === "primary" ? "pc-button--primary" : "",
      active ? "active" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
