import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import {
  ACCEPTED_IMAGE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "../../contants/contants";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  topic: z.string().min(1),
  file: z.instanceof(File).refine((file) => file.size < ACCEPTED_IMAGE_SIZE, {
    message: "Your image must be less than 1MB",
  }),
});

type FormData = z.infer<typeof formSchema>;

const CreatePost = () => {
  const editorRef = useRef<any>(null);

  const axiosPrivate = useAxiosPrivate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      file: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("topic", formData.topic);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("content", editorRef.current.getContent());

      return axiosPrivate.post("/post", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },

    onError: (error: any) => {
      console.error(error);
    },

    onSuccess: () => {
      form.reset();
      if (editorRef.current) {
        editorRef.current.setContent("");
      }
    },
  });

  function onSubmit(values: FormData) {
    const content = editorRef.current.getContent();

    if (content.length === 0) {
      console.log("you need to write something on the content");
      return;
    }

    mutation.mutate(values);
  }

  return (
    <div className="flex flex-1 flex-col w-full max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the post creation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} className="max-w-[500px]" />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Description"
                        className="max-w-[500px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input {...field} className="max-w-[500px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept={ACCEPTED_IMAGE_TYPES}
                        onChange={(e) =>
                          onChange(e.target.files && e.target.files[0])
                        }
                        className="max-w-[500px]"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      This is will be the hero of your post
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Content</FormLabel>
                <Editor
                  apiKey="d29mu3o4g2ibt9eeg8megzvbagky1duugzvlvekp63k3eztp"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Write what's on your mind.</p>"
                  init={{
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </FormItem>
              <Button type="submit" className="px-2 py-0 mt-10 max-w-[500px]">
                {mutation.isPending ? "Loading..." : "Create"}
              </Button>
              {mutation.isSuccess && (
                <span className="max-w-[500px] ">
                  <p className=" text-success">You've created a post</p>
                </span>
              )}
              {mutation.isError && (
                <span>
                  <p className=" text-destructive">
                    Something went wrong, please try again later.
                  </p>
                </span>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
