const express = require('express');
const dotenv =  require('dotenv');


//Load env vars/load config files
dotenv.config({path:'./config/config.env'});

const app =  express();

//all bootcamp
app.get('/api/v1/bootcamps',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: 'Show all bootcamps'});
})
//single bootcamp
app.get('/api/v1/bootcamps/:id',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: `Get a bootcamp ${req.params.id}`});
})
//Create bootcamp
app.post('/api/v1/bootcamps',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: 'Create a new bootcamp'});
})
//Update bootcamp
app.put('/api/v1/bootcamps/:id',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
})
//Remove/delete bootcamp
app.delete('/api/v1/bootcamps/:id',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
})

const PORT =  process.env.PORT || 5000;



app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))