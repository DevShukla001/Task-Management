const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="text-slate-400">
          Welcome back, {user?.name}
        </p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("userInfo");
          window.location.href = "/";
        }}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;