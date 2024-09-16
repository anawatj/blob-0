import express, { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { path as rootPath } from 'app-root-path'
import fs from 'fs';
import path from 'path';
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError, currentUser, BadRequestError, isEmployee } from '@taoblob/commons';
import { Book } from '../models/book';
import { uploadFile } from '../services/file-service';

const router = express.Router()
router.put("/api/books/:id",
    currentUser,
    isEmployee,
    [
        body('isbn')
            .isString()
            .withMessage('isbn must be provided'),
        body('name')
            .isString()
            .withMessage("name must be provided"),
        body('price')
            .isFloat({ gt: 0 })
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
            .isInt({ gt: 0 })
            .withMessage("qty is not incorrect format")
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
           


            const book = await Book.findById(req.params.id);
            if (!book) {
                throw new NotFoundError();
            }
            if (req.currentUser!.role == "USER") {
                if (book.userId != req.currentUser!.id) {
                    throw new NotAuthorizedError();
                }
            }

            if (!req.file) {
                throw new BadRequestError("image must be provided");
            }
            

            const { isbn, name, price, releaseDate, author, genre, publisher, series, language, additionals, qty } = req.body;
            const image = uploadFile(req.file!);
            book.set({
                isbn,
                name,
                image,
                price,
                releaseDate,
                author,
                genre,
                publisher,
                series,
                language,
                additionals,
                qty
            });
            await book.save();

            res.status(200).send(book);
        } catch (err: any) {
            next(err);
        }

    }
);
export { router as updateBookRouter }