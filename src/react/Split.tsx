import React from "react";

export interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `row` = side-by-side (i3 horizontal), `col` = stacked (i3 vertical). */
  direction?: "row" | "col";
  /** Flex grow factor for this split within its parent (`--pc-tile-grow`). */
  grow?: number;
}

/** Nested horizontal/vertical split for i3-style tiling. */
export const Split = React.forwardRef<HTMLDivElement, SplitProps>(
  ({ className = "", direction = "row", grow, children, style, ...props }, ref) => {
    const classNames = ["pc-split", `pc-split--${direction}`, className]
      .filter(Boolean)
      .join(" ");

    const mergedStyle =
      grow !== undefined
        ? ({ ...style, ["--pc-tile-grow" as string]: String(grow) } as React.CSSProperties)
        : style;

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...props}>
        {children}
      </div>
    );
  }
);

Split.displayName = "Split";
