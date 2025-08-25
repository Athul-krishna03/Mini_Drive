import multer from 'multer';
import { env } from '../config/env';


const storage = multer.memoryStorage();


export const upload = multer({
storage,
limits: { fileSize: env.maxFileSizeMb * 1024 * 1024 },
fileFilter: (_req, _file, cb) => {
// Example: optional allowlist; return cb(null, true) to allow all
// const allowed = ['image/', 'application/pdf'];
// if (!allowed.some(a => file.mimetype.startsWith(a))) return cb(new Error('Unsupported type'));
cb(null, true);
},
});