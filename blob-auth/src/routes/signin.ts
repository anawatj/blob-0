import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/passsword';
import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@taoblob/commons';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response,next:NextFunction) => {
    try{
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
      }

      const passwordsMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (!passwordsMatch) {
        throw new BadRequestError("Invalid credentials");
      }

      console.log(existingUser.role)

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt
      };

      res.status(200).send(existingUser);
    }catch(err: any){
        next(err);
    }
    
  }
);

export { router as signinRouter };