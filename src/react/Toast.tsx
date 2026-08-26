import React from "react";
import { TitleBar, TitleBarProps } from "./TitleBar";

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  titleBarProps?: Partial<TitleBarProps>;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className = "", title, icon, onClose, titleBarProps, children, ...props }, ref) => {
    return (
      <div ref={ref} role="status" aria-live="polite" className={`pc-toast ${className}`.trim()} {...props}>
        {(title || icon || onClose || titleBarProps) && (
          <TitleBar
            title={title}
            icon={icon}
            onClose={onClose}
            {...titleBarProps}
          />
        )}
        <div className="pc-toast-body">{children}</div>
      </div>
    );
  }
);

Toast.displayName = "Toast";
