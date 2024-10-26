"use client";

import Lottie from "lottie-react";
import animationData from "@/public/lottie/forward-spiral.json";

export default function LottieContainer() {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-black">
      <Lottie
        animationData={animationData}
        className="flex justify-center items-center"
        loop={true}
      />
    </div>
  );
}
