interface BidCardProps {
  bid: any;
  onHire: (bidId: string) => void;
}

export default function BidCard({ bid, onHire }: BidCardProps) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3
                    hover:shadow-md transition-all duration-200">

      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center
                          font-semibold text-sm text-gray-700">
            {bid.freelancerId?.name?.[0]}
          </div>

          <p className="font-semibold">
            {bid.freelancerId?.name}
          </p>
        </div>

        <span className="font-bold text-black text-sm">
          ₹{bid.price}
        </span>
      </div>

      {/* Message */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {bid.message}
      </p>

      {/* Bottom */}
      <div className="flex justify-between items-center mt-2">
        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize
            ${bid.status === "hired"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
            }`}
        >
          {bid.status}
        </span>

        {/* Action */}
        {bid.status === "pending" ? (
          <button
            onClick={() => onHire(bid._id)}
            className="px-4 py-1.5 rounded-full text-sm font-medium
                       border border-black text-black
                       hover:bg-black hover:text-white
                       active:scale-95 transition"
          >
            Hire
          </button>
        ) : (
          <span className="text-xs text-green-600 font-medium">
            ✓ Hired
          </span>
        )}
      </div>
    </div>
  );
}
