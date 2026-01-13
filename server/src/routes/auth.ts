import { Router } from "express";
import { register, login, logout } from "../controllers/authController";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, (req:AuthRequest, res:Response) => {
  res.json({
    user: {
      id: req.userId,
    },
  });
});



export default router;