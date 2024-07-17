import React from "react";
import { convertDatetime } from "../utils/datetime";
import { Link } from "react-router-dom";

const Project = ({ data }) => {
  return (
    <Link to={`/project/${data._id}`}>
      <div className="relative bg-white border border-[rgba(0,0,0,0.1)] py-4 px-6 rounded-lg flex flex-col justify-center  h-[150px]">
        <div className="flex flex-col flex-1">
          <h2 className="font-bold text-lg">{data.title}</h2>
          <p className="font-normal text-sm text-[rgba(0,0,0,0.4)]">
            {convertDatetime(data.createdAt)}
          </p>
        </div>
        <span className="block mt-4 text-red-500 font-semibold text-sm">
          Task Count: {data.tasks.length}
        </span>
      </div>
    </Link>
  );
};

export default Project;
