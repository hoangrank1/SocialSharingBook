import express from "express";
import { getCustomer, getOwner } from "../controllers/books.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/:ownerId/findCustomer", verifyToken, getCustomer);
router.get("/:customerId/findOwner", verifyToken, getOwner);

export default router;
