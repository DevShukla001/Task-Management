import { useEffect, useState } from "react";
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
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.role === "ADMIN";

  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  /* ================= UI STYLE ================= */
  const card =
    "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10";

  const kpi =
    "rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 hover:scale-[1.02] transition";

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
      const { data } = await API.get("/dashboard/stats");
      setStats(data);
    } catch {
      toast.error("Failed to load dashboard");
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const fetchMyTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted");
      fetchProjects();
      fetchStats();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= MEMBER VIEW ================= */
  if (!isAdmin) {
    const completed = tasks.filter((t) => t.status === "DONE").length;
    const progress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const todo = tasks.filter((t) => t.status === "TODO").length;

    return (
      <DashboardLayout>
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-white">
            My Workspace
          </h1>
          <p className="text-white/50 mt-2">
            
          </p>
        </div>

        {/* KPI */}
        <div className="grid md:grid-cols-4 gap-5 mb-10">
          {[
            ["Total", tasks.length],
            ["In Progress", progress],
            ["Todo", todo],
            ["Completed", completed],
          ].map(([label, value], i) => (
            <div key={i} className={kpi}>
              <p className="text-white/50 text-xs uppercase">{label}</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* PIE */}
        <div className={`${card} mb-10`}>
          <h2 className="text-lg font-semibold text-white mb-6">
            Task Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "TODO", value: todo },
                  { name: "IN_PROGRESS", value: progress },
                  { name: "DONE", value: completed },
                ]}
                dataKey="value"
                outerRadius={120}
              >
                <Cell fill="#facc15" />
                <Cell fill="#3b82f6" />
                <Cell fill="#22c55e" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TASKS */}
        <div className={card}>
          <h2 className="text-lg font-semibold text-white mb-6">
            My Tasks
          </h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="flex justify-between">
                  <h3 className="text-white font-semibold">
                    {task.title}
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300">
                    {task.status}
                  </span>
                </div>

                <p className="text-white/50 text-sm mt-2">
                  {task.description}
                </p>

                <div className="text-xs text-white/40 mt-3 flex gap-3">
                  <span>Priority: {task.priority}</span>
                  <span>Project: {task.project?.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ================= ADMIN VIEW ================= */
  if (!stats) {
    return (
      <DashboardLayout>
        <div className="text-white/60 animate-pulse">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Admin Control Center
        </h1>
        <p className="text-white/50 mt-2">
        </p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-5 mb-10">
        {[
          ["Users", stats.totalUsers],
          ["Projects", stats.totalProjects],
          ["Tasks", stats.totalTasks],
          ["Completed", stats.completedTasks],
        ].map(([label, value], i) => (
          <div key={i} className={kpi}>
            <p className="text-white/50 text-xs uppercase">{label}</p>
            <h2 className="text-3xl font-bold text-white mt-2">
              {value}
            </h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className={card}>
          <h2 className="text-lg font-semibold text-white mb-6">
            Status Flow
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stats.statusStats} dataKey="value" outerRadius={120}>
                {stats.statusStats.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#22c55e", "#facc15", "#3b82f6"][i % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={card}>
          <h2 className="text-lg font-semibold text-white mb-6">
            Priority Load
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.priorityStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= PROJECT TABLE (JIRA STYLE SLOT UI) ================= */}
      <div className={card}>
        <h2 className="text-lg font-semibold text-white mb-6">
          Projects Overview
        </h2>

        {/* Header */}
        <div className="grid grid-cols-12 text-xs text-white/40 uppercase border-b border-white/10 pb-3 mb-3">
          <div className="col-span-4">Project</div>
          <div className="col-span-5">Description</div>
          <div className="col-span-2">Members</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {projects.map((p) => (
            <div
              key={p._id}
              className="grid grid-cols-12 items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.01] transition"
            >
              <div className="col-span-4">
                <h3 className="text-white font-medium">{p.title}</h3>
              </div>

              <div className="col-span-5">
                <p className="text-white/50 text-sm truncate">
                  {p.description}
                </p>
              </div>

              <div className="col-span-2">
                <span className="px-3 py-1 text-xs rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  {p.members?.length || 0} users
                </span>
              </div>

              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => deleteProject(p._id)}
                  className="px-3 py-1 text-xs rounded-lg bg-red-500/80 hover:bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;