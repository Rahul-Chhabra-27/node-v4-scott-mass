import express from 'express';
import productRouter from '../routes/productRoute';
import updateRoute from '../routes/UpdateRoute';
import updatePointRoute from '../routes/updatePoint';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { protect } from '../modules/auth';
import { createUser, signIn } from './handlers/user';
const app = express();
dotenv.config();

// middlewares..........
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(morgan('dev'));

app.use('/api/product',protect,productRouter);
app.use('/api/update',protect,updateRoute);
app.use('/api/updatepoint',protect,updatePointRoute);

app.use('/user',createUser);
app.use('/singin',signIn);

app.listen(3000,() => console.log(`server is started on http://localhost:3000`));