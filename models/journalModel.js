import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    date: Date,
    description: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    image: String,
    imagePublicId: String,
  },
  { timestamps: true }
);

export default mongoose.model("journal", journalSchema);
