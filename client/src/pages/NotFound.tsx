import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>

      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded"
      >
        Go to Home
      </Link>
    </div>
  );
}
