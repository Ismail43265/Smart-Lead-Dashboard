import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../models/user.model";

export const sendToken = (
  user: IUser,
  statusCode: number,
  res: Response,
  message: string
): void => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing in .env file");
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  const token = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    secret,
    options
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,
    message,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};