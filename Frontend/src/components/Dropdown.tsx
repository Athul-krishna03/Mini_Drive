import type { IFile } from "@/types/file.type";
import { Download, Share2, Trash2 } from "lucide-react";

interface IFileAction {
    isOpen: boolean;
    onClose: () => void;
    onDownload: (file: IFile) => void;
    onShare: (file: IFile) => void;
    onDelete: (file: IFile) => void;
    file: IFile;
}

export const FileActionsDropdown = ({ isOpen, onClose, onDownload, onShare, onDelete, file }: IFileAction) => {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
        <div className="py-2">
            <button
            onClick={() => {
                onDownload(file);
                onClose();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
            <Download className="h-4 w-4 mr-3" />
            Download
            </button>
            
            <button
            onClick={() => {
                onShare(file);
                onClose();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
            <Share2 className="h-4 w-4 mr-3" />
            Share
            </button>
            
            <button
            onClick={() => {
                onDelete(file);
                onClose();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
            <Trash2 className="h-4 w-4 mr-3" />
            Delete
            </button>
        </div>
        </div>
    );
};