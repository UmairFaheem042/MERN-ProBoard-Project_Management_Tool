import React, { useEffect, useState } from "react";
import { convertDatetime } from "../utils/datetime";
import { Link, useParams } from "react-router-dom";

const ProjectStrip = ({ project, setRenderApp }) => {
  const { id, projectId } = useParams();
  const [title, setTitle] = useState(project.title);
  const [editing, setEditing] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setTitle(project.title);
  }, [project]);

  async function deleteProject() {
    try {
      const response = await fetch(
        `${apiURL}/project/${projectId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      console.log("Project deleted successfully");
      setRenderApp((prev) => !prev);
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  }

  async function updateProject() {
    try {
      const response = await fetch(
        `${apiURL}/project/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
      if (!response.ok) throw new Error("Failed to update project");
      console.log("Project updated successfully");
      setRenderApp((prev) => !prev);
    } catch (error) {
      console.error("Error updating project:", error.message);
    }
  }

  return (
    <div className="flex w-full items-center justify-between gap-2 flex-wrap ">
      <div className="flex flex-1 flex-col items-start justify-start gap-2 ">
        <p className="font-normal text-sm text-[rgba(0,0,0,0.4)]">Project:</p>
        <input
          className={` text-4xl font-bold w-full outline-none rounded-md border border-white ${
            editing && "bg-[rgba(0,0,0,0.04)] border-[rgba(0,0,0,0.08)] pl-2"
          } p-0 pl-0  transition-all`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={!editing}
          rows={1}
          required
        />
        <p className="font-normal text-sm text-[rgba(0,0,0,0.4)]">
          {" "}
          Created At:{" "}
          {project.length !== 0 && convertDatetime(project.createdAt)}
        </p>
      </div>
      <div className="flex gap-2">
        {!editing ? (
          <button
            className="flex gap-2 items-center justify-center bg-black text-white min-w-[120px] h-min p-2 rounded-md"
            onClick={() => {
              setEditing(true);
            }}
          >
            <i className="ri-pencil-fill"></i>
            <span>Edit</span>
          </button>
        ) : (
          <button
            className="flex gap-2 items-center justify-center bg-black text-white min-w-[120px] h-min p-2 rounded-md"
            onClick={() => {
              setEditing(false);
              updateProject();
            }}
          >
            <i className="ri-save-2-fill"></i>
            <span>Save</span>
          </button>
        )}
        <Link to={`/${id}`}>
          <button
            className="flex gap-2 items-center justify-center bg-red-500 text-white min-w-[120px] h-min p-2 rounded-md"
            onClick={deleteProject}
          >
            <i className="ri-delete-bin-7-fill"></i>
            Delete
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectStrip;
