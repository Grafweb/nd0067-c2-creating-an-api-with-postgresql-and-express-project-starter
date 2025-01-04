import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string);
    // Almost done
  } catch {
    return res.sendStatus(403);
  }
  next();
};

export default authorization;
