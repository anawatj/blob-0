import { Subjects } from "./subjects";
export interface BookCreatedEvent {
    subject: Subjects.BookDeleted;
    data: {
        id: String;
    };
}
