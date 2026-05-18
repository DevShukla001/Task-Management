import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: ["ADMIN", "MEMBER"],
      default: "MEMBER",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);