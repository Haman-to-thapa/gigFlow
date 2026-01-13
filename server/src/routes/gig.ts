import { Router } from "express";
import { createGig,getOpenGigs } from "../controllers/gigController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post('/',authMiddleware,createGig);
router.get('/',getOpenGigs);

export default router;