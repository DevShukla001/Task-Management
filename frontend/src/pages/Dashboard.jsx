import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";
import TaskTable from "../components/TaskTable";
import API from "../api/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");

      setTasks(data);

      setStats({
        total: data.length,
        completed: data.filter((t) => t.status === "DONE")
          .length,
        pending: data.filter((t) => t.status === "TODO")
          .length,
        overdue: data.filter((t) => t.status === "OVERDUE")
          .length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Tasks" value={stats.total} />
        <StatsCard
          title="Completed"
          value={stats.completed}
        />
        <StatsCard title="Pending" value={stats.pending} />
        <StatsCard title="Overdue" value={stats.overdue} />
      </div>

      <TaskTable tasks={tasks} />
    </DashboardLayout>
  );
};

export default Dashboard;