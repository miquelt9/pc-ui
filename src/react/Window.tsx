import React from "react";
import { TitleBar, TitleBarProps } from "./TitleBar";

export interface WindowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "dark";
  contentVariant?: "default" | "plain";
  /** Fill parent workspace/split cell. */
  fill?: boolean;
  /** Flex grow factor when tiled (`--pc-tile-grow`). */
  grow?: number;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  titleBarProps?: Partial<TitleBarProps>;
}

export const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      className = "",
      title,
      icon,
      variant = "default",
      contentVariant = "default",
      fill = false,
      grow,
      onMinimize,
      onMaximize,
      onClose,
      titleBarProps,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      "pc-window",
      variant === "dark" ? "pc-window--dark" : "",
      fill ? "pc-window--fill" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const mergedStyle =
      grow !== undefined
        ? ({ ...style, ["--pc-tile-grow" as string]: String(grow) } as React.CSSProperties)
        : style;

    const contentClassNames = [
      "pc-window-content",
      contentVariant === "plain" ? "pc-window-content--plain" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...props}>
        {(title || icon || onClose || onMinimize || onMaximize || titleBarProps) && (
          <TitleBar
            title={title}
            icon={icon}
            variant={variant}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
            {...titleBarProps}
          />
        )}
        <div className={contentClassNames}>{children}</div>
      </div>
    );
  }
);

Window.displayName = "Window";
