const TaskTable = ({ tasks }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Recent Tasks
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-slate-700">
            <th className="pb-4">Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Project</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className="border-b border-slate-800"
            >
              <td className="py-4">{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.project?.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;