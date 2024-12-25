import connectDB from "@/app/lib/connection";
import { User } from "@/app/lib/user.model";
connectDB();

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    // Process a POST request
    const body = await req.json();
    console.log(body);
    const user = await User.findOne({ username: body.username });
    if (user) {
      return NextResponse.json(
        { message: "This email has been taken" },
        {
          status: 400,
        }
      );
    } else {
      const newUser = new User({
        username: body.username,
        email: body.email,
        password: body.password,
      });
      await newUser.save();
      return NextResponse.json(
        { message: "User created successfully" },
        {
          status: 200,
        }
      );
    }
  } else {
    // Handle any other HTTP method

    return NextResponse.json({ message: "Method not allowed" });
  }
}
