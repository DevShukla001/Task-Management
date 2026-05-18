import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../api/axios";

const Projects = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const isAdmin = userInfo?.role === "ADMIN";

  const [projects, setProjects] = useState(
    []
  );

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get(
        "/projects"
      );

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/projects",
        formData
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Projects
        </h1>
      </div>

      {isAdmin && (
        <form
          onSubmit={createProject}
          className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-10"
        >
          <h2 className="text-2xl font-bold mb-5">
            Create Project
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Project title"
              className="bg-slate-800 p-4 rounded-xl outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              className="bg-slate-800 p-4 rounded-xl outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

            <button className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl font-bold">
              Create Project
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-slate-900 p-6 rounded-3xl border border-slate-800"
          >
            <h2 className="text-2xl font-bold">
              {project.title}
            </h2>

            <p className="text-slate-400 mt-3">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Projects;