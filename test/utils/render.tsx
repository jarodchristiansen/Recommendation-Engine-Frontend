import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

type CustomRenderOptions = RenderOptions & {
  session?: Session | null;
};

function AllTheProviders({
  children,
  session = null,
}: {
  children: ReactNode;
  session?: Session | null;
}) {
  return <SessionProvider session={session ?? undefined}>{children}</SessionProvider>;
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
