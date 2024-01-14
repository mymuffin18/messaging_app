import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      username: "joshuapogi",
      nickname: "joshua pogi",
      accessToken: "test",
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { identifier, nickname } = body;

    // check if identifier exists in db
    let userExists = await prisma.user.findUnique({
      where: { identifier: identifier },
    });

    const headers = {
      "Content-Type": "application/json",
      "Api-Token": process.env.NEXT_PUBLIC_API_TOKEN,
    };

    if (userExists) {
      await fetch(
        `https://api-${process.env.NEXT_PUBLIC_APP_ID}.sendbird.com/v3/users/${userExists.identifier}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({
            nickname: nickname,
          }),
        }
      );

      if (userExists.nickname !== nickname) {
        userExists = await prisma.user.update({
          where: {
            identifier: userExists.identifier,
          },
          data: {
            nickname: nickname,
          },
        });
      }
      return NextResponse.json(
        {
          user: userExists,
          message: "User updated successfully",
        },
        {
          status: 200,
        }
      );
    }

    const sendbirdResponse = await fetch(
      `https://api-${process.env.NEXT_PUBLIC_APP_ID}.sendbird.com/v3/users`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          user_id: identifier,
          nickname: nickname,
          profile_url: null,
          issue_access_token: true,
        }),
      }
    );

    const result = await sendbirdResponse.json();
    console.log("result", result);

    const newUser = await prisma.user.create({
      data: {
        identifier: result.user_id,
        nickname: result.nickname,
        profileUrl: result.profile_url,
        accessToken: result.access_token,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Create User", error);
    return NextResponse.json(
      {
        errors: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    console.log("req", req);
    const body = await req.json();
    const { identifier, nickname, profileUrl } = body;

    const updatedUser = await prisma.user.update({
      where: { identifier: identifier },
      data: {
        nickname: nickname,
        profileUrl: profileUrl,
      },
    });

    return NextResponse.json(
      {
        user: updatedUser,
        message: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Update User", error);
    return NextResponse.json(
      {
        errors: error,
      },
      { status: 500 }
    );
  }
}
