import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen fixed bg-slate-900 border-r border-slate-800 p-5">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        TaskFlow
      </h1>

      <div className="space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FolderKanban size={20} />
          Projects
        </Link>

        <Link
          to="/tasks"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <ListTodo size={20} />
          Tasks
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;