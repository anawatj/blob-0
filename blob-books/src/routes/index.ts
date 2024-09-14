import express,{Request,Response} from 'express';
import { Book } from '../models/book';
import { currentUser, requireAuth } from '@taoblob/commons';

const router = express.Router();
router.get("/api/books",currentUser,requireAuth,async(req:Request,res:Response)=>{
    console.log(req.currentUser!)
    if(req.currentUser!.role=="MANAGER"){
        const books = await Book.find({});
        res.send(books);
    }else{
        const books = await Book.find({userId:req.currentUser!.id})
        res.send(books);
    }
   
});
export {router as indexBookRouter}