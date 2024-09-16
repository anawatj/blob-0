import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { UserType } from '../types/user-type';

export const isEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser && req.currentUser?.role==UserType.CUSTOMER) {
    throw new NotAuthorizedError();
  }

  next();
};