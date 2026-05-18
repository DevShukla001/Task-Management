const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <h2 className="text-slate-400 mb-2">{title}</h2>

      <h1 className="text-4xl font-bold text-cyan-400">
        {value}
      </h1>
    </div>
  );
};

export default StatsCard;