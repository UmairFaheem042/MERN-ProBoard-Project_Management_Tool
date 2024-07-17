import React, { useState } from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <Hero setIsLoading={setIsLoading} />
      <Projects setIsLoading={setIsLoading} isLoading={isLoading} />
    </>
  );
};

export default HomePage;
