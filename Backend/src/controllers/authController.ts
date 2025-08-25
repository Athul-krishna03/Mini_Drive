import { Request, Response } from "express";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { STATUS_CODE } from "../constants/statusCodes";
import { verifyAccessToken } from "../services/jwt.service";
import { setCookies } from "../utils/helper/setCookie.helper";
import * as authService from "../services/auth.service";

export const authController = {
    register: async (req: Request, res: Response) => {
        console.log(req.body)
        const user = await authService.register(req.body);
        res.status(STATUS_CODE.CREATED).json(user);
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body as { email: string; password: string };
        const result = await authService.login(email, password);
        if (!result) {
            return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
        }
        setCookies(res, result.access_token, result.refresh_token);
        res.json({ user: result.user });
    },

    logout: async (_req: Request, res: Response) => {
        res.clearCookie("x-access-token");
        res.clearCookie("x-refresh-token");
        res.status(STATUS_CODE.OK).json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
    },

    refreshToken: async (req: Request, res: Response) => {
        const accessToken = req.cookies["x-access-token"];
        const refreshToken = req.cookies["x-refresh-token"];

        if (!refreshToken) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({ success: false, message: ERROR_MESSAGES.TOKEN_MISSING });
        }
        let shouldRefresh = false;
        try {
        verifyAccessToken(accessToken);
        return res.status(STATUS_CODE.OK).json({success: true,message: SUCCESS_MESSAGES.TOKEN_VALID});
        } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            shouldRefresh = true;
        } else {
            return res.status(STATUS_CODE.UNAUTHORIZED).json({ success: false, message: ERROR_MESSAGES.TOKEN_INVALID });
        }
        }

        if (shouldRefresh) {
        const { newAccessToken, newRefreshToken } =
            await authService.refreshTokenVerify(refreshToken, accessToken);
        setCookies(res, newAccessToken, newRefreshToken);
        res.status(STATUS_CODE.OK).json({success: true,message: SUCCESS_MESSAGES.SESSION_RENEWED});
        }
    },
};
