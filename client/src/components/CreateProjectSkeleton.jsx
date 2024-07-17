import React from "react";

const CreateProjectSkeleton = () => {
  return (
    <div className="min-w-[250px] flex-1 bg-white border border-[rgba(0,0,0,0.1)] p-4 rounded-lg flex flex-col justify-center gap-4 h-[150px] w-[300px]">
      <div className="h-10 rounded w-full bg-[rgba(0,0,0,0.08)]"></div>
      {/* <div className="h-7 rounded w-[50%] bg-[rgba(0,0,0,0.08)]"></div> */}
      <div className=" w-full flex items-center justify-center">
        <div className="h-12 w-12 rounded-[50%] bg-[rgba(0,0,0,0.08)]"></div>
      </div>
    </div>
  );
};

export default CreateProjectSkeleton;
