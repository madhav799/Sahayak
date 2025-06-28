"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Projects() {
  const router = useRouter();

  const handleDonateNow = (title) => {
    const username = title.toLowerCase().split(" ").join("_");
    router.push(`/${username}`);
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* 🔹 Hero Section */}
      <section className="relative bg-blue-950 text-white py-16 px-4 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 opacity-80"></div>
  <div className="relative z-10 text-center max-w-2xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-bold">Support Our Projects</h1>
    <p className="mt-4 text-lg md:text-xl text-gray-300">
      Empower lives through community-driven crowdfunding.
    </p>
  </div>
</section>


      {/* 🔹 Impactful Campaigns */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-6">Impactful Campaigns</h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-16 text-lg">
          Explore initiatives that bring hope, healing, and change.
        </p>

        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/images/image1.avif",
              title: "Medical Aid for Children",
              desc: "Healthcare support for underprivileged children in remote areas.",
            },
            {
              src: "/images/image2.avif",
              title: "Disaster Relief Fund",
              desc: "Quick-response aid for victims of floods, earthquakes, and natural calamities.",
            },
            {
              src: "/images/image3.avif",
              title: "Education for All",
              desc: "Helping children access school and scholarships through generous donors.",
            },
          ].map((project, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-56">
                <Image
                  src={project.src}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-blue-900">{project.title}</h3>
                <p className="text-base text-gray-700 mt-4 flex-grow">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Active Campaigns */}
      <section className="bg-gradient-to-br from-gray-200 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-6">Active Campaigns</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-16 text-lg">
            These campaigns urgently need your support. A small donation can make a big difference.
          </p>

          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                src: "/images/image4.avif",
                title: "No child orphaned",
                desc: "Raising ₹30,000 for life-saving support. Every rupee matters.",
              },
              {
                src: "/images/image5.jpg",
                title: "Feed the hungry",
                desc: "Seeking ₹50,000 to feed the poor and needy.",
              },
              {
                src: "/images/image4.avif",
                title: "Every girl in School",
                desc: "Raising ₹10,000 to protect animals from harm.",
              },
            ].map((campaign, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={campaign.src}
                    alt={campaign.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-blue-900">{campaign.title}</h3>
                  <p className="text-base text-gray-700 mt-4 flex-grow">{campaign.desc}</p>
                  <button
                    onClick={() => handleDonateNow(campaign.title)}
                    className="mt-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 CTA */}
      <section className="bg-blue-900 text-white py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold">Want to Support a Cause?</h2>
        <p className="mt-6 text-xl max-w-2xl mx-auto">
          Start a campaign, support someone’s dream, or simply donate. You can be someone's Sahayak today.
        </p>
        <button className="mt-10 px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-lg">
          Start a Campaign
        </button>
      </section>
    </div>
  );
}
