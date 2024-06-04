"use client"

import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getUSer } from '@/utils/userLocalstorage';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        const user = getUSer(email,password);
        if (user){
             await login(email,password);
            //  console.log("logined");
            router.push('/dashboard');
        } else {
            alert('Invalid Credentials');
        }
    };
    
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
      <button type="submit" className='rounded-md bg-blue-500 p-2 text-white'>Login</button>
    </form>
    </>
  )
}

export default LoginForm