import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.js";
import bcryptjs from "bcryptjs"


const assignJWT = (res, user)=>{
   user.password = undefined
  const token = jwt.sign({user}, process.env.SCERET, {expiresIn: process.env.JWT_EXP_DATE})
  res.cookie("token", token, { sameSite: 'none', secure: true}).status(201).json({
    status: "successfull !",
    data: {
      user,
      token
    },
  });
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, profilePhoto } = req.body;
    const user = await UserModel.create({
      name,
      email,
      password,
      confirmPassword,
      profilePhoto,
    });
    user.password = undefined
assignJWT(res, user)

  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err,
    });
  }
};

export const login = async (req, res)=>{
  try {
    
    if(!req.body.email || !req.body.password) return res.status(400).json({message: "Email and password are required"})

      const user = await UserModel.findOne({email: req.body.email}).select("+password")
      if(!user) return res.status(401).json({message: "Incorrect email or password"})
      const isPasswordMatch = await bcryptjs.compare(req.body.password, user.password)
      if(!isPasswordMatch) return  res.status(401).json({message: "Incorrect email or password"})

   assignJWT(res, user)

   
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
}

export const logout = async (req, res)=>{
  res.cookie("token", "").json({
    status: "success !",
    logout: true
  })
}

export const protect = async (req, res, next)=>{

  try {
    let token = req.headers.authorization || req.cookies.token
    if(!token) throw new Error("please provide token")
    if(token.startsWith("Bearer")) token = token.split(" ")[1] 
    const data = jwt.verify(token, process.env.SCERET)
 req.user = data.user
 next()
    
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
}
