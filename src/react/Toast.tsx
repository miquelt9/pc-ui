import React from "react";
import { Button, ButtonProps } from "./Button";
import { TitleBar, TitleBarProps } from "./TitleBar";

export type ToastPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export interface ToastAction {
  id?: string;
  label: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
  buttonProps?: Omit<ButtonProps, "children" | "onClick" | "type" | "variant" | "disabled">;
}

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  titleBarProps?: Partial<TitleBarProps>;
  /** Auto-dismiss duration in milliseconds. Calls `onClose` when elapsed. */
  duration?: number;
  /**
   * Action buttons along the bottom of the toast.
   * Pass an array for multiple buttons, or custom nodes (e.g. `<Button>`).
   */
  actions?: React.ReactNode | ToastAction[];
}

function renderToastActions(actions: React.ReactNode | ToastAction[]) {
  if (!Array.isArray(actions)) {
    return actions;
  }

  return actions.map((action, index) => {
    const { id, label, onClick, variant, disabled, buttonProps } = action;

    return (
      <Button
        key={id ?? index}
        type="button"
        variant={variant}
        disabled={disabled}
        onClick={onClick}
        {...buttonProps}
      >
        {label}
      </Button>
    );
  });
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className = "",
      title,
      icon,
      onClose,
      titleBarProps,
      duration,
      actions,
      children,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      if (duration && duration > 0 && onClose) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const actionContent = actions ? renderToastActions(actions) : null;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={`pc-toast ${className}`.trim()}
        {...props}
      >
        {(title || icon || onClose || titleBarProps) && (
          <TitleBar
            title={title}
            icon={icon}
            onClose={onClose}
            {...titleBarProps}
          />
        )}
        <div className="pc-toast-body">{children}</div>
        {actionContent ? (
          <div className="pc-toast-actions">{actionContent}</div>
        ) : null}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export interface ToastActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Button row for toast / notification actions (use inside body or as toast footer). */
export const ToastActions = React.forwardRef<HTMLDivElement, ToastActionsProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-toast-actions ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

ToastActions.displayName = "ToastActions";

export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ToastPosition;
}

/** Fixed viewport container for desktop notifications / toasts. */
export const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className = "", position = "bottom-right", children, ...props }, ref) => {
    const classNames = [
      "pc-toast-container",
      `pc-toast-container--${position}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

ToastContainer.displayName = "ToastContainer";
