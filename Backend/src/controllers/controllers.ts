import type{ Request, Response } from 'express';
import { type AuthRequest } from '../middleware/auth.middleware';
import { FileService } from '../services/file.service';
import { STATUS_CODE } from '../constants/statusCodes';




export const uploadFiles = async (req: Request, res: Response):Promise<void> => {
    console.log(req.body)
    const files = (req.files as Express.Multer.File[]) || [];
    const user = (req as AuthRequest).user
    if (!files.length){
        res.status(400).json({ message: 'No files uploaded' });
        return;
    }

    const folder = (req.body.folder as string) || 'root';
    const docs = await FileService.uploadMany({ ownerId: user!.id, files, folder });
    res.status(201).json(docs);
};


export const listFiles = async (req: Request, res: Response):Promise<void> => {
    const { folder, type } = req.query as { folder: string; type:string };
    const user = (req as AuthRequest).user
    const items = await FileService.list({ ownerId: user.id, folder, typeGroup: (type as any) || 'all' });
    res.status(200).json(items);
};

export const deleteFile = async (req: Request, res: Response):Promise<void> => {
    const { id } = req.params as { id: string };
    const user = (req as AuthRequest).user
    await FileService.remove(id, user!.id);
    res.status(STATUS_CODE.OK).json({ message: 'File deleted successfully' });
};

export const createFolder = async (req: Request, res: Response):Promise<void> => {
    const { name, parentId } = req.body;
    const pId = parentId == 'root' ? null : parentId;
    const user = (req as AuthRequest).user
    const folder = await FileService.createFolder({ name, parentId: pId, ownerId: user!.id });
    res.status(STATUS_CODE.CREATED).json(folder);
};

export const getFolders = async (req: Request, res: Response): Promise<void> => {
    const user = (req as AuthRequest).user
    const parentId = req.query.parentId as string | null;
    const pId = parentId == 'root' ? null : parentId;
    const folders = await FileService.getFolders(user!.id, pId);
    res.status(STATUS_CODE.OK).json(folders);
};
