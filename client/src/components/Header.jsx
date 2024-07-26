import React from "react";
import { Link } from "react-router-dom";

const Header = ({ shouldLoad }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    shouldLoad();
  }

  return (
    <header className="bg-white border-b">
      <nav className="px-6 py-4 flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex gap-3 items-center" onClick={shouldLoad}>
            <i className="ri-equal-fill bg-[#F3F4F6] px-2 py-1 rounded font-black text-2xl"></i>
            <span className="md:block hidden font-[600] text-xl">ProBoard</span>
            <span className="md:hidden font-[600] text-xl">PB</span>
          </div>
        </Link>
        <div className="flex gap-2">
          {token && (
            <Link to={`/${userId}`}>
              {/* <i className="ri-logout-box-r-line text-lg cursor-pointer"></i> */}
              <button
                className="bg-black text-white text-[0.9rem] px-3 py-2 rounded"
                onClick={() => shouldLoad()}
              >
                My Projects
              </button>
            </Link>
          )}
          {token ? (
            <>
              <button
                className="bg-black text-white text-[0.9rem] px-3 py-2 rounded"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link to={"/signin"}>
              {/* <i className="ri-logout-box-r-line text-lg cursor-pointer"></i> */}
              <button
                className="bg-black text-white text-[0.9rem] px-3 py-2 rounded"
                onClick={() => shouldLoad()}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
