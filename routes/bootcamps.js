const express = require('express')
const router =  express.Router();


//all bootcamps
router.get('/',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: 'Show all bootcamps'});
})
//single bootcamp
router.get('/:id',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: `Get a bootcamp ${req.params.id}`});
})
//Create bootcamp
router.post('/',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: 'Create a new bootcamp'});
})
//Update bootcamp
router.put('/:id',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
})
//Remove/delete bootcamp
router.delete('/:id',(req,res)=>{
    // res.send('Response text  from express')
    res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
})

module.exports = router;
