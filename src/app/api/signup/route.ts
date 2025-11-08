import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/dbConnect";
import { User } from "@/model/User"

type SignupRequestBody = {
  username: string;
  email: string;
  password: string;
  role: 'child' | 'parent';
};

export async function POST(req : any , res :any ){
  try {
    const { username, email, password , role } :SignupRequestBody = await req.json();

    // Validate the input
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const createdUser : SignupRequestBody = await User.create({
      username,
      email,
      password,
      role  
    });

    console.log("Created User:", createdUser);
    if(!createdUser){
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }
 
    return NextResponse.json(
      { message: "User registered successfully" , data: createdUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    );
  }
}
