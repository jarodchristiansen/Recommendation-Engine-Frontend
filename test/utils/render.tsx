import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

type CustomRenderOptions = RenderOptions & {
  session?: unknown;
};

function AllTheProviders({
  children,
  session = null,
}: {
  children: ReactNode;
  session?: unknown;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export function renderWithProviders(
  ui: ReactElement,
  { session = null, ...renderOptions }: CustomRenderOptions = {},
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders session={session}>{children}</AllTheProviders>
  );
  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

export * from "@testing-library/react";
