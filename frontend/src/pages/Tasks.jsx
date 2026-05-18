import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../api/axios";

const Tasks = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const isAdmin = userInfo?.role === "ADMIN";

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [projects, setProjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
      assignedTo: "",
      project: "",
    });

  useEffect(() => {
    fetchTasks();

    if (isAdmin) {
      fetchUsers();
      fetchProjects();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        "/tasks"
      );

      setTasks(data);
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

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", formData);

      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
        assignedTo: "",
        project: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(
        `/tasks/${id}/status`,
        {
          status,
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Tasks
      </h1>

      {isAdmin && (
        <form
          onSubmit={createTask}
          className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-10"
        >
          <h2 className="text-2xl font-bold mb-6">
            Create Task
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task title"
              className="bg-slate-800 p-4 rounded-xl outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />

            <select
              className="bg-slate-800 p-4 rounded-xl outline-none"
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value,
                })
              }
            >
              <option value="LOW">LOW</option>

              <option value="MEDIUM">
                MEDIUM
              </option>

              <option value="HIGH">HIGH</option>
            </select>

            <textarea
              placeholder="Description"
              className="bg-slate-800 p-4 rounded-xl md:col-span-2 outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

            <select
              className="bg-slate-800 p-4 rounded-xl outline-none"
              value={formData.project}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  project: e.target.value,
                })
              }
            >
              <option value="">
                Select Project
              </option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              ))}
            </select>

            <select
              className="bg-slate-800 p-4 rounded-xl outline-none"
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedTo: e.target.value,
                })
              }
            >
              <option value="">
                Assign User
              </option>

              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="bg-slate-800 p-4 rounded-xl outline-none"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dueDate: e.target.value,
                })
              }
            />
          </div>

          <button className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl font-bold mt-6">
            Create Task
          </button>
        </form>
      )}

      <div className="grid gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-slate-900 p-6 rounded-3xl border border-slate-800"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {task.title}
              </h2>

              <select
                value={task.status}
                onChange={(e) =>
                  updateTaskStatus(
                    task._id,
                    e.target.value
                  )
                }
                className="bg-slate-800 px-4 py-2 rounded-xl"
              >
                <option value="TODO">
                  TODO
                </option>

                <option value="IN_PROGRESS">
                  IN_PROGRESS
                </option>

                <option value="DONE">
                  DONE
                </option>
              </select>
            </div>

            <p className="text-slate-400 mt-4">
              {task.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-5">
              <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm">
                Project:{" "}
                {task.project?.title}
              </div>

              <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm">
                Assigned:{" "}
                {task.assignedTo?.name}
              </div>

              <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm">
                Priority: {task.priority}
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl mt-5"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Tasks;