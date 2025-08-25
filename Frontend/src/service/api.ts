import { api } from "@/api/auth.axios";
import {axiosInstance} from '@/api/private.axios'
import { AUTH_ROUTES, PRIVATE_ROUTES } from "@/constants/routeConstants";
import type { User } from "@/types/user.type";

export const register = async (data: User) =>{
    const response = await api.post(AUTH_ROUTES.REGISTER, data)
    return response.data
};
export const login = async (data: { email: string; password: string }) => {
    const response =await api.post(AUTH_ROUTES.LOGIN, data)
    return response.data
};
export const logoutUser = async () => {
    const response = await api.post(AUTH_ROUTES.LOGOUT);
    return response.data;
};
export const uploadFileFn = async ({ file, folder }: { file: File; folder: string }) => {
    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("files", file);
    await axiosInstance.post(PRIVATE_ROUTES.UPLOAD, formData);
    return { success: true };
}
export const getUserFiles = async (folder: string,type?:string) => {
    const response = await axiosInstance.get(PRIVATE_ROUTES.GET_FILE, {
        params: { folder , type},
    });
    return response.data;
};

export const createFile = async (payload: { name: string; parentId?: string }) => {
    const res = await axiosInstance.post(PRIVATE_ROUTES.ADD_FOLDER, payload);
    return res.data;
}
export const getFolders = async (parentId: string | null) => {
    const response = await axiosInstance.get(PRIVATE_ROUTES.GET_FOLDER,{
        params: {
            parentId
        }
    });
    console.log(response.data);
    return response.data;
};
export const deleteFile = async (fileId: string) => {
    const response = await axiosInstance.delete(PRIVATE_ROUTES.DELETE_FILE(fileId));
    return response.data;
};
export const getDownloadUrl = async (fileId: string) => {
    const response = await axiosInstance.get(PRIVATE_ROUTES.DOWNLOAD_FILE(fileId));
    return response.data;
};