import { useState } from "react";

export default function BidForm({ onSubmit }: { onSubmit: (msg: string, price: string) => void }) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!message || !price) return alert("Message & price required");

    setLoading(true);
    await onSubmit(message, price);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold text-lg mb-4">Place a Bid</h3>

      <div className="space-y-3">
        <textarea
          placeholder="Write your proposal..."
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          rows={3}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="number"
          placeholder="Your price (₹)"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Bid"}
        </button>
      </div>
    </div>
  );
}
