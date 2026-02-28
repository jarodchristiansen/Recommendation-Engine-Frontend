# Book Rec: Book Recommendation Interface

This is the frontend for **Book Rec**, a **Next.js** application that helps you discover your next read. Pick a book you love and get similar recommendations based on subjects, authors, and metadata from **Open Library**, with short explanations for why each book was suggested.

The app uses a **book-first** design (calm, focused, trustworthy), **Redis** for caching where configured, and supports optional sign-in (coming soon) for saving your reading list across devices.

## Features

- **Book search and recommendations**: Search by title or author, pick a book, and see similar books with explainable “why similar” notes (themes, era, reception).
- **One book at a time**: Focused flow—choose a book you like, then see recommendations. No account required for the core experience.
- **Your reading**: Recently used books appear on your dashboard so you can find similar titles again quickly (stored locally; account-based save coming soon).
- **Responsive UI**: Built with **Tailwind CSS** and a consistent design system for a clear experience on all devices.
- **Deployable on Vercel**: Ready for deployment with environment variables for API and optional auth.

## Purpose

Book Rec was built to offer a simple, transparent way to discover books: start from a title you love, get suggestions that share similar themes and scope, and see why each recommendation was chosen. The project also served as a migration from an earlier Spotify-based recommender; architecture and migration notes live in the **recommendation-server** repository (`MIGRATION_AND_ARCHITECTURE.md`).

## Getting Started

### Prerequisites

- **Node.js**: v16 or higher recommended.
- **Backend**: The recommendation API (see **recommendation-server** repo) for search and recommendations.
- **Redis** (optional): For caching; see recommendation-server and env docs.

### Local setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file with any required variables (e.g. `NEXTAUTH_URL`, `NEXTAUTH_SECRET` if using auth later; API base URL if different from default).

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

### Deployment

Deploy on **Vercel** (or similar) and set environment variables in the dashboard. The app uses Next.js App Router and static-friendly routes where applicable.

## How it works

- **Landing**: Clear value proposition—“Discover your next read”—with a single primary path to recommendations.
- **Recommendations flow**: Search for a book → select one → see similar books with short explanations and optional “find similar to another book” or “back to dashboard.”
- **Dashboard**: Hub for “Discover books,” search, and “Your reading” (recent seeds). Links through to the recommendations page.
- **Auth**: Sign-in to save your list across devices is planned; the auth page is available with a “coming soon” message. You can use all discovery features without signing in.

## Tech stack

- **Next.js** (App Router)
- **React** and **Tailwind CSS**
- **Next-Auth** (optional; providers to be added for book app)
- **Redis** (optional, for caching via backend/config)

## Testing and quality

- **Jest** and **React Testing Library** for unit and component tests.
- **ESLint** for linting.

```bash
npm run test
npm run test:coverage
npm run lint
```

## Architecture and migration

Application flows, API integration, and the migration from the previous Spotify-based recommender are documented in the **recommendation-server** repository: see `MIGRATION_AND_ARCHITECTURE.md` in that repo’s root.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
