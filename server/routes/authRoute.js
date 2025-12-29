// In this file => Request aayi → kis controller ko deni hai → yahin decide hota hai.
import express from 'express'
import { logout, register, login, sendVerifyOtp, sendResetOtp, verifyEmail, isAuthenticated, resetPassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
// authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
// authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/send-verify-otp', sendVerifyOtp);
authRouter.post('/verify-account', verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword)



export default authRouter;
