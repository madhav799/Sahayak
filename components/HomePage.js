"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleReadMore = () => {
    router.push("/about"); // change '/about' to your intended route
  };

  const handleStartNow = () => {
    router.push("/login"); // change '/start' to your intended route
  };

  return (
    <>
      {/* 🌟 Hero Section */}
      <div className='h-[90vh] relative w-full overflow-hidden flex flex-col gap-6 justify-center items-center px-4 text-white bg-gradient-to-br from-blue-800 to-purple-800'>
        <div className="font-bold text-5xl md:text-6xl flex gap-2 justify-center items-center drop-shadow-lg text-center">
          Help the Needy
          <span>
            <img src="https://www.lbma.org/wp-content/uploads/Donate-GIF.gif" width="80" alt="Donation GIF"/>
          </span>
        </div>
        <p className="text-lg md:text-xl text-center max-w-[600px] drop-shadow-md">
          A crowdfunding platform serving as a beacon of hope for millions.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={handleStartNow}
            className="text-white bg-gradient-to-br from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-300 font-semibold rounded-lg text-md px-6 py-3 shadow-lg"
          >
            Start Now
          </button>
          <button 
            onClick={handleReadMore}
            className="text-white bg-gradient-to-br from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-300 font-semibold rounded-lg text-md px-6 py-3 shadow-lg"
          >
            Read More
          </button>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className='bg-white h-1 opacity-10'></div>

      {/* 🌟 Fundraising Section */}
      <div className='text-3xl md:text-4xl text-blue-900 flex justify-center items-center p-8 font-semibold tracking-wide bg-gray-50 rounded-lg shadow-inner'>
        Fundraising & Crowdfunding
      </div>

      {/* 🌟 Image Section with Captions */}
      <div className="grid md:grid-cols-3 gap-12 mt-10 px-12 justify-items-center">
        {[
          { img: "/images/medicalbills.png", title: "Medical Bills", desc: "Medical bills burden countless families daily." },
          { img: "/images/startMedFundraiser.avif", title: "Start a Fundraiser", desc: "Stop worrying about expenses. Start your campaign now." },
          { img: "/images/trymedical.avif", title: "Healthcare Support", desc: "Raise funds for yourself or loved ones today." }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <Image className="rounded-lg" width={200} height={200} src={item.img} alt={item.title} />
            <p className="mt-4 text-blue-900 text-xl font-bold">{item.title}</p>
            <p className="text-gray-700 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Divider */}
      <div className='bg-white h-1 opacity-10 mt-10'></div>

      {/* 🌟 Learn More Section */}
      <div className='text-2xl md:text-3xl text-blue-900 flex justify-center items-center p-6 font-semibold'>
        Learn More About Us
      </div>

      {/* 📹 Responsive YouTube Video */}
      <div className="flex justify-center items-center mt-8 px-8">
        <div className="w-full max-w-3xl">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/CiFoHm7HD94?si=IKHkdyemXJd-kgP_" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className='bg-white h-1 opacity-10 mt-10'></div>
    </>
  );
}
