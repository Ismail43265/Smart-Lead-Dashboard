import { Request, Response } from "express";
import {User} from "../models/user.model";
import { sendToken } from "../utils/sendToken";


export const signup = async (req: Request, res: Response): Promise<void>=>{
    try{
        const {name, email, password}=req.body;
        if(!name || !email || !password){
            res.status(400).json({
                success: false,
                message: "Name, email and Password required"
            });
            return;
        }

        const existingUser= await User.findOne({email});

        if(existingUser){
            res.status(400).json({
                success: false,
                message: "user already exist"
            });
            return;
        }

        const user= await User.create({
            name,
            email,
            password,
            role: "user",
        });

       

      sendToken(user, 201, res, "User signup successful");
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "signup failed",
            error,
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {email, password} = req.body;
        if(!email|| !password){
            res.status(400).json({
                success: false,
                message: "email ans password required",
            });
            return;
        }

        const user= await User.findOne({email}).select("+password");

        if(!user){
            res.status(400).json({
                success: false,
                message: "Invalid email and password",
            });
            return;
        }

        const isMatch= await user.comparePassword(password);

        if(!isMatch){
            res.status(400).json({
                success: false,
                message: "wrong password"
            });
            return;
        }

        sendToken(user, 200, res, `${user.role} login successful`);
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Login Failed",
            error,
        });
    }
};

export const getMe =async (req: Request, res: Response): Promise<void>=>{
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};