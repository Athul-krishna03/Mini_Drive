import { login, register } from '@/service/api';
import type { User } from '@/types/user.type';
import {useMutation} from  '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';




export const useRegister = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:(data:User)=> register(data),
        onSuccess:()=>{
            toast.success("Registration Successful")
            navigate("/login")
        },
        onError:(error:Error) =>{
            console.error("Registration Error",error)
        }
    });
};


export const useLogin = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:(data:{email:string,password:string})=>login(data),
        onSuccess:(data)=>{
            toast.success("Login Successful")
            localStorage.setItem("user", data)
            navigate("/dashboard")
        },
        onError:(error:Error) =>{
            console.error("Login Error",error)
        }
    });
};