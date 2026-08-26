import React from "react";

export interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-menubar ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

MenuBar.displayName = "MenuBar";

export interface MenuBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const MenuBarItem = React.forwardRef<HTMLButtonElement, MenuBarItemProps>(
  ({ className = "", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`pc-menubar-item ${className}`.trim()}
        {...props}
      />
    );
  }
);

MenuBarItem.displayName = "MenuBarItem";

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ className = "", children, role = "menu", ...props }, ref) => {
    return (
      <div ref={ref} className={`pc-menu ${className}`.trim()} role={role} {...props}>
        {children}
      </div>
    );
  }
);

Menu.displayName = "Menu";

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className = "", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        role="menuitem"
        className={`pc-menu-item ${className}`.trim()}
        {...props}
      />
    );
  }
);

MenuItem.displayName = "MenuItem";

export interface MenuSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

export const MenuSeparator = React.forwardRef<HTMLHRElement, MenuSeparatorProps>(
  ({ className = "", ...props }, ref) => {
    return <hr ref={ref} className={`pc-menu-separator ${className}`.trim()} {...props} />;
  }
);

MenuSeparator.displayName = "MenuSeparator";
