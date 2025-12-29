import userModel from "../models/userModel.js";
import 'dotenv/config' // .env file ke secrets load krta hai

const secret_code = process.env.SECRET_LOG_CODE;

export const getUserData = async (req, res) => {
        try {
            const userId = req.user.id;

            const user = await userModel.findById(userId);

            if(!user){
                return res.json({success: false, message: 'User not found'});
            }

            res.json({
                success: true,
                userData: {
                    name: user.name,
                    isAccountVerified: user.isAccountVerified
                }
            });
        } catch (error) {
            res.json({success: false, message: error.message});
        }
}


export const addThought = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; // auth middleware se aata hai

        if (!content || content.trim() === "") {
            return res.json({ success: false, message: "Empty thought" });
        }

        // agar secret code ho toh save nahi karna
        if (content.toLowerCase() === secret_code.toLowerCase()) {
            return res.json({ success: true, message: "Access mode enabled" });
        }

        await userModel.findByIdAndUpdate(userId, {
            $push: {
                thoughts: {
                    content
                }
            }
        });

        res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const getAllThoughts = async (req, res) => {
    try {
        const { code } = req.body;

        if (code !== secret_code.toLowerCase()) {
            return res.json({ success: false, message: "Access denied" });
        }

        const users = await userModel.find({}, "name thoughts");

        const allThoughts = [];

        users.forEach(user => {
            user.thoughts.forEach(t => {
                allThoughts.push({
                    user: user.name,
                    content: t.content,
                    createdAt: t.createdAt
                });
            });
        });

        res.json({
            success: true,
            thoughts: allThoughts
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};