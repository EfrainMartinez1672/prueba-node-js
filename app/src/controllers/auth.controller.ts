import { Request, Response } from "express";

import AuthUser from "../services/auth.service";
import userService from "../services/user.service";
import { generateToken } from "../utils/jwt";

/**
 * User login handler verifying credentials via email address and password.
 *
 * @param {Request} req
 *  HTTP request object containing `email` and `password` in the body.
 *
 * @param {Response} res
 *  HTTP response object.
 *
 * @returns {Promise<Response>}
 *  Promise resolving to an HTTP response.
 *
 * Possible responses:
 *
 * - **200 OK**
 *   User authenticated successfully and token issued.
 *
 * - **400 Bad Request**
 *   Missing or invalid input parameters.
 *
 * - **401 Unauthorized**
 *   Authentication failure or invalid credentials.
 */
export const findUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "Email o contraseña invalida.",
            });
        }

        const user = await userService.findOne(email);

        const validation = await AuthUser.login(user, password);

        const token = await generateToken({ email: user.email });

        res.cookie("accesstoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 15,
        });

        return res.status(200).json(validation);
    } catch (error: any) {
        return res.status(401).json({
            error: error.message,
        });
    }
};