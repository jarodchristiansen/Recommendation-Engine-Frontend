// pages/auth.tsx
import AuthButton from "@/components/auth/AuthButton";

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Music Recommender</h1>
      <p className="text-lg text-gray-700 mb-8">
        Sign in to get personalized recommendations.
      </p>

      {/* Spotify Auth Button */}
      <AuthButton />

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account? Signing in via Spotify will automatically
          create one.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
