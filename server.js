import express from 'express';
import connectDb from './config/connect.js';
import dotenv from "dotenv";
import router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config()


const app=express();
app.use(cookieParser())
app.use(cors({
    origin: process.env.Origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDb();

app.use("/api",router);


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
