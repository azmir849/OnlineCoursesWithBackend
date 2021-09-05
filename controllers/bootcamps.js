const Bootcamp  = require('../models/Bootcamp');
const asyncHandler =  require('../middleware/async');
const ErrorResponse =  require('../utils/errorResponse');

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler ( async (req,res,next)=>{
    // res.status(200).json({success:true, msg: 'Show all bootcamps',hello:req.hello});

    //if does not have async handler

//    try {
//        const bootcamps = await Bootcamp.find();
//        res.status(200).json({
//            success: true,
//            count:bootcamps.length,
//            data:bootcamps,
//        })
//    } catch (err) {
//      next(err)
//    }

//if have async handler
       const bootcamps = await Bootcamp.find();
       res.status(200).json({
           success: true,
           count:bootcamps.length,
           data:bootcamps,
       })
})


//@desc     Get a single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp =  asyncHandler( async (req,res,next)=>{
    // res.status(200).json({success:true, msg: `Get a bootcamp ${req.params.id}`});
    // try {
    // const bootcamp  = await Bootcamp.findById(req.params.id);
    
    // if(!bootcamp){
    //   return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
    // }
    //     res.status(200).json({
    //         success:true,
    //         data:bootcamp,
    //     })
    // } catch (err) {
    //     // When get an error
    //     // res.status(400).json({
    //     //     success:false
    //     // })

    //     //When got specific error
    //     // next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));

    //     //When identify which error
    //     next(err)
    // }

    
    const bootcamp  =await Bootcamp.findById(req.params.id);
    
    if(!bootcamp){
      return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
    }
        res.status(200).json({
            success:true,
            data:bootcamp,
        })
})


//@desc     Create a new bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = asyncHandler( async (req,res,next)=>{
    // console.log(req.body);
    // res.status(200).json({success:true, msg: 'Create a new bootcamp'});

   
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
       success:true,
       data:bootcamp
   })
}) 


//@desc     Update a bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (req,res,next)=>{
    // res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
   
        const  bootcamp = await Bootcamp.findByIdAndUpdate( req.params.id,req.body,{
        new:true,
        runValidators: true,
    })
    if(!bootcamp){
         return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        data:bootcamp
    })
} ) 


//@desc     Delete a bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler( async(req,res,next)=>{
    // res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }

        res.status(200).json({
            success:true,
            data:{},
        })
} )