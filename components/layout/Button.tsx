import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
}) => {
  // Conditional classes for different button styles
  const buttonClasses = classNames(
    "transition-transform transform hover:scale-105 shadow-lg rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", // Base styles
    {
      // Variants (color themes)
      "bg-blue-600 hover:bg-blue-700 text-white": variant === "primary",
      "bg-gray-500 hover:bg-gray-600 text-white": variant === "secondary",
      "bg-blue-800 hover:bg-blue-800 text-white": variant === "dark",
      "bg-red-500 hover:bg-red-600 text-white": variant === "danger",

      // Sizes
      "px-8 py-4 text-lg": size === "large",
      "px-6 py-3 text-md": size === "medium",
      "px-4 py-2 text-sm": size === "small",

      // Disabled state
      "opacity-50 cursor-not-allowed": disabled || isLoading,
    }
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="loader">
          <span className="inline-block h-5 w-5 border-4 border-t-transparent border-white rounded-full animate-spin"></span>
        </span> // Simple loading spinner placeholder
      ) : (
        children
      )}
    </button>
  );
};

// Adding PropTypes for validation and better development experience
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
