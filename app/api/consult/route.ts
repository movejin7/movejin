import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitNewConsult } from "@/lib/socket-server";

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      category?: string;
      description?: string;
      status?: "PENDING" | "COMPLETED" | "CANCELLED";
    };

    if (!body.category || !body.description) {
      return NextResponse.json({ message: "category and description are required" }, { status: 400 });
    }

    const consult = await prisma.consult.create({
      data: {
        category: body.category,
        description: body.description,
        status: body.status ?? "PENDING"
      }
    });

    emitNewConsult(consult);

    return NextResponse.json(consult, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create consult" }, { status: 500 });
  }
}
