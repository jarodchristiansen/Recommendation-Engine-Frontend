# 🎵 SpotRec: Spotify-Based Recommendation Interface

This is the frontend for **SpotRec**, a **Next.js v13** application that provides an intuitive interface for exploring music recommendations based on Spotify tracks. It allows users to sign in using their Spotify account, search for songs, and receive personalized recommendations with explainable insights.

The app integrates **Redis** for caching, **recharts** for visualizing recommendations, and **next-auth** for Spotify authentication, ensuring a seamless and efficient user experience.

## 🌟 Features

- **Spotify Authentication with Next-Auth**: Securely log in using your Spotify account to access personalized recommendations and top tracks.
- **Track Search and Recommendation**: Search for songs or select from your top tracks to generate music recommendations based on song features.
- **Redis Caching**: Caches song search results and recommendation responses for faster retrieval and improved user experience.
- **Explainable Recommendations**: Uses **Recharts** to visualize why certain songs were recommended, highlighting differences in key audio features.
- **Dynamic UI**: Built with responsive and dynamic design principles using **Tailwind CSS**, ensuring a smooth experience across devices.
- **Deployed on Vercel**: Quick, reliable, and scalable deployment using Vercel's platform, with global edge functions for low-latency user experiences.

## 🎯 Purpose & Learning Goals

This frontend application was developed to complement the backend recommendation engine by offering users a visually appealing interface for exploring their music tastes. The project provided an opportunity to:

1. **Deepen Knowledge of Next.js** and its modern capabilities like server components, API routes, and ISR (Incremental Static Regeneration).
2. **Integrate Authentication Flows** with **Next-Auth**, focusing on seamless user experiences.
3. **Improve UX through Visualization**: Using **Recharts** for recommendation explainability, ensuring users understand the factors behind each recommendation.
4. **Optimize Performance** using **Redis** for caching data, and utilizing Vercel's capabilities for deployment, ensuring a balance between speed and cost efficiency.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16 or higher recommended.
- **Spotify Developer Account**: Create an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) to get your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.
- **Redis**: Set up a Redis instance using platforms like [Upstash](https://upstash.com/) or [Redis Cloud](https://redis.com/).

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/spotrec-frontend.git
   cd spotrec-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your credentials:

   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REDIS_URL=your_redis_connection_string
   ```

4. Run the Next.js development server:

   ```bash
   npm run dev
   ```

5. Access the app at:
   ```
   http://localhost:3000
   ```

### Deployment

Deploy the app seamlessly on **Vercel**:

- Click the **"Deploy to Vercel"** button below:

  [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/your-username/spotrec-frontend)

- Ensure environment variables are configured in Vercel's dashboard.

## 🧠 How It Works

### 1. Spotify Integration

- Uses **Next-Auth** for secure OAuth authentication with Spotify, allowing users to log in and access their top tracks and playlists.
- Fetches track data from the backend recommendation service and Spotify API, providing detailed song metadata.

### 2. Redis Caching

- **Caching**: Caches frequently searched tracks and recommendation responses using **Redis**, reducing the number of API calls and improving response times.
- **Data Expiry**: Cached data is set to expire periodically, ensuring fresh recommendations while maintaining a smooth user experience.

### 3. Visualization with Recharts

- Displays **spider charts** and **bar graphs** for each recommended track, comparing attributes like danceability, energy, and more.
- **Explainability Focused**: Shows how recommended tracks differ from the selected track, offering a transparent recommendation process.
- **Dynamic Data Display**: Uses reusable components like `DynamicDataDisplay` to ensure consistency in displaying track data and recommendations.

## 🛠️ Technologies & Tools

- **Next.js 13**: Modern framework for building fast and dynamic web applications.
- **React & Tailwind CSS**: For crafting responsive and visually appealing UIs.
- **Next-Auth**: Seamlessly integrates Spotify OAuth for user authentication.
- **Recharts**: Renders data visualizations for recommendation explainability.
- **Redis**: Enhances performance with efficient caching mechanisms.
- **Vercel**: Deploys the frontend with global edge caching for low-latency experiences.

## 🧪 Testing & Best Practices

### Unit Testing with Jest and React Testing Library

- **Jest**: Configured for testing React components and API routes.
- **React Testing Library**: Tests component behavior and user interactions.
- Run all tests:
  ```bash
  npm run test
  ```
- View test coverage:
  ```bash
  npm run test:coverage
  ```

### Linting & Formatting

- **ESLint** and **Prettier** are configured to maintain code quality.
- To run linting:
  ```bash
  npm run lint
  ```
- To format code:
  ```bash
  npm run format
  ```

## 📈 Future Improvements

- **Enhanced NLP**: Integrate sentiment analysis of lyrics to refine recommendations based on song mood and themes.
- **User Feedback Mechanism**: Allow users to upvote/downvote recommendations to personalize their experience further.
- **Progressive Web App (PWA)**: Make the application installable and offline-friendly.

## 🌐 Live Demo

- **Frontend**: [https://spotrec.vercel.app](https://spotrec.vercel.app)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
