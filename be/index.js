const dotenv=require('dotenv').config()
const express=require('express')
const mongoose = require('mongoose');
const {log} = require('./utility/AppUtils')
const authRoutes = require('./routes/AuthRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const propertyRoutes = require('./routes/PropertyRoutes')

// APPLICATION CONFIG

const port=8080;
const app=express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}))


mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.once('connected',()=> log('DATABASE CONNECTED'))
mongoose.connection.once('error',(err)=>log('DATABASE ERROR ${err}'))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/property',propertyRoutes)


// DATABASE CONFIG
app.listen(port,()=>log(`App started on port ${port}`))