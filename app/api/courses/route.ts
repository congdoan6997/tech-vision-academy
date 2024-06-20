import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" });
    }

    const { title, categoryId, subCategoryId } = await req.json();

    const course = await prisma.course.create({
      data: {
        title,
        categoryId,
        subCategoryId,
        instructorId: userId,
      },
    });

    return NextResponse.json({ success: true, course, status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
      status: 500,
    });
  }
};
