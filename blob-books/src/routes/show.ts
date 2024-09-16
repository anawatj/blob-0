import { currentUser, isEmployee, NotAuthorizedError, NotFoundError, requireAuth } from '@taoblob/commons';
import express,{NextFunction, Request,Response} from 'express';
import { Book } from '../models/book';

const router = express.Router();
router.get("/api/books/:id",currentUser,isEmployee, async(req:Request,res:Response,next:NextFunction)=>{
    try{
    
        const book = await Book.findById(req.params.id);
        if(req.currentUser?.role=="USER"){
            if(book?.userId!=req.currentUser!.id){
                throw new NotAuthorizedError();
            }
        }
        if(!book){
            throw new NotFoundError();
        }
        res.send(book);
    }catch(err :any){
        next(err)
    }
   
});

export {router as showBookRouter}