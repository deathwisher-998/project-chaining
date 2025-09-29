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

  return (
    <div className="flex bg-gray-100 mt-5 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-full  bg-white rounded-xl shadow-lg p-8"
      >
        {/* Avatar */}

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Personal Centre</h1>
        </div>

        <div className="flex items-center mb-6">
          <div className="mr-5">
            <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              {profile.username.charAt(0)}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <h2>9205827898303</h2>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <h3 className="font-bold">Lv2 Nextlevel</h3>
                  <p>500/2000.00 {"(Recharge)"}</p>
                  <p>3/2 subordinates</p>
                </div>
                <div className="ml-10">
                  <h3 className="font-bold">Personal Gains</h3>
                  <p>13728.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
