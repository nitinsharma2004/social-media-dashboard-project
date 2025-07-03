import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authrouter from "./routes/auth.js";
import analyics from "./routes/analytics.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const configures= {
    Credential:true,
    origin: "http://localhost:5173"
}
app.use(express.json());
app.use(cors(configures));
app.use("/auth",authrouter);
app.use("/analytics",analyics);

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log(err);
    });
};
app.listen(3000,()=>{
    console.log("server start");
    connect();
})