import React from "react";
import CreateProjectSkeleton from "./CreateProjectSkeleton";
import ProjectSkeleton from "./ProjectSkeleton";

const LoadingScreen = () => {
  return (
    <div className="flex flex-wrap gap-2 px-6 py-4 ">
      <ProjectSkeleton/>
      <CreateProjectSkeleton/>
    </div>
  );
};

export default LoadingScreen;
