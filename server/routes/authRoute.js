// In this file => Request aayi → kis controller ko deni hai → yahin decide hota hai.
import express from 'express'
import { logout, register, login } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)


export default authRouter;

