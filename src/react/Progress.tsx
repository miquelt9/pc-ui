import React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "solid" | "blocks";
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value = 0, max = 100, variant = "solid", ...props }, ref) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    const classNames = [
      "pc-progress",
      variant === "blocks" ? "pc-progress--blocks" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={classNames}
        {...props}
      >
        <div className="pc-progress-bar" style={{ width: `${percent}%` }} />
      </div>
    );
  }
);

Progress.displayName = "Progress";
