import { useEffect, useRef, useState } from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  topic: z.string().min(1),
  image: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

const CreatePost = () => {
  const [isValid, setIsValid] = useState(false);
  const editorRef = useRef<any>(null);

  const getEditorContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(content);
    }
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      image: "",
    },
  });

  function onSubmit(values: FormData) {
    const content = editorRef.current.getContent();
    if (content.length === 0) {
      console.log("you need to write something on the content");
    }
    const data = Object.assign(values, {
      content: content,
    });
    //  do mutation
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
                      <Input {...field} className="max-w-[400px]" />
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
                        className="max-w-[400px]"
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
                      <Input {...field} className="max-w-[400px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} className="max-w-[400px]" />
                    </FormControl>
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
              <CardFooter>
                <Button type="submit" className="px-2 py-0">
                  Create post
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      <button onClick={getEditorContent}>Get Editor Content</button>
    </div>
  );
};

export default CreatePost;
