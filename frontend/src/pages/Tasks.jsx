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

  const card =
    "bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition";

  useEffect(() => {
    fetchTasks();
    if (isAdmin) {
      fetchUsers();
      fetchProjects();
    }
  }, []);

  useEffect(() => {
    tasks.forEach((t) => fetchComments(t._id));
  }, [tasks]);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  const fetchUsers = async () => {
    const { data } = await API.get("/users");
    setUsers(data);
  };

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  const fetchComments = async (id) => {
    const { data } = await API.get(`/comments/${id}`);
    setComments((p) => ({ ...p, [id]: data }));
  };

  const createTask = async (e) => {
    e.preventDefault();
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
      toast.error("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}/status`, { status });
    fetchTasks();
  };

  const addComment = async (taskId) => {
    if (!commentText[taskId]) return;

    await API.post("/comments", {
      taskId,
      text: commentText[taskId],
    });

    setCommentText((p) => ({ ...p, [taskId]: "" }));
    fetchComments(taskId);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Tasks</h1>
        <p className="text-white/60 mt-2">Track work & progress</p>
      </div>

      {/* CREATE */}
      {isAdmin && (
        <form onSubmit={createTask} className={`${card} mb-10`}>
          <h2 className="text-xl font-bold text-white mb-5">Create Task</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Title"
              className="input"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <select
              className="input"
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
              placeholder="Description"
              className="md:col-span-2 input"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <select
              className="input"
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
              className="input"
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
              className="input"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          <button className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold">
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      )}

      {/* TASK LIST */}
      <div className="grid gap-6">
        {tasks.map((t) => (
          <div key={t._id} className={card}>
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-white">{t.title}</h2>

              <select
                value={t.status}
                onChange={(e) => updateStatus(t._id, e.target.value)}
                className="bg-black/30 text-white p-2 rounded-lg"
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>DONE</option>
              </select>
            </div>

            <p className="text-white/60 mt-2">{t.description}</p>

            {/* COMMENTS */}
            <div className="mt-5">
              <div className="space-y-2">
                {comments[t._id]?.map((c) => (
                  <div key={c._id} className="bg-black/20 p-3 rounded-lg">
                    <span className="text-cyan-400">{c.user?.name}</span>
                    <p className="text-white/70">{c.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-3">
                <input
                  className="flex-1 input"
                  placeholder="Comment..."
                  value={commentText[t._id] || ""}
                  onChange={(e) =>
                    setCommentText((p) => ({
                      ...p,
                      [t._id]: e.target.value,
                    }))
                  }
                />

                <button
                  onClick={() => addComment(t._id)}
                  className="bg-cyan-500 px-4 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* reusable input style */}
      <style>
        {`
          .input {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 12px;
            border-radius: 12px;
            color: white;
            outline: none;
          }
        `}
      </style>
    </DashboardLayout>
  );
};

export default Tasks;