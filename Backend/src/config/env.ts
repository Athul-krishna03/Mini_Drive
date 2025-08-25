import dotenv from "dotenv";

dotenv.config();


export const env = {
    port: Number(process.env.PORT || 5000),
    mongoUri: process.env.MONGO_URI!,
    accessSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
    access_token_expires:process.env.ACCESS_TOKEN_EXPIRES!,
    refresh_token_expires:process.env.REFRESH_TOKEN_EXPIRES!,
    clientUrl: process.env.CLIENT_URL!,
    aws: {
    region: process.env.AWS_REGION || 'ap-south-1',
    bucket: process.env.AWS_S3_BUCKET!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    signedUrlTtlSeconds: Number(process.env.SIGNED_URL_TTL_SECONDS || 900),
    maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 15),
};