import path from 'path';
import { FilterQuery, Types } from 'mongoose';
import { FileModel, IFile } from '../models/File';
import { deleteObject, getObjectSignedUrl, putObject } from '../lib/s3';
import { AppError } from '../utils/errors';
import { FolderModel } from '../models/Folder';


const sanitizeSegment = (s: string) => s.replace(/[^a-zA-Z0-9._-]/g, '_');

export const FileService = {
    async uploadMany(opts: {
        ownerId: string;
        files: Express.Multer.File[];
        folder?: string; 
    }) {
        const ownerId = new Types.ObjectId(opts.ownerId);
        let folderId: Types.ObjectId | undefined;
        if (opts.folder) {
            let folder = await FolderModel.findOne({ ownerId, name: opts.folder }) as (typeof FolderModel)['prototype'] | null;
            if (!folder) {
                folder = await FolderModel.create({ ownerId, name: opts.folder }) as typeof FolderModel.prototype;
            }
            folderId = folder._id;
        }

        const docs = await Promise.all(
            opts.files.map(async (f) => {
            const ext = path.extname(f.originalname);
            const base = path.basename(f.originalname, ext);
            const unique = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
            const safeBase = sanitizeSegment(base);
            const folderSegment = opts.folder ? sanitizeSegment(opts.folder) : 'root';
            const key = `${opts.ownerId}/${folderSegment}/${safeBase}_${unique}${ext}`;
            await putObject(key, f.buffer, f.mimetype);
            return FileModel.create({
                ownerId,
                key,
                filename: f.originalname,
                size: f.size,
                type: f.mimetype,
                folderId,
            });
        })
    );

    return docs;
    },

    async list(opts: {
    ownerId: string;
    folder?: string;
    typeGroup?: 'image' | 'pdf' | 'doc' | 'all';
    }) {
    const query: FilterQuery<IFile> = {
        ownerId: new Types.ObjectId(opts.ownerId),
    };

    if (opts.folder && opts.folder !== 'all') {
        query.folderId = new Types.ObjectId(opts.folder);
    }

    if (opts.typeGroup && opts.typeGroup !== 'all') {
        if (opts.typeGroup === 'image') query.type = { $regex: '^image/' };
        else if (opts.typeGroup === 'pdf') query.type = 'application/pdf';
        else if (opts.typeGroup === 'doc') {
        query.type = {
            $in: [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            ],
        };
        }
    }

    const items = await FileModel.find(query).sort({ createdAt: -1 }).populate('folderId').lean();
    return Promise.all(
        items.map(async (it: any) => ({
            _id: it._id,
            filename: it.filename,
            folder: it.folderId.name,
            folderId: it.folderId._id,
            size: it.size,
            createdAt: it.createdAt,
            url: await getObjectSignedUrl(it.key)
        }))
    );
    },
    async remove(fileId: string, ownerId: string) {
        const doc = await FileModel.findById(fileId);
        if (!doc) throw new AppError(404, 'File not found');
        if (doc.ownerId.toString() !== ownerId) throw new AppError(403, 'Forbidden');
        await deleteObject(doc.key);
        await doc.deleteOne();
        return { ok: true };
    },

    async createFolder(opts: { name: string; parentId?: string; ownerId: string }) {
        let parentFolderId = null;
        if (!opts.parentId) {
            let rootFolder = await FolderModel.findOne({ parentId: null, ownerId: opts.ownerId, name: "root" });
            if (!rootFolder) {
                rootFolder = await FolderModel.create({
                    name: "root",
                    parentId: null,
                    ownerId: opts.ownerId,
                });
            }

            parentFolderId = rootFolder._id;
        } else {
            parentFolderId = opts.parentId;
        }
        const folder = await FolderModel.create({
            name: opts.name,
            parentId: parentFolderId,
            ownerId: opts.ownerId,
        });
        return folder;
    },
    async getFolders(ownerId: string, parentId: string | null) {
        if (parentId == null) {
            const rootFolder = await FolderModel.findOne({ ownerId, name: "root" });
            if (!rootFolder) {
                throw new AppError(404, 'Root folder not found');
            }
            parentId = rootFolder._id as string;
        }
        const folders = await FolderModel.find({ ownerId, parentId});
        return folders;
    }
};