import express from 'express';
import multer from 'multer';
import json from 'body-parser';
import cookieSession from "cookie-session";
import {path as rootPath}  from 'app-root-path'
import {errorHandler} from '@taoblob/commons';
import { NotFoundError } from '@taoblob/commons';
import { indexBookRouter } from './routes';
import { createBookRouter } from './routes/new';
import { updateBookRouter } from './routes/update';
import { showBookRouter } from './routes/show';
import { deleteBookRouter } from './routes/delete';
import { storeBookRouter } from './routes/store';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(multer().single("file"));
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(indexBookRouter);
app.use(createBookRouter);
app.use(updateBookRouter);
app.use(showBookRouter);
app.use(deleteBookRouter);
app.use(storeBookRouter);
console.log(rootPath + '/uploads');
app.use('/api/books/uploads', express.static(rootPath + '/uploads'));
app.all('*', async (req, res,next) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export {app};