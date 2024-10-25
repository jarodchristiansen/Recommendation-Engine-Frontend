// // // app/__tests__/Dashboard.test.tsx
// // import { render } from "@testing-library/react";
// // import Dashboard from "../dashboard/page"; // Import the Home component
// // import "@testing-library/jest-dom"; // For additional matchers

// // describe("Dashboard", () => {
// //   it("matches the snapshot of the Dashboard", () => {
// //     const { container } = render(<Dashboard />);

// //     // Create a snapshot of the rendered Dashboard
// //     expect(container).toMatchSnapshot();
// //   });
// // });

// // app/__tests__/DashboardPage.test.tsx
// import { render } from "@testing-library/react";
// import { SessionProvider } from "next-auth/react";
// import Dashboard from "../dashboard/page";
// import "@testing-library/jest-dom";

// // Mock useRouter from Next.js
// jest.mock("next/router", () => ({
//   useRouter: jest.fn(() => ({
//     route: "/dashboard",
//     push: jest.fn(),
//   })),
// }));

// // Mock useSession from next-auth
// jest.mock("next-auth/react", () => ({
//   useSession: jest.fn(() => ({
//     data: { user: { name: "Test User", email: "test@example.com" } },
//     status: "authenticated",
//   })),
// }));

// describe("Dashboard Snapshot", () => {
//   it("matches the snapshot of the Dashboard", () => {
//     const { container } = render(
//       <SessionProvider>
//         <Dashboard />
//       </SessionProvider>
//     );

//     // Create a snapshot of the rendered DashboardPage
//     expect(container).toMatchSnapshot();
//   });
// });
