import User from "../modals/user.model.js";
import bcrypt from 'bcryptjs'
// import jwt from "jsonwebtoken"
import jwt from 'jsonwebtoken';

export const signup =async (req,res , next )=>{

    // console.log(req.body)

    const {username,email,password} = req.body;

    const hashedPassword = bcrypt.hashSync(password,10);



    const newUser = new User({ username , email , password : hashedPassword});
    try{
       await newUser.save();
       res.status(201).json('User created successfully!')
    }catch(error){
         next(error)
    }
}

export const signin =async (req,res,next)=>{

    const { email ,password } = req.body;

    try{
       const validUser = await User.findOne({email});


    if(!validUser) return next(errorHandler(404,"User not found!"));
    const validPassword = bcrypt.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401,"Wrong crediantials!"));
    const token = jwt.sign({ id:validUser._id}, process.env.JWT_SECRET)
    res.cookie('access_token',token,{ httpOnly: true}).status(200).json(validUser)
    }
    catch(error){
      next(error)
    }
}