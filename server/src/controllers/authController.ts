import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/User";



const createToken = (userId:string) => {
  return jwt.sign({userId},process.env.JWT_SECRET as string,{
    expiresIn:'7d'
  })
}


// register here

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
   catch (error) {
  console.error("REGISTER ERROR 👉", error);
  return res.status(500).json({
    message: "Server error at register",
    error,
  });
}

  }


export const login = async (req:Request, res:Response) => {
  try {
    
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(400).json({message:"Email or password requierd"})
    }

    const user = await User.findOne({email});

    if(!user) {
      return res.status(401).json({message:"Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(401).json({message:"Invalid credentials"})
    }

    const token = createToken(user._id.toString());

       res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


     return res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
      return res.status(500).json({ message: "Server error at login" });
  }
}

export const logout = async (req:Request, res:Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({ message: "Logged out successfully" });
};
