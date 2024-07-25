import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let errorMsg;
  const apiURL = import.meta.env.VITE_API_URL;

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.table(name, email);
    try {
      const response = await fetch(`${apiURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      errorMsg = data.message;
      console.log(data);
      if (!response.ok) {
        throw new Error("Failed to register User");
      }

      navigate("/signin");

    } catch (error) {
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
    setName("");
    setEmail("");
    setPassword("");
  }

  const styles = {
    input:
      "text-[0.9rem] w-full px-2 py-2 rounded bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.1)] outline-none",
  };

  return (
    <div className="h-[90vh] flex flex-col md:flex-row">
      <div className="md:block hidden h-full flex-1 w-full bg-emerald-500"></div>
      <div className="flex flex-col items-center justify-center gap-4 flex-1 px-6 py-2">
        <h1 className="text-2xl font-semibold text-center">
          Register at ProBoard
        </h1>
        <form
          className=" max-w-[400px] w-full flex items-center justify-center flex-col gap-3"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Create Account
          </button>
          <p className="text-center text-[0.9rem] text-[rgba(0,0,0,0.4)] font-semibold">
            Already Have an account?{" "}
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In here
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
