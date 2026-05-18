import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      <Sidebar />

      <div className="ml-64 w-full p-6">
        <Navbar />

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;