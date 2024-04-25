import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    user: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, "booking must be done by a user"]
    },
    checkIn: {
        type: Date,
        required: [true, "booking must have a checkin date"],
    },
    checkOut:{
        type: Date,
        required: [true, "booking must have a checkout date"],
        validate: {
            validator: function(value){
                return value > this.checkIn
            },
            message: "CheckOut Date should be greater than CheckIn Date"
        }
    },
    place:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "place",
        required: [true, "booking must have a place"]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    totalPrice:{
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        default: true
    }

})

// virtual populate

BookingSchema.pre('find', function(next) {
    this.populate({
      path: 'place',
      select: 'title mainImage price address'
    }).select('-__v');
  
    next();
  });

// BookingSchema.pre('find', function(next) {
//     this.populate({
//       path: 'user',
//       select: '-__v'
//     })
//     next();
//   });
  




export const BookingModel = mongoose.model("booking", BookingSchema)