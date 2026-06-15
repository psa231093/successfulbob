"use client";

import Lottie from "lottie-react";
import animationData from "@/public/problem-animation.json";

export default function ProblemIllustration() {
  return (
    <div className="w-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-full max-w-[480px]"
      />
    </div>
  );
}
