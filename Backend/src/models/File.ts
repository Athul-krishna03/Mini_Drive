import { Schema, model, Types } from 'mongoose';


const fileSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    key: { type: String, required: true, unique: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    folderId: { type: Schema.Types.ObjectId, ref: "Folder" },
    uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });


export type IFile = {
    _id: Types.ObjectId;
    ownerId: Types.ObjectId;
    key: string;
    filename: string;
    size: number;
    type: string;
    folder: string;
    uploadedAt: Date;
};


export const FileModel = model<IFile>('File', fileSchema);