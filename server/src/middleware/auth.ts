import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

interface AuthRequest extends Request {
  user?: IUser;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as IUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export default auth; 