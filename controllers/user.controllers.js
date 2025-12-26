import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async(req,res)=>{
    try {

        const {channelName,password,phone,email} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const uploadImage = await cloudinary.uploader.upload(
            req.files.logoUrl.tempFilePath
        )

        console.log(uploadImage);
        const newUser = new User({
            email:email,
            password:hashedPassword,
            channelName:channelName,
            phone:phone,
            logoUrl:uploadImage.secure_url,
            logoId:uploadImage.public_id,

        })

        let user = await newUser.save();

        res.status(201).json({
            user
        })
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "something went wrong", message: error.message });
    }
}

export const login = async(req,res)=>{

    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValid = await bcrypt.compare(password,existingUser.password);

        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign (
            {
            _id:existingUser._id,
            channelName:existingUser.channelName,
            email: existingUser.email,
            phone: existingUser.phone,
            logoId: existingUser.logoId,
            },
            process.env.JWT_SECRET,
            {expiresIn:"10d"}
        );

        const user = existingUser.toObject();
        delete user.password;

        res.status(200).json({
            ...user,
            token
    })

    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "something went wrong", message: error.message });
    }
}