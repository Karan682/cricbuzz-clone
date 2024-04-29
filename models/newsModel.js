import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      
    },
    slug: {
      type: String,
      
    },
    description: {
      type: String,
      
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("News", matchSchema);