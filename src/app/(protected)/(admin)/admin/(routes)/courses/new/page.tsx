"use client";

import * as z from "zod";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormTitleSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

type Props = {};

const NewCoursePage = (props: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormTitleSchema>>({
    resolver: zodResolver(FormTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormTitleSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/admin/courses/${response.data.id}`);
      toast.success("Course created successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mx-auto max-w-5xl flex md:items-center md:justify-center h-full p-6">
      <div className="border border-slate-200 rounded-lg p-8 bg-slate-100">
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change it later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced Web Develpement'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you tech in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewCoursePage;
