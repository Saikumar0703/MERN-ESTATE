import express from 'express'
import User from '../modals/user.model.js';
import { text } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/',async()=>{
    try{
        const users =await User.find()
        res.status(200).json(users)
    }catch(err){
      res.status(500).json({message: err.message})
    }
})

export default router;