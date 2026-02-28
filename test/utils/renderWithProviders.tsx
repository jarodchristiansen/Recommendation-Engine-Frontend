import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

type RenderOptions = {
  session?: any;
};

export function renderWithProviders(
  ui: ReactElement,
  { session = null }: RenderOptions = {},
) {
  return render(<SessionProvider session={session}>{ui}</SessionProvider>);
}
