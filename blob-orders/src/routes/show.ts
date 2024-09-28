import { currentUser, isEmployee, NotFoundError, requireAuth } from '@taoblob/commons';
import express,{NextFunction, Request,Response} from 'express';
import { Order } from '../models/order';

const router = express.Router();
router.get("/api/orders/:id",currentUser,isEmployee, async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(req.currentUser?.role=="USER"){
            if(order?.userId!=req.currentUser!.id){
                throw new NotFoundError();
            }
        }
        if(!order){
            throw new NotFoundError();
        }
     
    }catch(err :any){
        next(err)
    }
   
});

export {router as showOrderRouter}