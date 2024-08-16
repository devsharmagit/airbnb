import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Request } from "express";

// Define the User document interface
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string; // This will be removed before saving the document
  profilePhoto?: {
    url: string;
    publicId: string;
  };
  isModified(path: string): boolean;
}

// Define the User schema
const UserSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: [true, "User must have a name"],
    minLength: [3, "Name should have at least 3 characters"],
    maxLength: [30, "Name should not contain more than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string): boolean {
        return validator.isEmail(value);
      },
      message: "Entered email is not valid",
    },
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    select: false,
    minlength: [8, "Password should be equal or greater than 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (this: UserDocument, value: string): boolean {
        return this.password === value;
      },
      message: "Passwords don't match",
    },
  },
  profilePhoto: {
    type: {
      url: String,
      publicId: String,
    },
  },
});

// Pre-save middleware for password hashing
UserSchema.pre<UserDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.confirmPassword = undefined; // Remove confirmPassword field
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
  }
  next();
});

// Export the User model
export const UserModel = mongoose.model<UserDocument>("user", UserSchema);

export interface RequestWithUser extends Request {
  user?: UserDocument;
}
