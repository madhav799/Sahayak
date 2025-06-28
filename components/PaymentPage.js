"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { initiate, fetchUser, fetchPayments } from "@/action/useractions";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("Payment has been made", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      router.push(`/${username}`);
    }
  }, []);

  const handelChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    setLoading(true);
    try {
      let u = await fetchUser(username);
      setCurrentUser(JSON.parse(u));
      let paymentAmount = await fetchPayments(username);
      setPayment(JSON.parse(paymentAmount));
    } catch (err) {
      console.error("Failed to fetch user or payments", err);
    }
    setLoading(false);
  };

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser?.razorpayid,
      amount: amount,
      currency: "INR",
      name: "Sahayak",
      description: "Support Transaction",
      image: "./tea.gif",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: username,
        email: session?.user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Sahayak Office",
      },
      theme: {
        color: "#002E5D",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <ToastContainer />

      {loading && <Loader />}
      {currentUser.error && (
        <div className="text-center text-4xl my-20 font-extrabold">User {username} not found ☹</div>
      )}

      {!currentUser.error && (
        <>
          {/* HERO SECTION */}
          <div className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between bg-gray-100">
            <div className="absolute inset-0">
              <img
                src={currentUser.coverpic || "./default-cover.jpg"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            </div>

            <div className="relative z-10 w-full md:w-1/2 px-10 py-20 text-white">
              <h2 className="uppercase tracking-widest text-lg mb-4">Mission</h2>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6">{currentUser.mission}</h1>
              <p className="text-lg md:text-xl mb-8">
                Help us in continuing our journey to support those who have no one else in the world.
              </p>

              {currentUser.moneyrequired && (
                <div className="max-w-md">
                  <div className="text-lg font-medium mb-2">
                    ₹{payment.reduce((a, b) => a + b.amount, 0)} raised of ₹{currentUser.moneyrequired}
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (payment.reduce((a, b) => a + b.amount, 0) / currentUser.moneyrequired) * 100
                        ).toFixed(1)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-end px-10">
             {/* Profile Picture */}
<img
  src={currentUser.profilpicture || "./avatar.gif"}
  alt="profile"
  className="w-72 h-72 md:w-[28rem] md:h-[28rem] object-cover rounded-2xl shadow-2xl border-4 border-white"
/>



            </div>
          </div>

          {/* SUPPORTERS & PAYMENT SECTION */}
          <div className="bg-[#002E5D] text-white py-12 px-6">
            <div className="container mx-auto flex flex-col lg:flex-row gap-10 justify-center items-start">

              {/* Supporters Box */}
              <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-5">Supporters</h2>

                <div className="text-lg font-medium mb-4">
                  {payment.length} Supporter{payment.length !== 1 && "s"} · ₹
                  {payment.reduce((a, b) => a + b.amount, 0)} Raised
                </div>

                {payment.length === 0 ? (
                  <div className="text-center font-extrabold text-lg">No supporters yet ☹</div>
                ) : (
                  <ul className="space-y-4">
                    {payment.slice(0, 5).map((p) => (
                      <li key={p._id} className="flex gap-3 items-center">
                        <img src="./avatar.gif" alt="avatar" width={40} className="rounded-full"/>
                        <span className="text-sm md:text-base">
                          {p.name} donated <span className="font-semibold">₹{p.amount}</span> with message &quot;{p.message}&quot;
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Make Payment Box */}
              <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-5">Make a Payment</h2>
                <form ref={searchRef} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={paymentform.name}
                    onChange={handelChange}
                    className="p-2 rounded-md bg-slate-900/40"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Message"
                    name="message"
                    value={paymentform.message}
                    onChange={handelChange}
                    className="p-2 rounded-md bg-slate-900/40"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={paymentform.amount}
                    onChange={handelChange}
                    className="p-2 rounded-md bg-slate-900/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => pay(paymentform.amount * 100)}
                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-medium rounded-lg px-5 py-2.5 text-center"
                    disabled={
                      paymentform.name.length < 3 ||
                      paymentform.message.length < 5 ||
                      !paymentform.amount
                    }
                  >
                    Support
                  </button>
                </form>

                {/* Quick Pay Buttons */}
                <div className="flex gap-3 mt-5">
                  {[10, 20, 50].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => pay(amt * 100)}
                      disabled={paymentform.name.length < 3 || paymentform.message.length < 5}
                      className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:bg-slate-800/40"
                    >
                      Pay ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PaymentPage;
