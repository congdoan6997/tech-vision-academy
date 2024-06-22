import React from "react";
interface Props {
  page: string;
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
  sectionId?: string;
}
const PublishButton = ({
  page,
  courseId,
  isPublished,
  disabled,
  sectionId,
}: Props) => {
  return <div>PublishButton</div>;
};

export default PublishButton;
