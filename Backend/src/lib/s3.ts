import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../../src/config/env';


export const s3 = new S3Client({
    region: env.aws.region,
        ...(env.aws.accessKeyId && env.aws.secretAccessKey
    ? { credentials: { accessKeyId: env.aws.accessKeyId, secretAccessKey: env.aws.secretAccessKey } }
    : {})
});


export const putObject = async (key: string, body: Buffer, contentType?: string) => {
    const cmd = new PutObjectCommand({ Bucket: env.aws.bucket, Key: key, Body: body, ContentType: contentType });
    await s3.send(cmd);
};


export const deleteObject = async (key: string) => {
    const cmd = new DeleteObjectCommand({ Bucket: env.aws.bucket, Key: key });
    await s3.send(cmd);
};


export const getObjectSignedUrl = async (key: string, ttlSec = env.signedUrlTtlSeconds) => {
    const cmd = new GetObjectCommand({ Bucket: env.aws.bucket, Key: key });
    return getSignedUrl(s3, cmd, { expiresIn: ttlSec });
};
