import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, addThought, getAllThoughts } from '../controllers/userController.js';

const userRouter = express.Router();

// user basic data
userRouter.get("/data", userAuth, getUserData);

// add a thought (normal user input)
userRouter.post("/add-thought", userAuth, addThought);

// secret mode: get all thoughts
userRouter.post("/get-thoughts", userAuth, getAllThoughts);

export default userRouter;