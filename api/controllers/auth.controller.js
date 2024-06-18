import User from "../modals/user.model.js";
import bcrypt from 'bcryptjs'
// import jwt from "jsonwebtoken"
import jwt from 'jsonwebtoken';
import {errorHandler} from "../utils/error.js"


export const signin =async (req,res , next )=>{

    // console.log(req.body)

    const {username,email,password} = req.body;

    if (!username || !email || !password) {
        return next(errorHandler(400, "Username, email, and password are required"));
    }


    const hashedPassword = bcrypt.hashSync(password,10);

    const newUser = new User({ username , email , password : hashedPassword});
    try{
       await newUser.save();
       res.status(201).json('User created successfully!')
    }catch(error){
         next(error)
    }
}

export const Login =async (req,res,next)=>{

    const { email ,password } = req.body;

    try{
       const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404,"User not found!"));
    const validPassword = bcrypt.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401,"Wrong crediantials!"));
    const token = jwt.sign({ id:validUser._id}, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc;
    res
    .cookie('access_token',token,{ httpOnly: true})
    .status(200)
    .json(rest)
    }
    catch(error){
      next(error)
    }
}