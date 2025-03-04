import React from "react";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div>
      <div className="backgroundChatting">
        <nav className="flex justify-between items-center pt-5 px-36">
          <h2 className="titleHeading text-xl font-medium text-white">
            Powered by{" "}
            <span className="titleHeadingReact text-blue-400 bg-white rounded-4xl py-2 px-4">
              REACT JS
            </span>
          </h2>
          <ul className="flex justify-center items-center gap-7 text-xl">
            <Link to={"/home"} className="navItem">
              Home
            </Link>
            <Link to={"/about"} className="navItem">
              About
            </Link>
            <Link to={"/contact"} className="navItem">
              Contact
            </Link>
          </ul>
          <div>
            <Link to={'/registration'}>
              <button className="bg-white py-2 px-4 rounded-4xl cursor-pointer font-medium duration-300 hover:bg-black hover:text-white">
                Sign Up
              </button>
            </Link>
            <Link to={"/login"}>
              <button className="py-2 px-4 rounded-4xl cursor-pointer font-medium text-white">
                Log In
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Landing;
