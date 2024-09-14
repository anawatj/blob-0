import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { currentUser, requireAuth, validateRequest } from '@taoblob/commons';
import { Book } from '../models/book';

const router = express.Router()
router.post("/api/books",
currentUser,
requireAuth,
[
    body('isbn')
    .isString()
    .withMessage('isbn must be provided'),
    body('price')
    .isFloat({gt:0})
    .withMessage("price must be provided"),
    body('releaseDate')
    .isDate()
    .withMessage("releaseDate must be provided"),
    body('author')
    .isString()
    .withMessage('author is not incorrect format'),
    body("genre")
    .isString()
    .withMessage("genre must be provided"),
    body("publisher")
    .isString()
    .withMessage("publisher must be provided"),
    body("language")
    .isString()
    .withMessage("language must be provided"),
    body('qty')
    .isInt({gt:0})
    .withMessage("qty is not incorrect format")
],
validateRequest,
async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {isbn,price,releaseDate,author,genre,publisher,series,language,additionals,qty} = req.body;
        const book = Book.build({
            isbn,
            price,
            releaseDate,
            author,
            genre,
            publisher,
            series,
            language,
            additionals,
            qty,
            userId:req.currentUser!.id
        });
        await book.save();
        
        res.status(201).send(book);
    }catch(err:any){
        next(err);
    }
   
}
);
export {router as createBookRouter}