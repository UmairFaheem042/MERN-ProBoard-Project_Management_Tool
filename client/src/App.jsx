import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(false);

  function shouldLoad() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] ">
      <BrowserRouter>
        <Header shouldLoad={shouldLoad}/>
        <Routes>
          <Route path="/" element={<LandingPage  shouldLoad={shouldLoad}/>} />

          <Route path="/signin" element={<SignIn  shouldLoad={shouldLoad}/>} />
          <Route path="/signup" element={<SignUp  shouldLoad={shouldLoad}/>} />

          {/*PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/:id" element={<HomePage />} />
            <Route path="/:id/project/:projectId" element={<ProjectPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
