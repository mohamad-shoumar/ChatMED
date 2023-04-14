import { Request, Response, NextFunction } from "express";

export const doctorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body;
  if (user.role !== "doctor") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
