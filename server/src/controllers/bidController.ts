import mongoose from "mongoose";
import { AuthRequest } from "../middleware/authMiddleware";
import { getIO } from "../socket";
import Bid from "../models/Bid";
import { Response } from "express";
import Gig from "../models/Gig";

export const submitBid = async (req: AuthRequest, res: Response) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open") {
      return res.status(400).json({ message: "Gig not available" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.userId,
      message,
      price,
    });

    return res.status(201).json(bid);
  } catch {
    return res.status(500).json({ message: "Error submitting bid" });
  }
};

export const getBidsForGig = async (req: AuthRequest, res: Response) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId }).populate(
      "freelancerId",
      "name email"
    );

    return res.json(bids);
  } catch {
    return res.status(500).json({ message: "Error fetching bids" });
  }
};

export const hireBid = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig || gig.status !== "open") {
      await session.abortTransaction();
      return res.status(400).json({ message: "Gig already assigned" });
    }

    if (gig.ownerId.toString() !== req.userId) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Not authorized" });
    }

    bid.status = "hired";
    await bid.save({ session });

    gig.status = "assigned";
    await gig.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    //  SOCKET NOTIFICATION
    const io = getIO();
    io.to(bid.freelancerId.toString()).emit("hired", {
      gigTitle: gig.title,
    });

    return res.json({ message: "Freelancer hired successfully" });
  } catch {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Hiring failed" });
  }
};
