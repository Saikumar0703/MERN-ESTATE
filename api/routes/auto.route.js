import express from 'express'
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';


const route = express.Router();

route.post('/signup' , signup);
route.post('/signin' , signin );

export default route;