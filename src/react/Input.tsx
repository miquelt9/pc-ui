import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return <input ref={ref} className={`pc-input ${className}`} {...props} />;
  }
);

Input.displayName = "Input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <select ref={ref} className={`pc-select ${className}`} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", ...props }, ref) => {
    return <textarea ref={ref} className={`pc-textarea ${className}`} {...props} />;
  }
);

TextArea.displayName = "TextArea";
