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

  const [users, setUsers] = useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      members: [],
    });

  useEffect(() => {
    fetchProjects();

    if (isAdmin) {
      fetchUsers();
    }
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

  const fetchUsers = async () => {
    try {
      const { data } = await API.get(
        "/users"
      );

      setUsers(data);
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
        members: [],
      });

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMembers = (e) => {
    const options =
      e.target.selectedOptions;

    const values = Array.from(
      options,
      (option) => option.value
    );

    setFormData({
      ...formData,
      members: values,
    });
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
          <h2 className="text-2xl font-bold mb-6">
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
                  description:
                    e.target.value,
                })
              }
            />

            <select
              multiple
              onChange={handleMembers}
              className="bg-slate-800 p-4 rounded-xl outline-none h-40"
            >
              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name} (
                  {user.role})
                </option>
              ))}
            </select>

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

            <div className="mt-5">
              <h3 className="font-bold mb-3">
                Members
              </h3>

              <div className="flex flex-wrap gap-3">
                {project.members?.map(
                  (member) => (
                    <div
                      key={member._id}
                      className="bg-slate-800 px-4 py-2 rounded-xl text-sm"
                    >
                      {member.name}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Projects;