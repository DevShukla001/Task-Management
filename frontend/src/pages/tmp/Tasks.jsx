import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/axios";
import toast from "react-hot-toast";

const Tasks = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.role === "ADMIN";

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
    assignedTo: "",
    project: "",
  });

  const cardClass =
    "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.01] transition-all duration-300";

  const getStatusStyle = (status) => {
    switch (status) {
      case "DONE":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      default:
        return "bg-yellow-500/10 text-yellow-300 border-yellow-500/30";
    }
  };

  useEffect(() => {
    fetchTasks();
    if (isAdmin) {
      fetchUsers();
      fetchProjects();
    }
  }, []);

  useEffect(() => {
    tasks.forEach((task) => fetchComments(task._id));
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch {}
  };

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch {}
  };

  const fetchComments = async (taskId) => {
    try {
      const { data } = await API.get(`/comments/${taskId}`);
      setComments((prev) => ({ ...prev, [taskId]: data }));
    } catch {}
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.project) {
      return toast.error("Fill required fields");
    }

    try {
      setLoading(true);
      await API.post("/tasks", formData);
      toast.success("Task created");
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
        assignedTo: "",
        project: "",
      });
      fetchTasks();
    } catch {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}/status`, { status });
      toast.success("Updated");
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  const addComment = async (taskId) => {
    if (!commentText[taskId]) return;

    try {
      await API.post("/comments", {
        taskId,
        text: commentText[taskId],
      });

      setCommentText((p) => ({ ...p, [taskId]: "" }));
      fetchComments(taskId);
      toast.success("Comment added");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-black text-white tracking-tight">
          Task Board
        </h1>
        <p className="text-white/50 mt-2">
          Jira-like workflow tracking system
        </p>
      </div>

      {/* CREATE TASK */}
      {isAdmin && (
        <form
          onSubmit={createTask}
          className={`${cardClass} mb-10 animate-fade-in`}
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Create Task
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-white"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <select
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-white"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
            </select>

            <textarea
              className="md:col-span-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <select
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-white"
              value={formData.project}
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
            >
              <option>Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>

            <select
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-white"
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({ ...formData, assignedTo: e.target.value })
              }
            >
              <option>Assign User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-white"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            className="mt-6 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold transition"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      )}

      {/* TASK BOARD (JIRA STYLE) */}
      <div className="grid gap-6">
        {tasks.map((task) => (
          <div key={task._id} className={cardClass}>
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {task.title}
                </h2>
                <p className="text-white/50 text-sm mt-2">
                  {task.description}
                </p>
              </div>

              <select
                value={task.status}
                onChange={(e) =>
                  updateTaskStatus(task._id, e.target.value)
                }
                className={`px-3 py-2 rounded-xl border text-xs ${getStatusStyle(
                  task.status
                )}`}
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>DONE</option>
              </select>
            </div>

            {/* META */}
            <div className="flex gap-3 mt-5 text-xs text-white/60">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {task.priority}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {task.project?.title}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {task.assignedTo?.name}
              </span>
            </div>

            {/* COMMENTS (FEED STYLE) */}
            <div className="mt-6">
              <h3 className="text-white/70 text-sm mb-3">Activity</h3>

              <div className="space-y-3 max-h-40 overflow-y-auto">
                {comments[task._id]?.map((c) => (
                  <div
                    key={c._id}
                    className="bg-white/5 p-3 rounded-xl border border-white/10"
                  >
                    <p className="text-cyan-400 text-xs">
                      {c.user?.name}
                    </p>
                    <p className="text-white/70 text-sm">{c.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <input
                  className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="Add comment..."
                  value={commentText[task._id] || ""}
                  onChange={(e) =>
                    setCommentText((p) => ({
                      ...p,
                      [task._id]: e.target.value,
                    }))
                  }
                />

                <button
                  onClick={() => addComment(task._id)}
                  className="px-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Send
                </button>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={() => deleteTask(task._id)}
                className="mt-6 text-sm px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500"
              >
                Delete Task
              </button>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Tasks;