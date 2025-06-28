"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment.model";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

/**
 * Initiates a Razorpay payment and records a pending payment in the database.
 */
export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  const user = await User.findOne({ username: to_username });

  if (!user || !user.razorpayid || !user.razorpaySecret) {
    throw new Error("User payment credentials not found.");
  }

  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaySecret,
  });

  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  await Payment.create({
    oid: order.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return order;
};

/**
 * Fetches a user by username — includes moneyRequired via alias.
 */
export const fetchUser = async (username) => {
  await connectDB();
  const user = await User.findOne({ username }).lean({ virtuals: true }); // <- add this
  return JSON.stringify(user || { error: "User not found" });
};

/**
 * Fetches successful payments for a user.
 */
export const fetchPayments = async (username) => {
  await connectDB();
  const payments = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();
  return JSON.stringify(payments);
};

/**
 * Safely updates user profile without erasing sensitive fields.
 */
export const updateProfile = async (data, oldUsername) => {
  await connectDB();

  const oldUser = await User.findOne({ username: oldUsername });
  if (!oldUser) {
    return JSON.stringify({ message: "User not found" });
  }

  const formUpdates = data; // ✅ FIXED

  // Preserve sensitive fields by merging
  const mergedData = {
    ...oldUser.toObject(),
    ...formUpdates,
  };

  // If username has changed, check for conflict
  if (oldUsername !== formUpdates.username) {
    const existing = await User.findOne({ username: formUpdates.username });
    if (existing) {
      return JSON.stringify({ message: "Username already exists" });
    }

    const updated = await User.findOneAndUpdate(
      { email: oldUser.email },
      mergedData,
      { new: true }
    );

    await Payment.updateMany(
      { to_user: oldUsername },
      { to_user: formUpdates.username }
    );

    return JSON.stringify({
      message: "Profile Updated Successfully",
      data: updated,
    });
  }

  // Username is unchanged — update profile
  const updated = await User.findOneAndUpdate(
    { email: oldUser.email },
    mergedData,
    { new: true }
  );

  return JSON.stringify({
    message: "Profile Updated Successfully",
    data: updated,
  });
};

