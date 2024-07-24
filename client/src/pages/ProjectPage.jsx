import React, { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import { useParams } from "react-router-dom";
import ProjectStrip from "../components/ProjectStrip";

const ProjectPage = () => {
  const { id, projectId } = useParams();
  const [renderApp, setRenderApp] = useState(false);
  const [project, SetProject] = useState({
    title: "",
    dateTime: "",
  });

  useEffect(() => {
    async function fetchProjectDetails() {
      const response = await fetch(
        `http://localhost:3000/${id}/project/${projectId}`
      );
      const data = await response.json();
      SetProject(data);
    }
    fetchProjectDetails();
  }, [renderApp]);

  return (
    <div>
      <div className="flex items-center gap-2 justify-between p-6 bg-white w-full">
        <ProjectStrip project={project} setProject={SetProject} />
      </div>
      <div>
        <KanbanBoard setRenderApp={setRenderApp} renderApp={renderApp} />
      </div>
    </div>
  );
};

export default ProjectPage;
