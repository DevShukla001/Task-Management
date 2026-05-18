import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../api/axios";

import toast from "react-hot-toast";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const isAdmin =
    userInfo?.role === "ADMIN";

  const [stats, setStats] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();

      fetchProjects();
    } else {
      fetchMyTasks();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get(
        "/dashboard/stats"
      );

      setStats(data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load admin dashboard"
      );
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

  const fetchMyTasks = async () => {
    try {
      const { data } = await API.get(
        "/tasks"
      );

      setTasks(data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load tasks"
      );
    }
  };

  const deleteProject = async (
    id
  ) => {
    try {
      await API.delete(
        `/projects/${id}`
      );

      toast.success(
        "Project deleted"
      );

      fetchProjects();

      fetchStats();
    } catch (error) {
      toast.error(
        "Delete failed"
      );
    }
  };

  /* ========================= */
  /* MEMBER DASHBOARD */
  /* ========================= */

  if (!isAdmin) {
    const completed =
      tasks.filter(
        (t) => t.status === "DONE"
      ).length;

    const progress =
      tasks.filter(
        (t) =>
          t.status ===
          "IN_PROGRESS"
      ).length;

    const todo = tasks.filter(
      (t) => t.status === "TODO"
    ).length;

    return (
      <DashboardLayout>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            My Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Personal task overview
          </p>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <h2 className="text-slate-400">
              Total Tasks
            </h2>

            <div className="text-4xl font-bold mt-3">
              {tasks.length}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <h2 className="text-slate-400">
              In Progress
            </h2>

            <div className="text-4xl font-bold mt-3">
              {progress}
            </div>
          </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
    <h2 className="text-slate-400">Todo</h2>
    <div className="text-4xl font-bold mt-3 text-yellow-400">
      {todo}
    </div>
  </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <h2 className="text-slate-400">
              Completed
            </h2>

            <div className="text-4xl font-bold mt-3 text-cyan-400">
              {completed}
            </div>
          </div>
        </div>

        {/* CHART */}

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Task Progress
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={[
                  {
                    name: "TODO",
                    value: todo,
                  },
                  {
                    name: "IN_PROGRESS",
                    value: progress,
                  },
                  {
                    name: "DONE",
                    value: completed,
                  },
                ]}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                <Cell />

                <Cell />

                <Cell />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* MY TASKS */}

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-2xl font-bold mb-6">
            My Tasks
          </h2>

          <div className="grid gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-slate-800 p-5 rounded-2xl"
              >
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">
                    {task.title}
                  </h3>

                  <div className="text-cyan-400">
                    {task.status}
                  </div>
                </div>

                <p className="text-slate-400 mt-2">
                  {task.description}
                </p>

                <div className="flex gap-4 mt-4 text-sm">
                  <div>
                    Priority:{" "}
                    {
                      task.priority
                    }
                  </div>

                  <div>
                    Project:{" "}
                    {
                      task.project
                        ?.title
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ========================= */
  /* ADMIN DASHBOARD */
  /* ========================= */

  if (!stats) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Analytics & management
        </p>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-slate-400">
            Users
          </h2>

          <div className="text-4xl font-bold mt-3">
            {stats.totalUsers}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-slate-400">
            Projects
          </h2>

          <div className="text-4xl font-bold mt-3">
            {stats.totalProjects}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-slate-400">
            Tasks
          </h2>

          <div className="text-4xl font-bold mt-3">
            {stats.totalTasks}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-slate-400">
            Completed
          </h2>

          <div className="text-4xl font-bold mt-3 text-cyan-400">
            {stats.completedTasks}
          </div>
        </div>
      </div>

      {/* CHARTS */}

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-2xl font-bold mb-6">
            Task Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={
                  stats.statusStats
                }
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {stats.statusStats.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-2xl font-bold mb-6">
            Task Priority
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={
                stats.priorityStats
              }
            >
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PROJECTS */}

      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-6">
          Project Management
        </h2>

        <div className="grid gap-5">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-slate-800 p-5 rounded-2xl flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {project.title}
                </h3>

                <p className="text-slate-400 mt-1">
                  {
                    project.description
                  }
                </p>

                <div className="text-sm text-cyan-400 mt-2">
                  Members:{" "}
                  {
                    project.members
                      ?.length
                  }
                </div>
              </div>

              <button
                onClick={() =>
                  deleteProject(
                    project._id
                  )
                }
                className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl font-bold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;