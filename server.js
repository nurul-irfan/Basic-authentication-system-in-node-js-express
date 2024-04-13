import { connectMongoDB } from './config/index.js';


// CRUID

import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import userRouters from "./routers/user.js";
dotenv.config()

const port= process.env.PORT ?? 3000
connectMongoDB(`${process.env.DATABASE_URL}`,"irfan")


const app =express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// group routers for user
app.use("/api/v1/user",userRouters)
// group routes for product
// app.use("/api/v1/product",productRouter)


app.listen(port, ()=>{
    console.log(`server running on ${port}`);
})
