import { prisma } from "@/lib/db";
import CreateCourseForm from "@/components/courses/CreateCourseForm";
import React from "react";

const CreateCoursePage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { subCategories: true },
  });

  return (
    <CreateCourseForm
      categories={categories.map((category) => {
        return {
          label: category.name,
          value: category.id,
          subCategories: category.subCategories.map((subCategory) => {
            return {
              label: subCategory.name,
              value: subCategory.id,
            };
          }),
        };
      })}
    />
  );
};

export default CreateCoursePage;
