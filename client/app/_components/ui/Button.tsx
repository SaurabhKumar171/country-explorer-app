import React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={`px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
    {...props}
  >
    {children}
  </button>
);
