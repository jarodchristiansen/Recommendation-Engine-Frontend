type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "main" | "section";
};

/** Shared page content width and horizontal padding. Use for dashboard, recommendations, and landing content. */
export default function PageContainer({
  children,
  className = "",
  as: Component = "div",
}: PageContainerProps) {
  return (
    <Component
      className={`max-w-content mx-auto px-4 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
