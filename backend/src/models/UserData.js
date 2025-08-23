import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // reference to your User model
      required: true,
    },
    income: {
      type: Number,
      default: 0,
    },
    expense_done: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const UserData = mongoose.model("UserData", userDataSchema);

export default UserData;
