import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button, buttonVariants } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  item: string;
  courseId?: string;
  sectionId?: string;
}

const Delete = ({ item, sectionId, courseId }: Props) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const onDelete = async () => {};
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(buttonVariants({ variant: "destructive" }))}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash className="size-4 " />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-primary" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
