"use client";

// pages/auth.tsx
import AuthButton from "@/components/auth/AuthButton";

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 via-black to-gray-900 text-gray-100 p-6 gap-4">
      <h1 className="text-5xl font-bold mb-6 tracking-wider text-center">
        Get in Tune with SpotRec
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        Unlock personalized recommendations based on your favorite artists,
        albums, and listening habits.
      </p>

      <div>
        {/* Spotify Auth Button */}
        <AuthButton />
      </div>

      <div className="mt-4 max-w-md text-center">
        <p className="text-sm text-gray-500 font-bold">
          No Spotify account? No worries! Signing in will guide you through a
          quick setup.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
