const path = require("path");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const ErrorResponse = require("../utils/errorResponse");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);

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
});

//@desc     Get a single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
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

  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     Create a new bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  // res.status(200).json({success:true, msg: 'Create a new bootcamp'});

  //Add user to req.body
  req.body.user = req.user.id;

  //Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  //If the user role is not admin , they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with this ID ${req.user.id} has already published a bootcamp`,
        400
      )
    );
  }

  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     Update a bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  // res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});

  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     Delete a bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  // res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc     Get bootcamps within a radius
//@route   GET/api/v1/bootcamps/radius/:zipcode/:distance
//@access   Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //Calculate the radius using radians
  //Divide distance by radius of Earth
  //Earth Radius = 3,963 mi/ 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//@desc     Upload photo for bootcamp
//@route    PUT /api/v1/bootcamps/:id/photo
//@access   Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  // res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a  file`, 400));
  }

  // console.log(req.files);

  const file = req.files.file;

  //Make sure the image is a  photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //  Check filesize

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  //cREATE custome file name

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  // console.log(file.name);
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file uploding`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
