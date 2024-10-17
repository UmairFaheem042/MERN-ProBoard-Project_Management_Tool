import React from "react";
import { useDrag } from "react-dnd";
import { useParams } from "react-router-dom";

const Task = ({ data, setRenderApp }) => {
  const { projectId } = useParams();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: data._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const apiURL = import.meta.env.VITE_API_URL;

  async function handleDeleteTask(taskId) {
    try {
      const response = await fetch(`${apiURL}/${projectId}/task/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      // console.log("Project deleted successfully");
      setRenderApp((prev) => !prev);
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  }

  return (
    <div
      ref={drag}
      key={data._id}
      className={`${
        isDragging ? "opacity-25" : "opacity-100"
      }  bg-white p-3 border rounded-md text-[0.9rem] cursor-pointer flex items-baseline gap-2 hover:bg-emerald-50`}
    >
      <p className="w-[91%] break-words">{data.title}</p>
      <button
        onClick={() => handleDeleteTask(data._id)}
        className={"ri-delete-bin-line py-1 px-2  rounded hover:bg-red-400 "}
      ></button>
    </div>
  );
};

export default Task;
