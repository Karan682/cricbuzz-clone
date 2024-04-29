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
    toss_winner: {
      type: String,
      
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      
    },
    team_1: {
      type: String,
      
    },
    team_2: {
        type: String,
        
    },
    venue: {
        type: String,
        
    },
    team_1r: {
        type: Number,
        
    },
    team_2r: {
        type: Number,
        
    },
    winner: {
      type: String,
      
  },


    photo: {
      data: Buffer,
      contentType: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);