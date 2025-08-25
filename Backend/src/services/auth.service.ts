import type{IUser} from "../models/User";
import {User} from "../models/User";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { createAccessToken,createRefreshToken,CustomJwtPayload,verifyRefreshToken,} from "./jwt.service";
import { ERROR_MESSAGES } from "../constants/messages";


    export const register = async (user:IUser): Promise<IUser> => {
        user.password = await hashPassword(user.password);
        const existingUser = await User.findOne({
            where: {
                email: user.email,
            },
        });
        if (existingUser) {
        throw new Error("already exists with this email or phone number");
        }
        return User.create(user);
    }

    export const login = async ( email: string, password: string): Promise<{user: IUser;access_token: string; refresh_token: string;} | null> => {
        const user = await User.findOne({email:email});
        if (!user || !(await comparePassword(password, user.password))) {
        return null;
        }
        const access_token = createAccessToken({ id: user._id.toString(), email: user.email });
        const refresh_token = createRefreshToken({
            id: user._id.toString(),
            email: user.email,
        });
        await User.findByIdAndUpdate(user._id, { refreshToken: refresh_token });
        return { user, access_token, refresh_token };
    }

    export const updateProfile = async (
        id: string,
        updates: Partial<IUser>
    ): Promise<IUser | null> => {
        if (updates.password) {
        updates.password = await hashPassword(updates.password);
        }
        return User.findByIdAndUpdate(id, updates, { new: true });
    }

    export const refreshTokenVerify = async (
        refresh: string,
        access: string
    ): Promise<{ newAccessToken: string; newRefreshToken: string }> => {
        const decoded: { id: string } = verifyRefreshToken(refresh);
        const user = await User.findById({_id: decoded.id,});
        if (!user || user.refreshToken !== refresh) {
        throw new Error(
            ERROR_MESSAGES.TOKEN_INVALID_REUSED
        );
        }

        const payload: CustomJwtPayload = {
        id: user._id.toString(),
        email: user.email,
        };
        const newAccessToken = createAccessToken(payload);
        const newRefreshToken = createRefreshToken(payload);
        user.refreshToken = newRefreshToken;
        await User.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken,
        });
        return { newAccessToken, newRefreshToken };
    }
