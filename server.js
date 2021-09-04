const express = require('express');
const dotenv =  require('dotenv');
const morgan = require('morgan');
const connectDB  = require('./config/db')

//Route files
const bootcamps = require('./routes/bootcamps')

//Load env vars/load config files
dotenv.config({path:'./config/config.env'});

//Connect to database 
connectDB();

const app =  express();

//Dev logging middleware
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}


//Mount Routers
app.use('/api/v1/bootcamps',bootcamps)


const PORT =  process.env.PORT || 5000;



const server = app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

//Handle unhandle promise rejections
process.on('unHandleRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`);
    //close server and exit process
    server.close(()=>process.exit(1));
})