import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { Skeleton } from "../ui/skeleton";

const CommentForm = ({
  id,
  handleCommentUpdate,
}: {
  id: string | undefined;
  handleCommentUpdate: any;
}) => {
  const [commentSubmitError, setCommentSubmitError] = useState<boolean>(false);
  const [commentSubmitLoading, setCommentSubmitLoading] =
    useState<boolean>(false);
  const [comment, setComment] = useState<any>("");
  const [length, setLength] = useState<number>(0);
  const editorRef = useRef<any>(null);

  const axiosPrivate = useAxiosPrivate();

  // TinyMCE stuff
  const maxSizeComment = 500;

  const handleInit = (_evt: any, editor: any) => {
    setLength(editor.getContent({ format: "text" }).length);
  };

  function handleUpdate(value: string, editor: any) {
    const length = editor.getContent({ format: "text" }).length;
    if (length <= maxSizeComment) {
      setComment(value);
      setLength(length);
    }
  }

  //  Conditional rendering depending on whether the user as been fetched or not.
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await axiosPrivate.get("/user/self");
      return response.data;
    },
    queryKey: ["user"],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row pt-10 gap-4 w-full">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="w-full h-60 rounded-[--radius]" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive">
        Something went wrong, please try again later.
      </p>
    );
  }

  // Form Submition Here
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setCommentSubmitLoading(true);
      setCommentSubmitError(false);

      const response = await axiosPrivate.post(`/comment/post/${id}`, {
        text: comment,
      });

      // If the request is successfull, lets refresh the fetched comments in the parent component so that the comments are up to date.
      if (response.status === 201) {
        editorRef.current.setContent("");
        handleCommentUpdate();
      }
    } catch (err) {
      setCommentSubmitError(true);
    } finally {
      setCommentSubmitLoading(false);
    }
  }

  return (
    <div className="flex  flex-col sm:flex-row pt-10 gap-4">
      {user && (
        <>
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {user.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <form className="w-full" onSubmit={handleSubmit}>
            <Editor
              onEditorChange={handleUpdate}
              value={comment}
              apiKey="d29mu3o4g2ibt9eeg8megzvbagky1duugzvlvekp63k3eztp"
              onInit={handleInit}
              init={{
                width: "100%",
                height: 200,
                placeholder: "What do you think?",
                menubar: false,
                plugins: ["wordcount"],
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | removeformat",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              ref={(editor) => {
                if (editor) {
                  editorRef.current = editor.editor;
                }
              }}
            />
            {commentSubmitError && (
              <p className="text-destructive">
                Something went wrong please try again later.
              </p>
            )}
            <div className="flex flex-row w-full justify-between">
              <Button disabled={!comment} className="mt-4">
                {commentSubmitLoading ? "Loading..." : "Submit"}
              </Button>
              <span>
                <p className="text-muted-foreground text-sm pt-1">
                  Remaining: {maxSizeComment - length}
                </p>
              </span>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CommentForm;
