"use client";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Oops! Page Not Found</h2>
      <p className="mb-6 text-center">
        The page you are looking for does not exist. You will be redirected to
        the home page shortly.
      </p>
       <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
