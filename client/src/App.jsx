import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import ConnectWithUs from "./pages/ConnectWithUs";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/connect" element={<ConnectWithUs />} />
          {/* CREATE DASHBOARD FOR AUTHORIZED USER */}
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
