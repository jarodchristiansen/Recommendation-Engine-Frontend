// app/__tests__/AuthPage.test.tsx
import { render, act } from "@testing-library/react";
import Auth from "../auth/page";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("Auth Page", () => {
  it("matches the snapshot of the AuthPage", async () => {
    const { container } = await act(async () =>
      render(
        <SessionProvider>
          <Auth />
        </SessionProvider>
      )
    );

    expect(container).toMatchSnapshot();
  });
});
