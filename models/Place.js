import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longtitude: {
      type: Number,
    }
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
