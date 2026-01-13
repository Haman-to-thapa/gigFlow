import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await api.post("/gigs", { title, description, budget: Number(budget) });
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input className="border p-2 w-full mb-2" placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea className="border p-2 w-full mb-2" placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input className="border p-2 w-full mb-4" placeholder="Budget" onChange={e => setBudget(e.target.value)} />
      <button className="bg-black text-white px-4 py-2" onClick={submit}>Post Gig</button>
    </div>
  );
}
