import React, { useEffect, useState } from "react";
import Project from "./Project";
import CreateProject from "./CreateProject";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const Projects = ({ setIsLoading, isLoading }) => {
  const navigate = useNavigate();
  const [renderApp, setRenderApp] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/project");
        const data = await response.json();
        setProjects(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [renderApp, setIsLoading]);

  async function deleteProject(projectId) {
    try {
      const updatedProjects = projects.filter(
        (project) => project._id !== projectId
      );
      setProjects(updatedProjects);
      const response = await fetch(
        `http://localhost:3000/project/${projectId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      console.log("Project deleted successfully");
      navigate("/");
      setRenderApp((prev) => !prev);
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2 p-4">
      {projects.length !== 0 &&
        projects.map((project) => (
          <Project
            key={project._id}
            data={project}
            deleteProject={deleteProject}
          />
        ))}
      <CreateProject setRenderApp={setRenderApp} />
    </section>
  );
};

export default Projects;
