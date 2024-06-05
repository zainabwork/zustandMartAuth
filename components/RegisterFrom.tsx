"use client"

import { getUSer, saveUser } from '@/utils/userLocalstorage';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react'
import { useAuthStore } from "@/store/useAuthStore";

const RegisterFrom = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        const user = getUSer(email,password);
        
        if (user){
          await login(email,password);
         router.push('/dashboard');
     } else {
          saveUser({email,password});
          await login(email,password);
     }
        router.push('/');
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          className='border-2'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          className='border-2'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className='bg-blue-500 p-2 rounded-md text-white my-2'>Register</button>
    </form>
    </>
  )
}

export default RegisterFrom