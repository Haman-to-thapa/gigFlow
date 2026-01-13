import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'


interface JwtPayload {
  userId:string
}

export interface AuthRequest extends Request {
  userId?:string
}


const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction) => {

  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({message:"Not authenticated"})
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.userId = decoded.userId;
    next();

  } catch (error) {
    return res.status(401).json({message:"Invalid token"})
  }


}

export default authMiddleware;