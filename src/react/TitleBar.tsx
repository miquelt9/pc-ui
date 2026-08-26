import React from "react";

export interface TitleBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "dark";
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  controls?: React.ReactNode;
}

export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
  (
    {
      className = "",
      title,
      icon,
      variant = "default",
      onMinimize,
      onMaximize,
      onClose,
      controls,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      "pc-titlebar",
      variant === "dark" ? "pc-titlebar--dark" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const btnClass = variant === "dark" ? "pc-titlebar-btn pc-titlebar-btn--dark" : "pc-titlebar-btn";

    return (
      <div ref={ref} className={classNames} {...props}>
        <div className="pc-titlebar-title">
          {icon && <span className="pc-titlebar-icon">{icon}</span>}
          {title || children}
        </div>
        <div className="pc-titlebar-controls">
          {controls}
          {onMinimize && (
            <button
              type="button"
              className={btnClass}
              onClick={onMinimize}
              aria-label="Minimize"
            >
              _
            </button>
          )}
          {onMaximize && (
            <button
              type="button"
              className={btnClass}
              onClick={onMaximize}
              aria-label="Maximize"
            >
              □
            </button>
          )}
          {onClose && (
            <button
              type="button"
              className={btnClass}
              onClick={onClose}
              aria-label="Close"
            >
              X
            </button>
          )}
        </div>
      </div>
    );
  }
);

TitleBar.displayName = "TitleBar";
