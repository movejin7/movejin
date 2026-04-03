import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const consults = await prisma.consult.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(consults);
  } catch {
    return NextResponse.json({ message: "Failed to fetch consults" }, { status: 500 });
  }
}
