import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '@taoblob/commons';
import { User } from '../models/user';
import { BadRequestError } from '@taoblob/commons';

const router = express.Router();

router.post(
  '/api/users',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('role')
      .trim()
      .isString()
      .withMessage("role must be provided")
    
  ],
  validateRequest,
  async (req: Request, res: Response,next:NextFunction) => {
    try{
      const { email, password,role } = req.body;

      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        throw new BadRequestError('Email in use');
      }
  
      const user = User.build({ email, password,role:role });
      await user.save();

      console.log(user.role)
  
      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_KEY!
      );
  
      // Store it on session object
      req.session = {
        jwt: userJwt
      };
  
      res.status(201).send(user);
    }catch(err:any){
       next(err);
    }
   
  }
);

export { router as newUserRouter };