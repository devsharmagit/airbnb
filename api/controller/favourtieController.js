// always remember to put .js in the end of the file path
import { PlaceModel } from "../model/Place.js"

export const addToFavourite = async(req, res)=>{
try {
   const placeId = req.body.place 
   const userId = req.user._id
   const place = await PlaceModel.findById(placeId)
   
    if(place.favourites.includes(userId)) throw Error("user can't be added more than once")

    place.favourites = [...place.favourites, userId]
    place.favCount = place.favCount + 1

    const savedDoc = await  place.save()

    res.status(201).json({
        status:"success",
        favourites: savedDoc.favourites
    })

} catch (error) {
    res.status(500).json({
        status: "fail",
        error: error.message
    })
}
}



export const deleteAfav = async(req,res)=>{
    try {
        const placeId = req.body.place 
        const userId = req.user._id
        const place = await PlaceModel.findById(placeId)
         if(!place.favourites.includes(userId)) throw Error("user is already not added so cant remove")
         place.favourites = place.favourites.filter((value)=>{
            return value.toString() !== userId
         })
         place.favCount = place.favCount - 1
         const savedDoc = await  place.save()
         res.status(200).json({
             status:"success",
             favourites: savedDoc.favourites
         })   
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}