import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import  {OrderStatus}   from '@taoblob/commons';
interface OrderAttrs{
    orderName:String ,
    orderDate:Date ,
    orderStatus:OrderStatus,
    shipName:String ,
    shipAddress:String ,
    items:[{bookId:String,price:Number,qty:Number}],
    userId:String
}
interface OrderDoc extends mongoose.Document {
    orderName:String ,
    orderDate:Date ,
    orderStatus:OrderStatus,
    shipName:String ,
    shipAddress:String ,
    items:[{bookId:String,price:Number,qty:Number}],
    userId:String,
    version:Number
}
interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs:OrderAttrs):OrderDoc;
}
const orderSchema = new mongoose.Schema({
    orderName:{
        type:String,
        required:true
    },
    orderDate:{
        type:mongoose.Schema.Types.Date
    },
    orderStatus: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Waiting,
      },
    shipName:{
        type:String,
        required:true
    },
    shipAddress:{
        type:String,
        required:true 
    },
    items:{
        type:Array,
        required:false 
    },
    userId:{
        type:String,
        required:true
    }

} ,
{
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  });
orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };