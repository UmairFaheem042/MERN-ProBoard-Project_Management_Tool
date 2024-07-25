import React, { useEffect, useState } from "react";
import Column from "./Column";
import { useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KanbanBoard = ({ setRenderApp, renderApp }) => {
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const { projectId } = useParams();
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`${apiURL}/${projectId}/task`);
        if (!response.ok) throw new Error("Error fetching tasks");
        const data = await response.json();

        const todosFiltered = data.filter((task) => task.status === "todo");
        const progressFiltered = data.filter(
          (task) => task.status === "inprogress"
        );
        const doneFiltered = data.filter((task) => task.status === "done");

        setTodos(todosFiltered);
        setProgress(progressFiltered);
        setDone(doneFiltered);
      } catch (error) {
        console.log("FROM CATCH BLOCK: Error occurred while fetching tasks");
      }
    }
    fetchTasks();
  }, [renderApp]);

  async function addTask(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/${projectId}/task`, {
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
      setTodos([...todos, data]);
      setIsCreating(false);
      setRenderApp((prev) => !prev);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" flex gap-0 p-3">
        <Column
          label={"Todo"}
          tasks={todos}
          newTask={title}
          setNewTask={setTitle}
          addTask={addTask}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setTodos={setTodos}
          setProgress={setProgress}
          setDone={setDone}
          setRenderApp={setRenderApp}
        />
        <Column
          label={"In Progress"}
          tasks={progress}
          setTodos={setTodos}
          setProgress={setProgress}
          setDone={setDone}
          setRenderApp={setRenderApp}
        />
        <Column
          label={"Done"}
          tasks={done}
          setTodos={setTodos}
          setProgress={setProgress}
          setDone={setDone}
          setRenderApp={setRenderApp}
        />
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
