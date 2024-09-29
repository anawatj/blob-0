import { currentUser, isEmployee, NotAuthorizedError, NotFoundError, requireAuth } from '@taoblob/commons';
import express,{NextFunction, Request,Response} from 'express';
import { Order } from '../models/order';

const router = express.Router();
router.delete("/api/orders/:id",currentUser,isEmployee, async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.params.id);
        const order = await Order.findById(req.params.id);
        if(req.currentUser?.role=="USER"){
            if(order?.userId!=req.currentUser!.id){
                throw new NotAuthorizedError();
            }
        }
        if(!order){
            throw new NotFoundError();
        }
        await order.deleteOne({});
        res.send({});
    }catch(err :any){
        next(err)
    }
   
});

export {router as deleteOrderRouter}