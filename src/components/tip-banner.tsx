"use client";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

const TipBanner = () => {
  return (
    <div className="w-full left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="flex w-full items-center justify-center gap-x-6 bg-orange-500 px-6 py-3 sm:px-3.5">
        <div className="flex flex-col sm:flex-row gap-y-4 items-center gap-x-4 text-sm font-medium leading-6 text-white">
          <div className="flex items-center gap-2">
            <p className="font-bold md:text-lg text-center">
              Feel free to support this project :)
            </p>
          </div>
          <Button
            onClick={() =>
              window.open(
                "https://razorpay.me/@shobhitnagpal?amount=bMZtQmLjQWplBAmd%2FyQdEA%3D%3D",
                "_blank",
              )
            }
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
          >
            Support
            <Heart className="h-5 w-5 ml-2 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TipBanner;
