import express,{NextFunction, Request,Response} from 'express';
import { Book } from '../models/book';
import { currentUser, isEmployee, requireAuth } from '@taoblob/commons';

const router = express.Router();
router.get("/api/stores",currentUser,async(req:Request,res:Response,next:NextFunction)=>{
    const books = await Book.find({});
    res.send(books);
   
});
export {router as storeBookRouter}