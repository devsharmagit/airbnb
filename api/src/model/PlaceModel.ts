import mongoose, { Document } from "mongoose";

// Define the PhotoType interface
export interface PhotoType {
  url: string;
  publicId: string;
}

// Define the Place document interface
interface PlaceDocument extends Document {
  owner: mongoose.Types.ObjectId;
  title: string;
  address: string;
  photos: PhotoType[];
  description: string;
  perks?: string[];
  extraInfo?: string;
  maxGuests: number;
  price: number;
  location: {
    type: string;
    coordinates: number[];
  };
  mainImage?: PhotoType;
  favourites: mongoose.Types.ObjectId[];
  favCount: number;
}

// Define the Place schema
const PlaceSchema = new mongoose.Schema<PlaceDocument>(
  {
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
      required: true,
    },
    photos: {
      type: [
        {
          url: String,
          publicId: String,
        },
      ],
      required: true,
      validate: {
        validator: function (value: PhotoType[]) {
          if (value.length < 5) return false;
          return value.length <= 10;
        },
        message: "Maximum 10 photos are allowed",
      },
    },
    description: {
      type: String,
      minLength: 5,
      maxLength: 1000,
      required: true,
    },
    perks: [String],
    extraInfo: {
      type: String,
      maxLength: 1000,
    },
    maxGuests: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: [true, "Accommodation must have a price"],
      default: 10,
      min: 10,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },
    mainImage: {
      type: {
        url: String,
        publicId: String,
      },
      default: function (this: PlaceDocument) {
        return this.photos[0];
      },
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    favCount: {
      type: Number,
      default: function (this: PlaceDocument) {
        return this.favourites.length;
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Define virtual fields
PlaceSchema.virtual("bookings", {
  ref: "booking",
  foreignField: "place",
  localField: "_id",
});

// Create a geospatial index for the location field
PlaceSchema.index({ location: "2dsphere" });

// Export the Place model
export const PlaceModel = mongoose.model<PlaceDocument>("place", PlaceSchema);
