import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {User, UserRole} from "../models/user.model";

interface JwtPayload{
    id: string;
    role: UserRole;
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{
        let token: string | undefined;
         if (req.cookies?.token) {
            token = req.cookies.token;
        }

        const authHeader = req.get("Authorization");
        if(!token && authHeader && authHeader.startsWith("Bearer")){
            token=authHeader.split(" ")[1];
        }

        if(!token){
            res.status(401).json({
                success: true,
                message: "Not authorized, token is missing"
            });
            return;
        }

        const secret= process.env.JWT_SECRET;
        if(!secret){
            throw new Error("JWT_SECRET is missing in .env file");
        }

        const decoded= jwt.verify(token, secret) as JwtPayload;

        const user= await User.findById(decoded.id).select("-password");

        if(!user){
             res.status(401).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        req.user= {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        };

        next();
    }
    catch(error){
        res.status(401).json({
            success: false,
            message: "Token verifaction failed",
            error,
        });
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction): void =>{
    if(req.user?.role !== "admin"){
        res.status(401).json({
            success: false,
            message: "Access denied , admin only",
        });
        return;
    }
    next();
};