import { Publisher, OrderApprovedEvent, Subjects } from "@taoblob/commons";

export class OrderApprovedPublisher extends Publisher<OrderApprovedEvent> {
    subject: Subjects.OrderApproved = Subjects.OrderApproved
}