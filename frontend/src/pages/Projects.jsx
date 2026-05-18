import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/axios";

const Projects = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.role === "ADMIN";

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    members: [],
  });

  useEffect(() => {
    fetchProjects();
    if (isAdmin) fetchUsers();
  }, []);

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  const fetchUsers = async () => {
    const { data } = await API.get("/users");
    setUsers(data);
  };

  const createProject = async (e) => {
    e.preventDefault();

    await API.post("/projects", formData);

    setFormData({
      title: "",
      description: "",
      members: [],
    });

    setShowForm(false);
    fetchProjects();
  };

  /* ================= MEMBER TOGGLE ================= */
  const toggleMember = (id) => {
    setFormData((prev) => {
      const exists = prev.members.includes(id);

      return {
        ...prev,
        members: exists
          ? prev.members.filter((m) => m !== id)
          : [...prev.members, id],
      };
    });
  };

  const card =
    "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all duration-300";

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Projects Hub
          </h1>
          <p className="text-white/50 mt-2">
            
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            {showForm ? "Close" : "+ New Project"}
          </button>
        )}
      </div>

      {/* FORM */}
      {isAdmin && showForm && (
        <form onSubmit={createProject} className={`${card} mb-10`}>
          <h2 className="text-xl font-semibold text-white mb-6">
            Create Project
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Project title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="p-4 rounded-xl bg-black/30 border border-white/10 text-white focus:border-cyan-400 outline-none"
            />

            <textarea
              placeholder="Project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="p-4 rounded-xl bg-black/30 border border-white/10 text-white min-h-[120px] focus:border-cyan-400 outline-none"
            />

            {/* ================= CUSTOM DROPDOWN ================= */}
            <div className="border border-white/10 rounded-xl p-4 bg-black/20">
              <p className="text-white/60 text-sm mb-3">
                Select Members
              </p>

              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {users.map((u) => {
                  const selected = formData.members.includes(u._id);

                  return (
                    <div
                      key={u._id}
                      onClick={() => toggleMember(u._id)}
                      className={`cursor-pointer px-3 py-2 rounded-lg flex justify-between items-center transition ${
                        selected
                          ? "bg-cyan-500/20 border border-cyan-400 text-white"
                          : "bg-white/5 hover:bg-white/10 text-white/70"
                      }`}
                    >
                      <span>
                        {u.name} ({u.role})
                      </span>

                      {selected && (
                        <span className="text-cyan-300 text-xs">
                          Selected
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SELECTED PILLS */}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.members.map((id) => {
                const user = users.find((u) => u._id === id);
                return (
                  <div
                    key={id}
                    className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-sm"
                  >
                    {user?.name}
                  </div>
                );
              })}
            </div>

            <button className="py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition">
              Create Project
            </button>
          </div>
        </form>
      )}

      {/* PROJECT LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p._id} className={card}>
            <h2 className="text-2xl font-bold text-white">
              {p.title}
            </h2>

            <p className="text-white/50 text-sm mt-2">
              {p.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.members?.map((m) => (
                <span
                  key={m._id}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Projects;