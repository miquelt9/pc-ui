import React from "react";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-tabs ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className = "", children, role = "tablist", ...props }, ref) => {
    return (
      <div ref={ref} role={role} className={`pc-tab-list ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

TabList.displayName = "TabList";

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className = "", selected = false, "aria-selected": ariaSelected, type = "button", children, ...props }, ref) => {
    const isSelected = selected || ariaSelected === true || ariaSelected === "true";
    const classNames = [
      "pc-tab",
      isSelected ? "active" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        role="tab"
        aria-selected={isSelected}
        className={classNames}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Tab.displayName = "Tab";

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className = "", children, role = "tabpanel", ...props }, ref) => {
    return (
      <div ref={ref} role={role} className={`pc-tab-panel ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

TabPanel.displayName = "TabPanel";
