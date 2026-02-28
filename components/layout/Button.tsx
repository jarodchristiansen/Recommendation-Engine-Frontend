import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger" | "dark" | "accent" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  /** When set, render as a link with the same visual style as the button (for navigation). */
  href?: string;
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
  className,
  href,
}: ButtonProps) => {
  const buttonClasses = classNames(
    "inline-flex items-center justify-center transition-transform transform shadow-lg rounded-full font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent",
    "hover:scale-[1.02]",
    {
      "hover:scale-105": variant === "accent" || variant === "primary" || variant === "danger",
      // Variants (design tokens)
      "bg-primary hover:bg-primary/90 text-primary-foreground": variant === "primary",
      "bg-secondary hover:bg-slate-200 text-primary border border-slate-300": variant === "secondary",
      "bg-accent hover:bg-accent-hover text-white": variant === "accent" || variant === "success",
      "bg-primary text-primary-foreground hover:opacity-90": variant === "dark",
      "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground": variant === "outline",

      // Sizes
      "px-8 py-4 text-lg": size === "large",
      "px-6 py-3 text-base min-h-[44px]": size === "medium",
      "px-4 py-2 text-sm": size === "small",

      // Disabled state
      "opacity-50 cursor-not-allowed pointer-events-none": (disabled || isLoading) && !href,
    },
    className
  );

  if (href && !disabled && !isLoading) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="loader" aria-hidden>
          <span className="inline-block h-5 w-5 border-4 border-t-transparent border-current rounded-full animate-spin opacity-90" />
        </span>
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
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger", "accent", "outline", "dark"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
};

export default Button;
