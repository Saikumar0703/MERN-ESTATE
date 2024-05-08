import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import route from './routes/auto.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB")
}).catch(()=>{
    console.log("Not connected to MongoDB Error...")
})

const app = express();

app.use(express.json())

app.listen( 3000 ,()=>{
   console.log("Server is running on Port 3000")
})
//req get from client side  (browser)
//res get from server 
app.use('/api/user', userRouter)

app.use('/api/auth', route)

