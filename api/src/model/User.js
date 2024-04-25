import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "user must have a name"],
    minLength: [3, "name should have at least 3 charators"] ,
    maxLength: [30, "name should not contain more than 30 characters"] 
  },
  email:{
    type: String,
    required: [true, "user must have a email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Entered email is not valid"
    }
  },
  password: {
    type: String,
    required: [true, "user must have a password"],
    select: false,
    minlength: [8, "password should be equal or grater than 8"]
  },
  confirmPassword:{
type: String,
required: true,
validate:{
  validator: function(value){
    return this.password === value
  },
  message: "password don't match"
}
  },
  profilePhoto: {
 type: {
  url: String,
  publicId: String
 }
  }
});

UserSchema.pre("save", async function(next){
  if(this.isModified){
    this.confirmPassword = undefined
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export const UserModel = mongoose.model('user', UserSchema)