import { deleteFile, getUserFiles } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { uploadFileFn } from "@/service/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./useToast";



export const useFiles = (folder: string, type: string) => {
    return useQuery({
        queryKey: ["files", { folder , type}],
        queryFn: () => getUserFiles(folder, type),
        enabled: !!folder, 
    });
};


export const useFileUpload = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadFileFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
            toast({
                title: "File uploaded successfully",
                description: "Your file has been uploaded.",
                variant: "default",
            });
        },
    });
}

export const useFileDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (fileId: string) => deleteFile(fileId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
            toast({
                title: "File deleted successfully",
                description: "Your file has been deleted.",
                variant: "default",
            });
        },
    });
};