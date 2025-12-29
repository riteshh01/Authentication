import express from "express" // ye nodejs ka framework hai, ye routes banata hai and server banata hai
import cors from "cors" // frontend aur backend se baat krne deta hai, kyuki usually browser block krta hai
import 'dotenv/config' // .env file ke secrets load krta hai
import cookieParser from "cookie-parser" // Request ke andar aane wali cookies ko readable banata hai. Auth system me JWT cookies ke liye must-have.
import connectDB from './config/mongodb.js' // Ye MongoDB connect karne wala function import karta hai
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'

const app = express(); // Ye mera backend application hai, Sab middleware & routes isi ke andar rehte hain.
const port = process.env.PORT || 4000 // port se connect kar raha hu

const allowedOrigins = [
  "http://localhost:5173",
];


app.use(express.json()); // ye mera middleware hai
app.use(cookieParser()); // Cookies ko parse karta hai, Auth ke liye zaroori.
app.use(cors({origin: allowedOrigins, credentials: true})); // Cross-origin requests allow karta hai and credentials: true → cookies bhi allow

connectDB();

// API Endpoints => ek specific address (URL) + method jahan frontend jaa ke backend se kuch kaam karwata hai.
// METHOD  +  URL  =  API Endpoint (POST /api/auth/login)

app.get('/', (req, res) => {res.send("API is Working Fine");});
app.use('/api/auth', authRouter); // it means ye route user ke authentication se related kaam karega
app.use('/api/user', userRouter); // it means ye route user ke related kaam karega


app.listen(port, () => console.log(`Server started on PORT: ${port} 🚀`));