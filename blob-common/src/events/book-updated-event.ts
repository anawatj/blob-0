import { Subjects } from "./subjects";

export interface BookUpdatedEvent {
    subject:Subjects.BookUpdated;
    data:{
        id: String ,
        version: Number,
        isbn: String;
        name: String;
        price: Number;
        releaseDate: Date;
        author: String;
        genre: String;
        publisher: String;
        series: String[];
        language: String;
        additionals: String[];
        qty: Number;
        userId: String;
    };
}