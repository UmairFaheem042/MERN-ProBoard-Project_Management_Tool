import React, { useState } from "react";

const CreateProject = ({ setRenderApp }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  async function addProject(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Failed to add project");
      }
      const data = await response.json();
      setRenderApp((prev) => !prev);
      console.log("New project added:", data);
      setIsCreating(false);
      setTitle("");
    } catch (error) {
      console.error("Error adding project:", error.message);
      // Pop up box when error appears
    }
  }
  return (
    <>
      <div className="bg-white border border-[rgba(0,0,0,0.1)] p-4 rounded-lg flex justify-center flex-col items-center gap-4 h-[150px]">
        <h2 className="font-bold text-lg">Add a new project</h2>
        {!isCreating && (
          <i
            className="ri-add-large-line bg-black text-white w-[40px] h-[40px] flex items-center justify-center font-bold cursor-pointer rounded-[50%]"
            onClick={() => setIsCreating(true)}
          ></i>
        )}
        {isCreating && (
          <div className=" w-full mt-2">
            <form className="md:flex-row flex-col flex gap-2">
              <input
                type="text"
                placeholder="Enter project name"
                className="outline-none border p-1 px-2 w-full rounded text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-black text-white md:py-0 py-1 px-2 rounded"
                  onClick={addProject}
                >
                  Add
                </button>
                <button
                  className="flex-1 bg-red-500 text-white md:py-0 py-1 px-2 rounded"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateProject;
