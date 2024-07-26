import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ shouldLoad }) => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let errorMsg;

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      errorMsg = data.message;

      if (!response.ok) {
        throw new Error("Failed to register User");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);

      shouldLoad();

      setEmail("");
      setPassword("");
      navigate(`/${data.user._id}`);
    } catch (error) {
      console.log(errorMsg);
      console.log("inside catch block");
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const styles = {
    input:
      "text-[0.9rem] w-full px-2 py-2 rounded bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.1)] outline-none",
  };

  return (
    <div className="h-[90vh] flex flex-col md:flex-row">
      <div className="md:block hidden h-full flex-1 w-full bg-emerald-500"></div>
      <div className="flex flex-col items-center justify-center gap-4 flex-1 px-6 py-2">
        <h1 className="text-2xl font-semibold text-center">Welcome Back!</h1>
        <form
          className=" max-w-[400px] w-full flex items-center justify-center flex-col gap-3"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="text-[0.9rem] bg-emerald-500 w-full rounded p-2 font-medium">
            Sign In
          </button>
          <p className="text-center text-[0.9rem] text-[rgba(0,0,0,0.4)] font-semibold">
            Don't Have an account yet?{" "}
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={() => {
                shouldLoad();
                navigate("/signup");
              }}
            >
              Register here
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
