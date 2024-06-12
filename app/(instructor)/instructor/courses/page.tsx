import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CoursesPage = () => {
  return (
    <div className="px-4 py-6">
      <Button asChild>
        <Link href="/instructor/create-course">New Course</Link>
      </Button>

      <div className="mt-5">Data</div>
    </div>
  );
};

export default CoursesPage;
