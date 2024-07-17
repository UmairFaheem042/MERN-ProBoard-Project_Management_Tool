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

  async function handleDeleteTask(taskId) {
    try {
      const response = await fetch(
        `http://localhost:3000/${projectId}/task/${taskId}`,
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

  return (
    <div
      ref={drag}
      key={data._id}
      className={`${
        isDragging ? "opacity-25" : "opacity-100"
      } relative bg-white p-3 border rounded-md text-[0.9rem] cursor-pointer flex flex-col gap-2 group`}
    >
      <p className="w-full break-words">{data.title}</p>
      <button
        onClick={() => handleDeleteTask(data._id)}
        className={
          "z-10 absolute top-[-10px] right-[-10px] ri-delete-bin-line py-1 px-2 rounded hidden group-hover:block hover:bg-red-400"
        }
      ></button>
    </div>
  );
};

export default Task;
