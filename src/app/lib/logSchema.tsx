import mongoose, { Schema } from "mongoose";
const topicSchema = new Schema(
  {
    message: String,
  },
  {
    collection: "log",
    timestamps: true,
  }
);
const Log = mongoose.models.log || mongoose.model("log", topicSchema);
export default Log;
