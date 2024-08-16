import jwt from "jsonwebtoken";
import { UserDocument, UserModel } from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import { Response, Request, NextFunction } from "express";

const SCERET = process.env.SCERET || "";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type UserWithoutPass = Optional<UserDocument, "password">;

const assignJWT = (res: Response, user: UserWithoutPass) => {
  delete user.password;

  const token = jwt.sign({ user }, SCERET, { expiresIn: process.env.JWT_EXP_DATE });
  res.cookie("token", token, { sameSite: "none", secure: true }).status(201).json({
    status: "successfull !",
    data: {
      user,
      token,
    },
  });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword, profilePhoto } = req.body;
    const user: UserWithoutPass = await UserModel.create({
      name,
      email,
      password,
      confirmPassword,
      profilePhoto,
    });
    user.password = undefined;
    assignJWT(res, user);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await UserModel.findOne({ email: req.body.email }).select("+password");
    if (!user) return res.status(401).json({ message: "Incorrect email or password" });
    const isPasswordMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordMatch) return res.status(401).json({ message: "Incorrect email or password" });

    assignJWT(res, user);
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "").json({
    status: "success !",
    logout: true,
  });
};

export const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization || req.cookies.token;
    if (!token) throw new Error("please provide token");
    if (token.startsWith("Bearer")) token = token.split(" ")[1];
    const data = jwt.verify(token, SCERET);
    if (typeof data !== "string") {
      req.user = data.user;
    }
    next();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};
