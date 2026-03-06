import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-400 underline">
        Go Home
      </Link>
    </div>
  );
}