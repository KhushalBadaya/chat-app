import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../email/emailhandler.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    generateToken(savedUser._id, res);

    res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      profilePic: savedUser.profilePic
    });
     try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req,res)=>{
 const {email,password}=req.body;
 try{
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({message:"Invalid credentials"})
  const isPasswordCorrect = await bcrypt.compare(password,User.password);  
  if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})
  generateToken(user_.id,res);
  res.status(200).json(
  {  _id: user._id,
    fullName: user.fullName,
    email:user.email,
    profilePic:user.profilePic,
    }
  );}
  catch(error){
    console.error("Error in login controller");
    res.status(400).json({message:"Inter Server Error"});
  }
};

export const logout = async (_,res)=>{
  res.cokkie("jwt","",{maxAge:0})
  res.status(200).json({message:"Logout Successfully"})
};

export const updateProfile=async(req,res)=>{
    try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};