import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
export async function POST(req:Request){
    try{
        await connectMongoDB();

        const {email}= await req.json();
       const user = await User.findOne({email}).select("_id");

      

       return NextResponse.json({user})



    }catch(error){
console.log(error);
    }


}