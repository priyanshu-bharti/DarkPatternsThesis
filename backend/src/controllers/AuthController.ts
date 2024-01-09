import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
export const authController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw "auth failed email or password missing";
        }
        const user = await User.findOne({ email: email });
        if (user) {
            const passwordMatch = await bcrypt.compare(
                password,
                user.password as string
            );
            if (!passwordMatch) {
                throw "Authentication failed";
            }
            const token = jwt.sign({ userId: user._id }, "your-secret-key", {
                expiresIn: "1h",
            });
            res.status(200).json({ accessToken: token });
        } else {
            throw "user not found";
        }
    } catch (error: any) {
        res.status(401).json({ status: "failed", message: error });
    }

    // res.status(200).json({ status: "success", message: "auth router" });
};

export const authUserMaker = async (req: Request, res: Response) => {
    const users = [
        { email: "admin@mrkeeper.com", password: "supersecurepassword123" },
    ];
    try {
        users.forEach(async (user) => {
            const { email, password } = user;
            const hashedPassword = await bcrypt.hash(password, 10);
            const dbUser = new User({ email, password: hashedPassword });
            dbUser.save();
        });
        res.status(200).json({ status: "success", message: "users created" });
    } catch (error: any) {
        res.status(401).json({ status: "failed", message: error });
    }
};
