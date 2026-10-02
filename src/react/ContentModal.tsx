import React, { useEffect } from "react";
import { Overlay } from "./Overlay";
import { Window } from "./Window";

export interface ContentModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** When false, nothing is rendered. Consumers control visibility. */
  open?: boolean;
  title: React.ReactNode;
  onClose: () => void;
  icon?: React.ReactNode;
  /** Close when the backdrop is clicked. */
  closeOnBackdrop?: boolean;
  /** Close when Escape is pressed. */
  closeOnEscape?: boolean;
  /** Extra classes on the backdrop, after the print-hide class. */
  overlayClassName?: string;
}

/**
 * Free-form dialog: dimmed backdrop, window chrome, and arbitrary body content.
 * Confirmation dialogs stay on `Modal`.
 */
export const ContentModal = React.forwardRef<HTMLDivElement, ContentModalProps>(
  (
    {
      className = "",
      open = true,
      title,
      onClose,
      icon,
      closeOnBackdrop = true,
      closeOnEscape = true,
      overlayClassName = "",
      onClick,
      role,
      children,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        onClose();
      };

      window.addEventListener("keydown", onKeyDown, true);
      return () => window.removeEventListener("keydown", onKeyDown, true);
    }, [open, closeOnEscape, onClose]);

    if (!open) return null;

    return (
      <Overlay
        className={["pc-overlay--print-hidden", overlayClassName].filter(Boolean).join(" ")}
        onClick={closeOnBackdrop ? onClose : undefined}
      >
        <Window
          ref={ref}
          title={title}
          icon={icon}
          onClose={onClose}
          className={["pc-window--freeform", className].filter(Boolean).join(" ")}
          {...props}
          role={role ?? "dialog"}
          aria-modal="true"
          aria-label={typeof title === "string" ? title : undefined}
          onClick={(event) => {
            event.stopPropagation();
            onClick?.(event);
          }}
        >
          {children}
        </Window>
      </Overlay>
    );
  },
);

ContentModal.displayName = "ContentModal";
