//DefaultMessageScreen.jsx
import React from "react";

const DefaultMessageScreen = () => {
  return (
    <div className="h-fit flex items-center justify-center p-4">
      {/* Centered card-like element with vibrant gradient and rounded corners */}
      <div
        className="
        bg-gradient-to-br from-purple-600 via-pink-500 to-red-200
        p-8 md:p-12 lg:p-16
        rounded-3xl shadow-2xl
        text-white text-center
        max-w-md w-full
        transform hover:scale-105 transition-transform duration-300 ease-in-out
        flex flex-col items-center justify-center
      "
      >
        {/* Large, bold title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Select User To message
        </h1>
        {/* Subtitle or descriptive text */}
        <p className="text-lg md:text-xl lg:text-2xl mb-6 font-light opacity-90">
          Connect with your Friends and Family.
        </p>
        {/* Call to action button */}
       
      </div>
    </div>
  );
};

export default DefaultMessageScreen;
