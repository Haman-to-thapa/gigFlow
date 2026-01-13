import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";



export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    dispatch(logout());
    navigate("/login");
  };


  useEffect(() => {
    api.get(`/gigs?search=${search}`).then((res) => setGigs(res.data));
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            GIG<span className="text-gray-400"> Flow</span>
          </h1>

          <div className="flex gap-3 w-full sm:w-auto">

            <input
              type="text"
              placeholder="Search gigs..."
              className="w-full sm:w-64 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Link
              to="/create-gig"
              className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 whitespace-nowrap"
            >
              + Create Gig
            </Link>

            <button
              onClick={handleLogout}
              className="border border-black px-4 py-2 rounded-lg font-medium hover:bg-black hover:text-white"
            >
              Logout
            </button>
          </div>

        </div>
      </header>


      <main className="max-w-6xl mx-auto px-6 py-6">
        {gigs.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No gigs found
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gigs.map((g: any) => (
              <Link
                key={g._id}
                to={`/gigs/${g._id}`}
                className="bg-white rounded-xl border p-5 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{g.title}</h3>
                <p className="text-gray-600 text-sm mb-1">
                  Budget
                </p>
                <p className="font-bold text-black">₹{g.budget}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
