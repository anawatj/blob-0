import express ,{NextFunction, Request,Response} from 'express';
import {body} from 'express-validator';
import { validateRequest,NotFoundError,requireAuth,NotAuthorizedError, currentUser, isEmployee } from '@taoblob/commons';
import { Order } from '../models/order';
//import { natsWrapper } from '../nats-wrapper';
import { OrderStatus } from '@taoblob/commons';
import { OrderApprovedPublisher } from '../events/order-approved-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put("/api/orders/:id",
currentUser,
isEmployee,
[
    body('orderName')
    .isString()
    .withMessage('orderName must be provided'),
    body('orderDate')
    .isDate()
    .withMessage("orderDate must be provided"),
    body('cardNumber')
    .isCreditCard()
    .withMessage("credit card must be provided"),
    body("cardHolder")
    .isString()
    .withMessage("card holder must be provided"),
    body('shipName')
    .isString()
    .withMessage('shipName is not incorrect format'),
    body('shipAddress')
    .isString()
    .withMessage('shipAddress is not incorrect format'),
    body('items')
    .isArray()
    .withMessage("items must be provided")
],
validateRequest,
async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new NotFoundError();
        }
        if(order.userId != req.currentUser!.id){
            throw new NotAuthorizedError();
        }
        order.set({
           orderName:req.body.orderName ,
           orderDate:req.body.orderDate,
           orderStatus:OrderStatus.Paid,
           cardNumber:req.body.cardNumber,
           cardHolder:req.body.cardHolder,
           shipName:req.body.shipName,
           shipAddress:req.body.shipAddress,
           items:req.body.items,
           userId:req.currentUser!.id
        });
        await order.save();

        const books = order.items;

        new OrderApprovedPublisher(natsWrapper.client).publish(books)
       
    
        res.send(order);
    }catch(err:any){
        next(err)
    }
   
});
export {router as updateOrderRouter}