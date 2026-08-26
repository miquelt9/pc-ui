import React from "react";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className = "", label, id, children, ...props }, ref) => {
    const content = label ?? children;
    return (
      <label className={`pc-radio ${className}`.trim()}>
        <input ref={ref} type="radio" id={id} {...props} />
        {content != null && <span>{content}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
