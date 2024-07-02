import { BookingModel } from "../model/BookingModel.js";
import { PlaceModel } from "../model/Place.js";
import { getBlockedDates } from "../utils/dateFunctions.js";
import { format } from "date-fns";
import { deleteCloudnaryImage } from "./imageController.js";


export const getAllPlaces = async (req, res) => {
  try {

    const excludedFields = ['sort', 'limit', 'page','fields', 'latitude', 'longitude', 'searchString']
    const queryObj = {...req.query}

    excludedFields.forEach((value)=>{
      delete queryObj[value]
    })

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in|all)\b/g, match => `$${match}`);

queryStr = JSON.parse(queryStr)

if(queryStr.perks){
  let allPerks = queryStr.perks['$all'].split(",")
  queryStr.perks['$all'] = allPerks
}

    let query =  PlaceModel.find(queryStr); 

    if(req.query.searchString){
      query = query.find({title: {$regex: req.query.searchString, $options: "i" }})
    }
    const totalPlaces = await PlaceModel.countDocuments(query);

if(req.query.sort === 'far'){
  query = query.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
        },
        $maxDistance: 1000000000
      },
    },
  }).sort({
    location: 1,
  });
}
if(req.query.sort === "near"){

  query = query.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
        },
        $maxDistance: 1000000000
      },
    },
  }).sort({
    location: -1,
  });
}
    
    if(req.query.sort !== "far" && req.query.sort !== "near"){
          query = query.sort(req.query.sort)
      }
     
     

      if(req.query.fields){
        const fieldParameters = req.query.fields.split(",").join(" ")
        query = query.select(fieldParameters)
      }else{
        query = query.select("-__v")
      }  


    
      if(req.query.limit){
        query = query.limit(req.query.limit)
      }else{
        query = query.limit(10)
      }
        if(req.query.page){
          let limit = req.query.limit * 1 || 10
          let skip = (req.query.page - 1) * limit
          query = query.skip(skip).limit(limit)
        }
       
   
       
        const places = await query.sort("-createdAt")


    res.status(200).json({
      status: "success",
      length: places.length,
      totalPlaces,
      places,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


export const getAllMap = async (req,res)=>{
try {
  const places = await PlaceModel.find().select("title price mainImage location").sort("-createdAt")
  return res.status(200).json({
    places,
    length: places.length
  })
} catch (error) {
  console.log(error)
  res.status(500).json({
    status: "fail",
    message: error.message,
  });
}
}


export const addAPlace = async (req, res) => {
  try {

    const place = await PlaceModel.create({
     ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
        status: "success",
        place
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getOnePlace = async (req,res)=>{
  try {
    const placeId = req.params.id
    const place = await PlaceModel.findById(placeId).populate({
      path: "owner",
      select: "-__v"
    })
  if(!place) throw new Error("no such place found")

  const today = Date.now()
    const formattedDate = format(today, 'yyyy-MM-dd')
  const bookings = await BookingModel.find({place: place._id, active: true, checkOut: {$gte: formattedDate} })

  const blockedDates = getBlockedDates(bookings)


  res.status(200).json({
    status: "success",
    place,
    blockedDates,
  })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
}

export const getAllUserPlaces = async (req,res)=>{
  try {
   
    const places = await PlaceModel.find({owner: req.user._id}).sort("-updatedAt").select("mainImage title price description favourites")

    res.status(200).json({
      status: "success",
      length: places.length,
      places,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "amg",
      message: error,
    });
  }
}


export const byFavourite = async(req,res)=>{
  const places = await PlaceModel.find().sort({"favourites.length": -1})
  res.json({places})
}


export const updateAPlace = async(req,res)=>{
  try {
    const userId = req.user._id
    const placeId = req.params.id
    const place = await PlaceModel.findById(placeId)

    if(!place) throw Error("can not find place with this id")
    if(  place.owner.toString() !== userId) throw Error("only owner can update its own place")
    if(req.body.owner) throw Error("owner cant be updated")

    const oldPhotos = place?.photos
    const newPhotos = req.body.photos

    oldPhotos.forEach(value => {
      if (!newPhotos.find(photo => photo.publicId === value.publicId)) {
          // deleteImage(value.publicId);
          deleteCloudnaryImage(value.publicId)
      }
  });
  
req.body.mainImage = newPhotos[0]
    const newPlace =  await PlaceModel.findByIdAndUpdate(placeId, {...req.body}, {new: true, runValidators: true})    

    res.status(200).json({
      status: "updated",
      updatedPlace: newPlace
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export const deleteAPlace = async(req,res)=>{
  try {

    const userId = req.user._id
    const placeId = req.params.id
    const place = await PlaceModel.findById(placeId)

 

    if(!place) throw Error("can not find place with this id")
    if(place.owner.toString() !== userId) throw Error("only owner can delte its own place")

    const photos = place.photos

    photos.forEach(({publicId})=>{
      //  deleteImage(fileName)
       deleteCloudnaryImage(publicId)
    })
    await BookingModel.deleteMany({place: placeId})
    await PlaceModel.findByIdAndDelete(placeId)

      res.status(204).json({
        status: "deleted"
      })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export const getFavouritePlaces = async (req, res)=>{
  try {
    const places = await PlaceModel.find({favourites: req.user._id}).sort("-createdAt").select("title description price mainImage favourites")
    res.json({
      places
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}