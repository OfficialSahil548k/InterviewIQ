import genToken from "../config/token.js";
import User from "../models/userModel.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email
            });
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const logOut = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false
        });
        return res.status(200).json({ message: "logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}