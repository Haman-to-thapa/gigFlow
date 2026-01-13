import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import type { RootState } from "../redux/store";
import BidCard from "../components/BidCard";
import BidForm from "../components/BidForm";


export default function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [bids, setBids] = useState<any[]>([]);

  const loadBids = async () => {
    const res = await api.get(`/bids/${id}`);
    setBids(res.data);
  };

  useEffect(() => {
    if (user) loadBids();
  }, [user]);

  const submitBid = async (message: string, price: string) => {
    await api.post("/bids", {
      gigId: id,
      message,
      price: Number(price),
    });

    alert("Bid submitted!");
    navigate("/");
  };

  const hire = async (bidId: string) => {
    await api.patch(`/bids/${bidId}/hire`);
    loadBids();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <h2 className="text-2xl font-bold">Gig Details</h2>


        {user && <BidForm onSubmit={submitBid} />}


        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bids</h3>

          {bids.length === 0 ? (
            <p className="text-gray-500">No bids yet</p>
          ) : (
            <div className="grid gap-4">
              {bids.map((b: any) => (
                <BidCard key={b._id} bid={b} onHire={hire} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}