import express,{Request,Response} from 'express';
import { Order } from '../models/order';
import { currentUser,requireAuth } from '@taoblob/commons';

const router = express.Router();
router.get("/api/orders",currentUser,requireAuth,async(req:Request,res:Response)=>{
    if(req.currentUser!.role=="MANAGER"){

        const orders = await Order.find({});
        res.send(orders);
    }else{
        const orders = await Order.find({userId:req.currentUser!.id})
        res.send(orders);
    }
});
export {router as indexOrderRouter}