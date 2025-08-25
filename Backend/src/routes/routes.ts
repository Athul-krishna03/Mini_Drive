import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload';
import { createFolder, deleteFile, getFolders, listFiles, uploadFiles } from '../controllers/controllers';
import asyncHandler from 'express-async-handler';

const route = Router();


route.use(authMiddleware);
route.get('/folders', asyncHandler(getFolders));
route.post('/folders',asyncHandler(createFolder));
route.post('/upload', upload.array('files', 10),asyncHandler(uploadFiles));
route.get('/', asyncHandler(listFiles));
route.delete('/:id', asyncHandler(deleteFile));


export default route;