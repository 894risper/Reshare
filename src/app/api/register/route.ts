import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {
    try{
       const{username,email,password} =  await req.json ();
       const hashedPassword= await bcrypt.hash(password,10)

       await connectMongoDB();

       await User.create({username,email,password:hashedPassword});


       return NextResponse.json({message:"user registered"},{status:201})

    }catch(error){
        return  NextResponse.json({
            message:"an error occured while registaring user"
        },{status: 500})
    }

    
}