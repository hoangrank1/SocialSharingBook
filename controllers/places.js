import Place from "../models/Place.js";
import mongoose from "mongoose";

/* CREATE */
export const createPlace = async (req, res) => {
  try {
    const { userId, name, lat, lng } = req.body;
    const newPlace = new Place({
      userId,
      name,
      latitude: lat,
      longtitude: lng,
    });
    await newPlace.save();
    const place = await Place.find();
    res.status(201).json(place);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* PATCH */
export const removePlaceToMeet = async (req, res) => {
  try {
    const { mapId } = req.params;
    const places = await Place.deleteOne({_id: mongoose.Types.ObjectId(mapId)});
    res.status(200).json(places);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};