import { useFolders } from "@/hooks/useFolders";
import type { IFolder } from "@/types/folder.type";
import { Folder } from "lucide-react";

interface IFolderGridProps {
    onFolderClick: (folder: string, name: string) => void;
    currentFolder: string;
}

export const FolderGrid = ({ onFolderClick, currentFolder }: IFolderGridProps) => {
    const { data: folderData } = useFolders(currentFolder);
    console.log(folderData);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
        {folderData  && folderData.map((folder: IFolder) => (
            <div
            key={folder._id}
            className="group cursor-pointer bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors border border-gray-200"
            onClick={() => onFolderClick(folder._id, folder.name)}
            >
            <div className="flex flex-col items-center space-y-2">
                <Folder className="h-12 w-12 text-blue-500 group-hover:text-blue-600" />
                <span className="text-sm font-medium text-gray-900 text-center truncate w-full">
                {folder.name}
                </span>
            </div>
            </div>
        ))}
        </div>
    );
};
