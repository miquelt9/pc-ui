import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", invalid, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const isInvalid = Boolean(invalid || ariaInvalid === true || ariaInvalid === "true");
    const classNames = ["pc-input", isInvalid ? "pc-input--error" : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        aria-invalid={isInvalid ? true : undefined}
        className={classNames}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", invalid, "aria-invalid": ariaInvalid, children, ...props }, ref) => {
    const isInvalid = Boolean(invalid || ariaInvalid === true || ariaInvalid === "true");
    const classNames = ["pc-select", isInvalid ? "pc-select--error" : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <select
        ref={ref}
        aria-invalid={isInvalid ? true : undefined}
        className={classNames}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", invalid, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const isInvalid = Boolean(invalid || ariaInvalid === true || ariaInvalid === "true");
    const classNames = ["pc-textarea", isInvalid ? "pc-textarea--error" : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        ref={ref}
        aria-invalid={isInvalid ? true : undefined}
        className={classNames}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  error?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className = "", label, error, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-field ${className}`.trim()} {...props}>
        {label != null && <label className="pc-field-label">{label}</label>}
        {children}
        {error != null && (
          <span className="pc-field-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Field.displayName = "Field";
