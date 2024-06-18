import express from 'express'
// import { signup } from '../controllers/auth.controller.js';
import { signin , Login } from '../controllers/auth.controller.js';


const route = express.Router();

route.post('/signup' , Login);
route.post('/signin' , signin );

export default route;