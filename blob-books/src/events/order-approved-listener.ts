import { Listener, OrderApprovedEvent, Subjects } from "@taoblob/commons";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Book } from "../models/book";

export class OrderApprovedListener extends Listener<OrderApprovedEvent>{
    subject: Subjects.OrderApproved = Subjects.OrderApproved;
    queueGroupName: string= queueGroupName
    async onMessage(data: [{ bookId: String; price: Number; qty: Number; }], msg: Message)  {
        for(var index=0;index<data.length;index++){
            const item = data[index];
            const book = await Book.findById(item.bookId)
            const qty = book!.qty-(item.qty as number)
            book!.set({
                qty:qty
            })
            await book!.save();
            

        }
        msg.ack()
    }
}