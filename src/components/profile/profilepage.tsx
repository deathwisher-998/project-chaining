"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "Jatin Arora",
    email: "jatin@example.com",
    location: "New Delhi, India",
    bio: "Full-stack developer. Love React, Angular & Next.js 🚀",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated ✅", profile);
  };

  function CreativeTable() {
    return (
      <div>
        <div className="overflow-hidden shadow-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <th className="px-6 py-4 text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-sm font-semibold">City</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-indigo-50 transition">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 font-medium text-gray-800">Jatin</td>
                <td className="px-6 py-4 text-gray-600">Delhi</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 transition">
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4 font-medium text-gray-800">Arora</td>
                <td className="px-6 py-4 text-gray-600">Mumbai</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                    Inactive
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-indigo-50 transition">
                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4 font-medium text-gray-800">Neha</td>
                <td className="px-6 py-4 text-gray-600">Bangalore</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-600">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 mt-20 p-5" style={{ marginBottom: "-60px" }}>
      <div className="w-full  bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Personal Centre</h1>
        </div>

        <div className="flex items-center mb-6">
          <div className="mr-5">
            <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold shadow-md">
              {profile.username.charAt(0)}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <h2 className="text-white">9205827898303</h2>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <h3 className="font-bold text-white">Lv2 Nextlevel</h3>
                  <p className="text-white">500/2000.00 {"(Recharge)"}</p>
                  <p className="text-white">3/2 subordinates</p>
                </div>
                <div className="ml-10">
                  <h3 className="font-bold text-white">Personal Gains</h3>
                  <p className="text-white">13728.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  bg-white rounded-xl shadow-lg p-8 mt-5">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Team Report</h1>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-cyan-800 rounded-md p-2 text-center">
            <h1 className="font-bold text-white text-xl">56788.00</h1>
            <h2 className="text-white">Yesterday teams commission</h2>
          </div>
          <div className="bg-cyan-800 rounded-md p-2 text-center">
            <h1 className="font-bold text-white text-xl">56788.00</h1>
            <h2 className="text-white">Active count today</h2>
          </div>
          <div className="bg-cyan-800 rounded-md p-2 text-center">
            <h1 className="font-bold text-white text-xl">56788.00</h1>
            <h2 className="text-white">Added People</h2>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1 mt-5">
          {[...Array(9)].map((item: any, i) => {
            return (
              <div className="border-2 rounded-md p-2 text-center">
                <h1 className="font-bold text-black text-md">Lv {i + 1}</h1>
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <CreativeTable />
        </div>
      </div>
    </div>
  );
}
