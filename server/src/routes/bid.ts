import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { submitBid,getBidsForGig,hireBid } from "../controllers/bidController";

const router = Router()

router.post("/", authMiddleware, submitBid);
router.get("/:gigId", authMiddleware, getBidsForGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);

export default router;