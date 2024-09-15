import express from 'express';
import json from 'body-parser';
import cookieSession from "cookie-session";
import {errorHandler} from '@taoblob/commons';
import { NotFoundError } from '@taoblob/commons';
import { indexOrderRouter } from './routes';
import { createOrderRouter } from './routes/new';
import { updateOrderRouter } from './routes/update';
import { showOrderRouter } from './routes/show';
import { deleteOrderRouter } from './routes/delete';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(indexOrderRouter);
app.use(createOrderRouter);
app.use(updateOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.all('*', async (req, res,next) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export {app};