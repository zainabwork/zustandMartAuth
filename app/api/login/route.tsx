import { NextApiRequest,NextApiResponse } from "next";
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req:any, res:any){
    const {email,password} = await req.json();
    // console.log("email:",email,"Pasword:",password)

    try{
        const token = jwt.sign({email}, secret, {expiresIn:'1h'});
        return new Response(JSON.stringify({token}), {status : 200});
    } catch{
        return new Response("Invalid credentials", {status : 500})
    }
    
}