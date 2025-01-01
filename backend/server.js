import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json());
app.use(cors());

// Api Endpoints
app.use('/api/user', userRouter);


//API Endpoints
app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



