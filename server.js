import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import connectDb from './config/connect.js';
import { S3Client } from "@aws-sdk/client-s3";
import router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';




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
export const s3 = new S3Client({ region: process.env.AWS_REGION });


app.use("/api",router);


app.listen(3000,()=>{
console.log("Server is running on port 3000");
})
