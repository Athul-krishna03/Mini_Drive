import { getFolders } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { createFile } from "@/service/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFolders = (parentId: string | null) => {
    return useQuery({
        queryKey: ["folders", parentId],
        queryFn: () => getFolders(parentId),
    });
};


export function useCreateFolder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:createFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["folders"] });
        },
    });
}

