import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 via-violet-800 to-fuchsia-900 overflow-hidden min-h-[calc(100vh-100px)] sm:min-h-screen flex flex-col justify-center">
      {/* Background decoration */}
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
        <div className="relative h-full max-w-7xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-purple-700"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
        </div>
      </div>

      <div className="relative -mt-[100px] sm:pt-6 pb-16 sm:pb-24">
        <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center space-y-12">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block animate-fade-in-up">
                AI-Powered Loan Solutions
              </span>
              <span className="block text-purple-200 animate-fade-in-up-delay">
                Fast & Transparent Approval
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-purple-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-fade-in-up-delay-2">
              Get instant loan decisions powered by advanced AI technology.
              Transparent evaluation, flexible payment plans, and competitive rates
              for all your financial needs.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 animate-fade-in-up-delay-3">
              <div className="rounded-md shadow">
                <a
                  onClick={() => {
                    document.getElementById("application-form").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="w-full cursor-pointer flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-300"
                >
                  Apply Now
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  onClick={() => {
                    document.getElementById("how-it-works").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="w-full cursor-pointer flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-300"
                >
                  How It Works
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-32 -mt-[100px]">
        <svg
          className="waves w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          style={{ height: "500px" }}
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="wave-parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              className="wave wave-1"
              fill="rgba(255,255,255,0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              className="wave wave-2"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              className="wave wave-3"
              fill="rgba(255,255,255,0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              className="wave wave-4"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
