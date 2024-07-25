import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage/>} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/*PROTECTED ROUTES */}
          <Route path="/:id" element={<HomePage />} />
          <Route
            path="/:id/project/:projectId"
            element={<ProjectPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
