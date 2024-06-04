import { create } from "zustand";
import Cookies from 'js-cookie';
import axios from 'axios';

interface AuthStore {
    token:string | null,
    isAuthenticated: boolean,
    login:(email:string,password:string) => void,
    logout: () => void
}
export const useAuthStore = create<AuthStore>((set)=>({
    token:Cookies.get('token') || null, 
    isAuthenticated: Cookies.get("token"),
    login: async(email:string, password:string) => {
        try{
            const response = await axios.post('https://reqres.in/api/login',{email,password});
            const token = response.data.token;
            Cookies.set('token',token,{expires:1});
            console.log("token:",token)
            set({token:token,isAuthenticated:true});
        } catch(error){
            alert('Invalid credentials');
        }
    },
    logout: () => {
        Cookies.remove('token');
        set({token:null,isAuthenticated:false});
    },
}));