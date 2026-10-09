import userModel from "../models/user.model.js";
import bcrypt, { compare } from "bcrypt"
import { createAccessToken, createRefreshToken ,readRefreshToken} from "../utils/auth.utils.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
    const { email, name, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({
        email: email
    })
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Already exist with the email"
        })
    }
    const user = await userModel.create({
        email: email,
        name: name,
        passwordHash: await bcrypt.hash(password, 10) //bcrypt.compare(password,user.password)
    })
    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    })
    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    await userModel.findByIdAndUpdate(user._id,
        {refreshToken}
    )
    return res.status(201).json({
        message: "User registered",
        data: {
            user: user,
            accessToken: accessToken
        }
    })
}
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    })
    if (!user) {
        return res.status(400).json({
            message: "Invalid User",
            data: {
                email,
                password
            }

        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.passwordHash);
    console.log(isPasswordValid)
    if(!isPasswordValid){
        return res.status(400).json(
            {
                message:"The password is not correct"
            }
        )
    }
    const accessToken=createAccessToken({
        userId:user._id,
        role:user.role
    })
    const refreshToken=createRefreshToken({
        userId:user._id,
        role:user.role
    })
    await userModel.findOneAndUpdate({email},
        refreshToken,{
            httpOnly:true
    })
    res.status(200).json({
        message:"User logged in successfully",
        data:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
}
export const refreshController=async (req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message:"Refresh Token is required"
        })
    }
    try{
        const {userId,role}= readRefreshToken(refreshToken)
        const user=await userModel.findById(userId);
        if(refreshToken != user.refreshToken){
              await userModel.findByIdAndUpdate({userId},{
                refreshToken:null
            })
            return res.status(401).json({
                message:"Refresh token mismatch"
            })
        }
        const accessToken=createAccessToken({
            userId:user._id,
            role:user.role
        })
        const newRefreshToken=createRefreshToken({
            userId:user._id,
            role:user.role
        })
        await userModel.findByIdAndUpdate(user._id,{
            refreshToken:newRefreshToken
        });
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true
        })
        res.status(200).json({
            message:"Token created successfully",
            data:{
                user:{
                    email:user.email,
                    name:user.name,
                    id:user._id
                },
                accessToken
            }
        })
        
    }
    catch(err){
        return res.status(400).json({
            message:"Invalid Refresh Token"
        })
    }

}
export const getMe= async (req,res)=>{
    const {userId,role}=req.user;
    const user=await userModel.findById(userId);
    return res.status(200).json({
        message:"User data",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id,
            }
        }
    })
}