import { FileText, MoreVertical } from "lucide-react";
import { FileActionsDropdown } from "./Dropdown";
import { useState, useEffect, useRef } from "react";
import type { IFile } from "@/types/file.type";
    
interface IFileListProps {
    files: IFile[];
    onDownload: (file: IFile) => void;
    onShare: (file: IFile) => void;
    onDelete: (file: IFile) => void;
}

export const FileList = ({ files, onDownload, onShare, onDelete }: IFileListProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); 
    const handleDropdownToggle = (fileId: string) => {
        setOpenDropdown(openDropdown === fileId ? null : fileId);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!openDropdown) return;
            const dropdownElement = dropdownRefs.current[openDropdown];
            if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);
    return (
        <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Files</h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                    {files.map((file) => (
                        <div key={file._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                    <FileText className="h-8 w-8 text-gray-400 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {file.filename}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <div 
                                        className="relative"
                                        ref={(el) => {
                                            dropdownRefs.current[file._id] = el;
                                        }}
                                    >
                                        <button
                                            onClick={() => handleDropdownToggle(file._id)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                            aria-label="File actions"
                                        >
                                            <MoreVertical className="h-5 w-5 text-gray-500" />
                                        </button>
                                        
                                        <FileActionsDropdown
                                            isOpen={openDropdown === file._id}
                                            onClose={() => setOpenDropdown(null)}
                                            onDownload={onDownload}
                                            onShare={onShare}
                                            onDelete={onDelete}
                                            file={file}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {files.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-sm text-gray-500">No files in this folder</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileList;