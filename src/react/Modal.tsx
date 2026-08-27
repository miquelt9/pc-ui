import React from "react";
import { Button, ButtonProps } from "./Button";
import { Overlay, OverlayProps } from "./Overlay";
import { Window, WindowProps } from "./Window";

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** When false, nothing is rendered. Consumers control visibility. */
  open?: boolean;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  /** Visual emphasis for privileged or dangerous confirmations. */
  variant?: "default" | "warning" | "danger";
  /** Primary action label (default: OK). */
  confirmLabel?: React.ReactNode;
  /** Secondary action label (default: Cancel). */
  cancelLabel?: React.ReactNode;
  /** Hide the cancel button. */
  hideCancel?: boolean;
  /** Disable the confirm button. */
  confirmDisabled?: boolean;
  /** Show busy state on the confirm button. */
  confirmBusy?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Close when the backdrop is clicked. */
  closeOnBackdrop?: boolean;
  /** Close when Escape is pressed. */
  closeOnEscape?: boolean;
  /** Accessible name when `title` is omitted. */
  "aria-label"?: string;
  /** Accessible description for the dialog body. */
  "aria-describedby"?: string;
  overlayProps?: Omit<OverlayProps, "children">;
  windowProps?: Omit<WindowProps, "children" | "title" | "icon" | "onClose">;
  confirmButtonProps?: Omit<ButtonProps, "children" | "onClick" | "type">;
  cancelButtonProps?: Omit<ButtonProps, "children" | "onClick" | "type">;
}

/** Centered modal dialog over a dimmed backdrop; for confirmations and privileged actions. */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className = "",
      open = true,
      title,
      icon,
      variant = "default",
      confirmLabel = "OK",
      cancelLabel = "Cancel",
      hideCancel = false,
      confirmDisabled = false,
      confirmBusy = false,
      onConfirm,
      onCancel,
      closeOnBackdrop = true,
      closeOnEscape = true,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      overlayProps,
      windowProps,
      confirmButtonProps,
      cancelButtonProps,
      children,
      ...props
    },
    ref
  ) => {
    const {
      className: overlayClassName = "",
      onClick: onOverlayClick,
      ...restOverlayProps
    } = overlayProps ?? {};

    const {
      className: windowClassName = "",
      contentVariant = "default",
      ...restWindowProps
    } = windowProps ?? {};

    const {
      className: confirmClassName = "",
      variant: confirmVariant = "primary",
      ...restConfirmButtonProps
    } = confirmButtonProps ?? {};

    const {
      className: cancelClassName = "",
      ...restCancelButtonProps
    } = cancelButtonProps ?? {};

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onOverlayClick?.(event);
      if (!closeOnBackdrop || event.defaultPrevented) return;
      if (event.target === event.currentTarget) {
        onCancel?.();
      }
    };

    React.useEffect(() => {
      if (!open || !closeOnEscape || !onCancel) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onCancel();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, closeOnEscape, onCancel]);

    if (!open) return null;

    const windowClassNames = [
      "pc-window--modal",
      variant !== "default" ? `pc-window--modal-${variant}` : "",
      windowClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const showActions = onConfirm || onCancel || !hideCancel;

    return (
      <Overlay
        className={`pc-overlay--modal ${overlayClassName}`.trim()}
        onClick={handleBackdropClick}
        {...restOverlayProps}
      >
        <Window
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={title == null ? ariaLabel : undefined}
          aria-describedby={ariaDescribedBy}
          title={title}
          icon={variant === "default" ? icon : undefined}
          onClose={onCancel}
          className={windowClassNames}
          contentVariant={contentVariant}
          {...restWindowProps}
          {...props}
        >
          {variant !== "default" && (
            <div
              className={`pc-modal-icon pc-modal-icon--${variant}`}
              aria-hidden="true"
            >
              {icon ?? (variant === "danger" ? "⚠" : "!")}
            </div>
          )}
          <div className="pc-modal-body">{children}</div>
          {showActions && (
            <div className="pc-modal-actions">
              {onConfirm && (
                <Button
                  type="button"
                  variant={confirmVariant}
                  className={confirmClassName}
                  disabled={confirmDisabled}
                  aria-busy={confirmBusy || undefined}
                  onClick={onConfirm}
                  {...restConfirmButtonProps}
                >
                  {confirmLabel}
                </Button>
              )}
              {!hideCancel && onCancel && (
                <Button
                  type="button"
                  className={cancelClassName}
                  onClick={onCancel}
                  {...restCancelButtonProps}
                >
                  {cancelLabel}
                </Button>
              )}
            </div>
          )}
        </Window>
      </Overlay>
    );
  }
);

Modal.displayName = "Modal";
