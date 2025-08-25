import { ArrowLeft } from "lucide-react";
import AddFileButton from "./common/AddButton";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "@/service/api";
import { toast } from "sonner";
import CreateFolder from "./common/AddFolder";

interface IDriveHeaderProps {
    currentFolder: string;
    currentFolderName: string;
    onGoBack: () => void;
}

export const DriveHeader = ({ currentFolder, currentFolderName, onGoBack }: IDriveHeaderProps) => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        localStorage.removeItem("user")
        toast.success("Logged out successfully")
        navigate("/login")  
    }
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                        {currentFolder && currentFolder !== 'root' && (
                            <button
                                onClick={onGoBack}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1.5" />
                                Back
                            </button>
                        )}
                        <div className="min-w-0">
                            <h1 className="text-xl font-semibold text-gray-900 truncate">
                                {currentFolder !== 'root' ? currentFolderName : 'My Drive'}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mx-4">
                        <CreateFolder parentId={currentFolder} />
                        <AddFileButton folder={currentFolder} />
                    </div>
                    <div className="flex items-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};