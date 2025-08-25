import * as jwt  from "jsonwebtoken";
import type { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
import { env } from "process";

dotenv.config();

export interface CustomJwtPayload extends DefaultJwtPayload {
    id: string;
    email: string;
}

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRES=env.ACCESS_TOKEN_EXPIRES
const REFRESH_TOKEN_EXPIRES=env.REFRESH_TOKEN_EXPIRES


export const createAccessToken = (payload: CustomJwtPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
};

export const createRefreshToken = (payload: CustomJwtPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
};

export const verifyAccessToken = (token: string): CustomJwtPayload => {
    return jwt.verify(token,ACCESS_TOKEN_SECRET) as CustomJwtPayload;
};

export const verifyRefreshToken = (token: string): CustomJwtPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as CustomJwtPayload;
};