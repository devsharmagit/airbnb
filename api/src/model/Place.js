import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  address: {
    type: String,
    minLength: 5,
    maxLength: 500,
    required: true
  },
  photos: {
    type: [{
      url: String,
      publicId: String
    }],
    required: true,
    validate: {
      validator: function(value){
        if(value.length < 5) return false
        return value.length <= 10
      },
      message: "maxium 10 photos are allowed"
    }
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 1000,
    required: true
  },
  perks: [String],
  extraInfo: {
    type: String,
    maxLength: 1000
  },
  maxGuests: {
    type: Number,
    default: 1
  },
  price:{
    type: Number,
    required: [true, "Accomodation must have a price"],
    default: 10,
    minimum: 10
  },
  location:{
    type:{
      type: String,
      default: "Point",
    },
    coordinates:[Number],
  },
  mainImage:{
    type: {
      url: String,
      publicId: String
    },
    default: function(){
      return this.photos[0]
    } 
  },
  favourites:[
    {type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    }
  ],
  favCount: {
    type:Number,
    default: function(){
      return this.favourites.length
    } 
  }
}, {timestamps: true,toJSON: {virtuals: true}, toObject: {virtuals: true}});

// virtual fields
PlaceSchema.virtual("bookings", {
  ref: "booking",
  foreignField: "place",
  localField: "_id"
})

PlaceSchema.index({ 'location': '2dsphere' })

export const PlaceModel = mongoose.model("place", PlaceSchema);


// PlaceSchema.pre(/^find/, function(next){
//   this.populate({
//       path:"owner",
//       select: "-__v"
//   })

//   next()
// })

// PlaceSchema.pre(/^find/, function(next){
// this.populate("bookings")
//   next()
// })
