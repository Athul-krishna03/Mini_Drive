import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { useCreateFolder } from "@/hooks/useFolders";

const CreateFolder = ({ parentId }: { parentId?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const { mutate: createFolder, isPending } = useCreateFolder();

    const handleSubmit = () => {
        if (!folderName.trim()) return;
        createFolder({ name: folderName, parentId }, {
            onSuccess: () => {
                setFolderName("");
                setIsOpen(false);
            },
        }
        );
    };

    return (
        <div>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
            <FolderPlus className="h-5 w-5 mr-2" />
            New Folder
        </button>

        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-3">Create Folder</h2>
                <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder name"
                className="w-full border px-3 py-2 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isPending ? "Creating..." : "Create"}
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default CreateFolder;
