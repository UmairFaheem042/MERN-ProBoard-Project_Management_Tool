import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = ({ shouldLoad }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  function handleButtonClick(path) {
    shouldLoad();
    navigate(path);
  }

  return (
    <div className="px-6 py-4 min-h-[90vh] flex flex-col items-center justify-center">
      <div className="max-w-[700px] w-full mx-auto flex flex-col gap-6 items-center text-center">
        <h1 className="heroText text-4xl font-medium leading-tight">
          Visualize and manage your projects effortlessly with <b>ProBoard</b>
        </h1>
        <p className="heroSubText w-[70%] text-[rgba(0,0,0,0.6)] text-sm font-medium leading-normal">
          Take control of your project timeline with ProBoard offering a clear,
          intuitive interface for efficient project management.
        </p>
        <div className="flex gap-2">
          {token ? (
            // <Link to={`/${userId}`}>
            <button
              className="bg-black text-white text-[0.9rem] px-3 py-2 rounded min-w-[100px]"
              onClick={() => handleButtonClick(`/${userId}`)}
            >
              My Projects
            </button>
          ) : (
            // </Link>
            // <Link to={"/signup"}>
            <button
              className="bg-black text-white text-[0.9rem] px-3 py-2 rounded min-w-[100px]"
              onClick={() => handleButtonClick(`/signup`)}
            >
              Get Started
            </button>
            // </Link>
          )}
          <Link to={"mailto:umairfaheem042@gmail.com"}>
            <button className="bg-white border text-[0.9rem] px-3 py-2 rounded min-w-[100px]">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
