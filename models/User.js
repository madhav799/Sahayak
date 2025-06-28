import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profilpicture: String,
    coverpicture: String,
    moneyrequired: {
      type: Number,
      default: 0,
    },
    mission: {
      type: String,
      default: "",
    },
    razorpayid: String,
    razorpaySecret: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual alias for camelCase use
UserSchema.virtual("moneyRequired").get(function () {
  return this.moneyrequired;
});

export default mongoose.models.User || model("User", UserSchema);
