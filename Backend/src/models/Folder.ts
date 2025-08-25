import { Schema, model, Document } from "mongoose";

interface IFolder extends Document {
    name: string;
    ownerId: string;
    parentId?: string | null; 
    createdAt: Date;
    updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>(
    {
        name: { type: String, required: true },
        ownerId: { type: String, ref: "User", required: true },
        parentId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
    },
    { timestamps: true }
);

export const FolderModel = model<IFolder>("Folder", FolderSchema);
