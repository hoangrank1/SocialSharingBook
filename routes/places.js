import express from "express";
import { removePlaceToMeet } from "../controllers/places.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.patch("/:mapId/removePlaceToMeet", verifyToken, removePlaceToMeet);

export default router;
