"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 🔹 Hero Section */}
      <div className="bg-blue-950 text-white py-20 text-center px-4">
        <h1 className="text-5xl font-bold">About Sahayak</h1>
        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          Empowering generosity through crowdfunding. One story at a time, one life at a time.
        </p>
      </div>

      {/* 🔹 Who We Are */}
     {/* 🔹 Who We Are */}
<div className="container mx-auto px-6 py-24"> {/* increased from py-12 to py-24 */}
  <h2 className="text-3xl font-bold text-center text-blue-900">Who We Are</h2>
  <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">
    Sahayak is more than just a fundraising platform—it&apos;s a movement. Built to serve individuals, NGOs,
          and social impact initiatives, we are committed to making crowdfunding simpler, safer, and more
          human. Whether someone is facing a personal crisis, running a charity, or simply trying to bring
          their idea to life, Sahayak offers the tools and support to help them succeed. We believe in the
          collective power of community and the boundless potential of kindness.
  </p>
</div>

      {/* 🔹 How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-900">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-10 mt-12">
            <div className="max-w-sm p-6 bg-gray-200 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Start a Campaign</h3>
              <p className="text-gray-700 mt-3 text-base leading-relaxed">
                Setting up your fundraiser is quick and intuitive. Share your story, upload images,
                and set your goal. Within minutes, you&apos;re live and ready to receive support from your
                community and beyond.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-gray-200 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Receive Donations</h3>
              <p className="text-gray-700 mt-3 text-base leading-relaxed">
                Once your campaign is live, well-wishers can donate with ease using secure payment
                methods. Watch the power of people come alive as your supporters rally behind your
                cause.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-gray-200 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Make an Impact</h3>
              <p className="text-gray-700 mt-3 text-base leading-relaxed">
                Every rupee raised brings you closer to your goal. Whether it&apos;s a medical emergency,
                educational dream, or community project, the funds raised help you drive real and
                lasting change.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Our Impact */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-blue-900">Our Impact</h2>
        <p className="text-gray-700 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
          Over the past year, Sahayak has helped countless individuals and families overcome
          financial hardships. From life-saving surgeries to grassroots education initiatives, our
          platform has powered stories of hope, compassion, and resilience. Every campaign reflects
          the trust of our community and the deep connections we’ve built with our users. Together,
          we&apos;re building a future where help is never out of reach.
        </p>
      </div>

      {/* 🔹 Get Involved */}
      <div className="bg-blue-900 text-white py-16 text-center px-4">
        <h2 className="text-4xl font-bold">Get Involved</h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
          Whether you&apos;re ready to start your own campaign or simply want to support someone else&apos;s
          journey, your involvement matters. Share stories, contribute to causes, and become a part
          of the Sahayak family. Together, we can ignite positive change and create a more
          compassionate society.
        </p>
        <div className="mt-8">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-lg shadow-lg transition"
          >
            Start Fundraising
          </button>
        </div>
      </div>
    </div>
  );
}
