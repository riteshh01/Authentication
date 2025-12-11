import jwt from "jsonwebtoken";


const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Not Authorized Login Again",
            error: error.message
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Error",
            error: error.message
        })
    }
}