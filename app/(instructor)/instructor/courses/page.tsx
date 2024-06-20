import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/courses/Columns";
import { redirect } from "next/navigation";
const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const courses = await prisma.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="px-4 py-6">
      <Button asChild>
        <Link href="/instructor/create-course">New Course</Link>
      </Button>

      <div className="mt-5">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
