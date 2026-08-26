import React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, children, ...props }, ref) => {
    const content = label ?? children;
    return (
      <label className={`pc-checkbox ${className}`.trim()}>
        <input ref={ref} type="checkbox" id={id} {...props} />
        {content != null && <span>{content}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
