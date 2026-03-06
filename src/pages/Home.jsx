import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Code Snippet Manager</h1>
      <Link
        to="/editor"
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Go to Editor
      </Link>
    </div>
  );
}