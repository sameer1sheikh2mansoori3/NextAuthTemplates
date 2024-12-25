import connectDB from "@/app/lib/connection";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDB();

import { User } from "@/app/lib/user.model";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const findUser = await User.findOne({
      email: body.email,
    });
    console.log(findUser, "this is find user");

    if (!findUser) {
      return NextResponse.json(
        { message: "Credentials are wrong" },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        { message: "User logged in successfully" },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong is signin" },
      {
        status: 500,
      }
    );
  }
}
