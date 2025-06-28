"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/action/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const DashBoard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      fetchUser(session.user.name).then((data) => {
        setForm(JSON.parse(data));
        setLoading(false);
      });
    }
  }, [router, session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      const slugName = value.split(/[^\w-]+/).join("").toLowerCase();
      setForm((prev) => ({ ...prev, username: slugName }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    try {
      const response = await updateProfile(form, session.user.name);
      await update(); // refresh session data if needed
      const result = JSON.parse(response);
      toast(result.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
      console.error("Profile update failed", err);
      toast("Failed to update profile", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-200 py-10 px-4">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">Welcome to Your Dashboard</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-lg rounded-xl max-w-2xl mx-auto p-6 space-y-4"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-semibold text-black">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
              required
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-semibold text-black">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email ?? ""}
              readOnly
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
              title="Email can't be modified"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-semibold text-black">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
              required
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label htmlFor="profilpicture" className="block mb-1 text-sm font-semibold text-black">Profile Picture URL</label>
            <input
              type="url"
              id="profilpicture"
              name="profilpicture"
              value={form.profilpicture ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>

          {/* Money Required */}
          <div>
            <label htmlFor="moneyrequired" className="block mb-1 text-sm font-semibold text-black">Amount Required</label>
            <input
              type="number"
              id="moneyrequired"
              name="moneyrequired"
              value={form.moneyrequired ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>

          {/* Mission */}
          <div>
            <label htmlFor="mission" className="block mb-1 text-sm font-semibold text-black">Your Mission</label>
            <textarea
              id="mission"
              name="mission"
              value={form.mission ?? ""}
              onChange={handleChange}
              rows={2}
              placeholder="Tell your story or goal for fundraising..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>

          {/* Razorpay ID */}
          <div>
            <label htmlFor="razorpayid" className="block mb-1 text-sm font-semibold text-black">Razorpay ID</label>
            <input
              type="text"
              id="razorpayid"
              name="razorpayid"
              value={form.razorpayid ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>

          {/* Razorpay Secret */}
          <div>
            <label htmlFor="razorpaySecret" className="block mb-1 text-sm font-semibold text-black">Razorpay Secret</label>
            <input
              type="text"
              id="razorpaySecret"
              name="razorpaySecret"
              value={form.razorpaySecret ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default DashBoard;
