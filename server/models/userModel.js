import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOtp: {type: String, default: ''},
    verifyOtpExpireAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpireAt: {type: Number, default: 0},
    thoughts: [
        {
            content: {
                type: String,
                required: true,
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema); // Agar user model pehle se defined hai, usko reuse karo. Agar model define nahi hai, to naya model create karo.

export default userModel;