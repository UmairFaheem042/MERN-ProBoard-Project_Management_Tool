import React, { useState } from "react";

const ConnectWithUs = () => {


  const styles = {
    input:
      "text-[0.9rem] w-full px-2 py-2 rounded bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.1)] outline-none",
  };
  const [loginScreen, setLoginScreen] = useState(true);
  return (
    <div className="h-[90vh] flex flex-col md:flex-row">
      <div className="md:block hidden h-full flex-1 w-full bg-emerald-500"></div>
      <div className="flex flex-col items-center justify-center gap-4 flex-1 px-6 py-2">
        <h1 className="text-2xl font-semibold text-center">
          {loginScreen ? "Welcome Back!" : "Register at ProBoard"}
        </h1>
        <form className=" max-w-[400px] w-full flex items-center justify-center flex-col gap-3">
          {!loginScreen && (
            <input
              type="text"
              placeholder="Enter your name"
              className={styles.input}
              required
            />
          )}
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className={styles.input}
            required
          />
          <button className="text-[0.9rem] bg-emerald-500 w-full rounded p-2 font-medium">
            {loginScreen ? "Sign In" : "Create Account"}
          </button>
          <p className="text-center text-[0.9rem] text-[rgba(0,0,0,0.4)] font-semibold">
            {loginScreen ? (
              <>
                Don't Have an account yet?{" "}
                <span
                  className="text-emerald-500 cursor-pointer"
                  onClick={() => setLoginScreen((prev) => !prev)}
                >
                  Register here
                </span>
              </>
            ) : (
              <>
                Already Have an account?{" "}
                <span
                  className="text-emerald-500 cursor-pointer"
                  onClick={() => setLoginScreen((prev) => !prev)}
                >
                  Sign In here
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ConnectWithUs;
