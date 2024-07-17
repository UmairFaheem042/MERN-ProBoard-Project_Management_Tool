import React from "react";

const CreateProjectSkeleton = () => {
  return (
    <div className="min-w-[250px] flex-1 flex flex-col bg-white border border-[rgba(0,0,0,0.1)] p-4 rounded-lg gap-4 h-[150px]">
      <div className="h-10 rounded w-full bg-[rgba(0,0,0,0.08)]"></div>
      <div className="h-7 rounded w-[50%] bg-[rgba(0,0,0,0.08)]"></div>
      <div className=" w-full">
        <div className="h-6 rounded w-[70%] bg-[rgba(0,0,0,0.08)]"></div>
      </div>
    </div>
  );
};

export default CreateProjectSkeleton;
