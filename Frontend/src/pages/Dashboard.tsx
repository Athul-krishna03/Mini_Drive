import { FolderGrid } from "@/components/FolderList";
import { useFileDelete, useFiles } from "@/hooks/useFiles";
import { Folder } from "lucide-react";
import { useMemo, useState } from "react";
import FileList from "@/components/FileList";
import { DriveHeader } from "@/components/Header";
import type { IFile } from "@/types/file.type";
import { toast } from "@/hooks/useToast";



const Dashboard = () => {
    const [currentFolder, setCurrentFolder] = useState<string>("root");
    const [currentFolderName, setCurrentFolderName] = useState<string>("root");
    
    const { data: files = [], isLoading } = useFiles("all");
    const { mutate: deleteFile } = useFileDelete();
    const currentFiles = useMemo(() => {
        return files.filter((f: IFile) => f.folder === currentFolder);
    }, [files, currentFolder]);
    const handleFolderClick = (folder: string, name: string) => {
        setCurrentFolder(folder);
        setCurrentFolderName(name);
    };
    const handleGoBack = () => {
        setCurrentFolder("root");
    };
    const handleDownload = async (file: IFile) => {
        window.open(file.url, "_blank");
    };
    const handleShare = async (file: IFile) => {
        await navigator.clipboard.writeText(file.url);
        if (navigator.share) {
            await navigator.share({
                title: file.filename,
                text: "Check out this file",
                url: file.url,
            });
            toast({
                title: "File shared successfully",
                variant: "default",
                description: "You can now share this file with others.",
            });
        }
        toast({
            title: "Link copied to clipboard",
            variant: "default",
            description: "You can now share this link with others.",
        });
    };
    const handleDelete = (file: IFile) => {
        deleteFile(file._id);
    };
    if (isLoading) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your files...</p>
            </div>
        </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50">
        <DriveHeader currentFolder={currentFolder} currentFolderName={currentFolderName} onGoBack={handleGoBack} />
        <FolderGrid
            onFolderClick={handleFolderClick}
            currentFolder={currentFolder}

        />
        <main>
            <>
            {currentFiles.length === 0  ? (
                <div className="p-12 text-center">
                <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Files are empty
                </h3>
                <p className="text-gray-500 mb-6">
                    Start by uploading some files
                </p>
                </div>
            ) : (
                <>
                {currentFiles.length > 0 && (
                    <FileList
                    files={currentFiles}
                    onDownload={handleDownload}
                    onShare={handleShare}
                    onDelete={handleDelete}
                    />
                )}
                </>
            )}
            </>
        </main>
        </div>
    );
};

export default Dashboard;
