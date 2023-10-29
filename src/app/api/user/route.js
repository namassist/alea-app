import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { validate } from "../../../validations/validation";
import { createUserValidation } from "../../../validations/userValidation";

export async function POST(req) {
  try {
    const body = await req.json();
    const registerRequest = validate(createUserValidation, body);

    if (registerRequest.status === 400) {
      return NextResponse.json(
        {
          message: registerRequest.message,
        },
        { status: 400 }
      );
    }

    // Cek jika email sudah ada
    const existingUserByEmail = await db.user.findUnique({
      where: { email: registerRequest.email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          message: "User with this email already exists!",
        },
        { status: 409 }
      );
    }

    // Cek jika username sudah ada
    const existingUserByUsername = await db.user.findUnique({
      where: { username: registerRequest.username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          message: "Username already exists!",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(registerRequest.password, 10);
    const newUser = await db.user.create({
      data: {
        username: registerRequest.username,
        email: registerRequest.email,
        password: hashedPassword,
        role: "user",
      },
    });

    const { password: newPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        message: "user created successfully",
        user: rest,
      },
      { status: 201 }
    );
  } catch (error) {}
}
