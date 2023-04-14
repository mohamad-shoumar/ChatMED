import { Request, Response, NextFunction } from "express";

export const patientMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body;
  if (user.role !== "patient") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
