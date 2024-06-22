"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuxData, Resource, Section } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import PublishButton from "../custom/PublishButton";
import Delete from "../custom/Delete";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import RichEditor from "../custom/RichEditor";
import MuxPlayer from "@mux/mux-player-react";
import FileUpload from "../custom/FileUpload";
import { Switch } from "../ui/switch";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and must be at least 2 characters long",
  }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean().optional(),
});
interface Props {
  isCompleted: boolean;
  section: Section & {
    muxData?: MuxData | null;
    resources?: Resource[] | null;
  };
  courseId: string;
}

const EditSectionForm = ({ isCompleted, section, courseId }: Props) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      description: section.description || "",
      videoUrl: section.videoUrl || "",
      isFree: section.isFree,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <Link href={`/instructor/courses/${courseId}/sections`}>
          <Button variant="outline" className="text-sm font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to curriculum
          </Button>
        </Link>

        <div className="flex gap-5 items-start">
          <PublishButton
            disabled={!isCompleted}
            courseId={courseId}
            sectionId={section.id}
            isPublished={section.isPublished}
            page="Section"
          />
          <Delete item="section" courseId={courseId} sectionId={section.id} />
        </div>
      </div>
      <h1 className="text-xl font-bold">Section Details</h1>
      <p className="text-sm font-medium mt-2">
        Complete this section with detailed information, good video and
        resources to give your students the best learning experience
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Introduction to Web Development"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RichEditor
                    placeholder="What is this section about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {section.videoUrl && (
            <div className="my-5">
              <MuxPlayer
                playbackId={section.muxData?.playbackId || ""}
                className="md:max-w-[600px]"
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Video <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="sectionVideo"
                    page="Edit Section"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Accessibility</FormLabel>
                  <FormDescription>
                    Everyone can access this section for FREE
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-5">
            <Link href={`/instructor/courses/${courseId}/sections`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditSectionForm;
