import { Subjects } from "./subjects";

export interface OrderApprovedEvent {
    subject:Subjects.OrderApproved;
    data:[{
        bookId:String ,
        price:Number,
        qty:Number
    }]
}