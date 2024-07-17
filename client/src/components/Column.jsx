import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { useParams } from "react-router-dom";

const Column = ({
  label,
  tasks,
  newTask,
  setNewTask,
  addTask,
  isCreating,
  setIsCreating,
  //
  setTodos,
  setProgress,
  setDone,
  setRenderApp,
}) => {
  const { projectId } = useParams();

  let labelColor;

  if (label === "Todo") labelColor = "red";
  else if (label === "In Progress") labelColor = "blue";
  else labelColor = "emerald";

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToColumn(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  async function addItemToColumn(taskId) {
    // console.log("dropped", taskId, label);
    try {
      const updatedTasks = tasks.map((task) =>
        task._id === taskId
          ? { ...task, status: label.toLowerCase().replace(" ", "") }
          : task
      );
      if (label === "Todo") {
        setTodos(updatedTasks);
      } else if (label === "In Progress") {
        setProgress(updatedTasks);
      } else if (label === "Done") {
        setDone(updatedTasks);
      }

      const response = await fetch(
        `http://localhost:3000/${projectId}/task/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: label.toLowerCase().replace(" ", ""),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
      setRenderApp((prev) => !prev);
    } catch (error) {
      console.error("Error updating task status:", error);
      // Rollback UI changes if needed
    }
  }

  return (
    <div
      ref={drop}
      className={`${
        isOver ? "bg-slate-200" : ""
      } w-1/3 flex flex-col gap-3 min-h-[66.5vh] p-4`}
    >
      <div className="flex justify-between">
        <span className={`text-${labelColor}-500 font-semibold`}>{label}</span>
        <span className="text-[rgba(0,0,0,0.3)] font-semibold">
          {tasks.length}
        </span>
      </div>
      {/* tasks */}
      <div className=" flex flex-col gap-3">
        {tasks.length !== 0 &&
          tasks.map((task) => (
            <Task key={task._id} data={task} setRenderApp={setRenderApp} />
          ))}
      </div>
      {label === "Todo" && !isCreating && (
        <button
          className="w-max px-2 text-[rgba(0,0,0,0.5)] font-medium text-sm hover:text-black"
          onClick={() => setIsCreating(true)}
        >
          Add Card +
        </button>
      )}
      {label === "Todo" && isCreating && (
        <div className=" w-full mt-2">
          <form className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter task name"
              className="outline-none border p-1 px-2 w-full rounded text-sm"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="flex justify-between gap-2">
              <button
                className="p-1 text-sm flex-1 bg-black text-white  rounded"
                onClick={addTask}
              >
                Add
              </button>
              <button
                className="p-1 text-sm flex-1 bg-red-500 text-white  rounded"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Column;
