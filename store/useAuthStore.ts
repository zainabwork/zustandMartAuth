import { create } from "zustand";
import Cookies from 'js-cookie';
import axios from 'axios';
import { getUSer } from "@/utils/userLocalstorage";

interface AuthStore {
    token:string | null,
    isAuthenticated: string | null,
    login:(email:string,password:string) => void,
    logout: () => void
}

let apiUrl= '';
if(process.env.NEXT_PUBLIC_URL){
    apiUrl = process.env.NEXT_PUBLIC_URL;
}else{
    apiUrl='http://localhost:3000'
}

export const useAuthStore = create<AuthStore>((set)=>({
    token:Cookies.get('token') || null, 
    isAuthenticated: Cookies.get("token") || null,
    login: async(email:string, password:string) => {
        try{
            const user = getUSer(email,password);
            if(user){
                const response = await axios.post(`${apiUrl}/api/login`,{email,password});
                const token = response.data.token;
                Cookies.set('token',token,{expires:1});
                // console.log("token:",token)
                set({token:token,isAuthenticated:"true"});
            }

        } catch(error){
            alert('Invalid credentials');
        }
    },
    logout: () => {
        set({token:null,isAuthenticated:"false"});
        Cookies.remove('token');
    },
}));