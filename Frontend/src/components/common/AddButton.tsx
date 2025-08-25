import React, { useRef } from "react";
import { Plus } from "lucide-react";
import { useFileUpload } from "@/hooks/useFiles";

const AddFileButton = ({ folder }: { folder: string }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { mutate:upload,isPending} = useFileUpload();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        upload({ file: e.target.files[0], folder });
        e.target.value = ""; // reset input
        }
    };

    return (
        <div>
        <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={isPending}
        >
            <Plus className="h-5 w-5 mr-2" />
            {isPending ? "Uploading..." : "Add File"}
        </button>
        <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
        />
        </div>
    );
};

export default AddFileButton;
