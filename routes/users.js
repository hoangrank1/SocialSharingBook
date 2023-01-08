import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  addRemoveFollowers,
  addRemoveImpressions,
  addRemoveViewedProfile,
  getUserPlace,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/placeToMeet", verifyToken, getUserPlace);

/* UPDATE */
router.patch("/:personId/impressions", verifyToken, addRemoveImpressions);
router.patch("/:personId/viewedProfile", verifyToken, addRemoveViewedProfile);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/followers/:personId/:followerId", verifyToken, addRemoveFollowers);

export default router;
