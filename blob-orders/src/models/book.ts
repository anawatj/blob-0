import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface BookAttrs {
    isbn: string;
    name: string;
    price: number;
    releaseDate: Date;
    author: string;
    genre: string;
    publisher: string;
    series: string[];
    language: string;
    additionals: string[];
    qty: number;
    userId: string;
}

interface BookModel extends mongoose.Model<BookDoc>{
    build(attrs:BookAttrs):BookDoc;
    findByEvent(event: {
        id: String;
        version: Number;
      }): Promise<BookDoc | null>;
}
interface BookDoc extends mongoose.Document {
    isbn: string;
    name: string;
    price: number;
    releaseDate: Date;
    author: string;
    genre: string;
    publisher: string;
    series: string[];
    language: string;
    additionals: string[];
    qty: number;
    userId: string;
}

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date ,
        required:true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    series: {
        type: [String],
        default:[]
    },
    language: {
        type: String,
        required: true
    },
    additionals: {
        type: [String],
        default:[]
    },
    qty: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }

},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id
        }
    }
});
bookSchema.set('versionKey', 'version');
bookSchema.plugin(updateIfCurrentPlugin);
bookSchema.statics.findByEvent=(event: { id: string; version: number }) => {
    return Book.findOne({
        _id: event.id,
        version: event.version - 1,
    });
  };
bookSchema.statics.build = (attr: BookAttrs) => {
    return new Book(attr);
}
bookSchema.methods.isReserved = async function () {
    // this === the ticket document that we just called 'isReserved' on
   /* const existingOrder = await Order.findOne({
      ticket: this as any,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });*/
  
    //return !!existingOrder;
  };
const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };