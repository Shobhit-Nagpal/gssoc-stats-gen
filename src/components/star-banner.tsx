"use client";

import StarRepoButton from "./star-repo-button";

const StarBanner = () => {
  return (
    <>
      <div
        className={`w-full left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out`}
      >
        <div className="flex w-full items-center justify-center gap-x-6 bg-orange-500 px-6 py-3 sm:px-3.5">
          <div className="flex flex-col md:flex-row gap-y-4 items-center gap-x-4 text-sm font-medium leading-6 text-white">
            <p className="font-bold md:text-lg text-center">
              Generate your GSSoC certificate and support us with a star!
            </p>
            <StarRepoButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default StarBanner;
