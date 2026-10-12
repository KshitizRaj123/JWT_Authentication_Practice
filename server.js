require('dotenv').config()
const connectDB = require('./db/db')
const PORT= process.env.PORT||4000
const authRoutes= require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes')
const express = require('express')

const app=express();

console.log(PORT)

//middleware
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)


connectDB().then(app.listen(PORT,()=>
{
    console.log("Server started sucessfully");
}))


