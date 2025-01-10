import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//middleware for checking authorization
const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    //veryfiy token
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch {
    return res.sendStatus(403);
  }
  next();
};

export default authorization;
