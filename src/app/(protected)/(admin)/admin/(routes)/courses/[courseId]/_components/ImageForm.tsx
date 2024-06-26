"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";
import { FormImageSchema } from "@/schemas";

type Props = {
  initialData: Course;
  courseId: string;
};

const ImageForm: React.FC<Props> = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof FormImageSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an Image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {initialData.imageUrl ? (
              <Image
                alt="upload"
                fill
                className="object-cover rounded-md"
                src={initialData?.imageUrl as string}
              />
            ) : null}
          </div>
        ))}
      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recomended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
