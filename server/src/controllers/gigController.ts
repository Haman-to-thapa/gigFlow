import { Request,Response } from "express";
import Gig from "../models/Gig";
import { AuthRequest } from "../middleware/authMiddleware";

export const createGig = async (req:AuthRequest,res:Response) => {
  try {

    const {title,description,budget} = req.body;

    if(!title || !description || !budget) {
      return res.status(400).json({message:"All fields required"})
    }

      const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req?.userId,
    });

     return res.status(201).json(gig);
    
  } catch (error) {
    return res.status(500).json({ message: "Error creating gig" });
  }
}

export const getOpenGigs = async (req:Request,res:Response) => {
  try {
    const search = req.query.search as string;
    const query:any = {status:'open'};

    if(search) {
      query.title = {$regex:search, $options:"i"}
    }

    const gigs = await Gig.find(query).sort({createdAt:-1});

        return res.json(gigs);
    
  } catch (error) {
    return res.status(500).json({ message: "Error fetching gigs" });
  }
}