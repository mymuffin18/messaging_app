import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { channelUrl, createdBy, chatmate } = body;

    const channel = await prisma.channel.create({
      data: {
        channelUrl,
        createdBy,
        chatmate,
      },
    });

    return NextResponse.json(
      {
        channel: channel,
        message: "Channel created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
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
    const body = await req.json();
    const { channelUrl } = body;

    const channel = await prisma.channel.update({
      where: {
        channelUrl: channelUrl,
      },
      data: {
        messageCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      {
        channel: channel,
        message: "Message Count updated",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        errors: error,
      },
      { status: 500 }
    );
  }
}
