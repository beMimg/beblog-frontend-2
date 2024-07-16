import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const CommentForm = () => {
  const [comment, setComment] = useState<any>("");
  const [length, setLength] = useState<number>(0);
  const editorRef = useRef<any>(null);

  const axiosPrivate = useAxiosPrivate();

  const { data: user, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axiosPrivate.get("/user/self");
      console.log(response);
      return response.data;
    },
    queryKey: ["user"],
  });

  const maxSizeComment = 500;

  const handleInit = (evt: any, editor: any) => {
    setLength(editor.getContent({ format: "text" }).length);
  };

  function handleUpdate(value: string, editor: any) {
    const length = editor.getContent({ format: "text" }).length;
    if (length <= maxSizeComment) {
      setComment(value);
      setLength(length);
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
          <form>
            <Editor
              onEditorChange={handleUpdate}
              value={comment}
              apiKey="d29mu3o4g2ibt9eeg8megzvbagky1duugzvlvekp63k3eztp"
              onInit={handleInit}
              init={{
                height: "200px",
                placeholder: "What do you think?",
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
            <Button disabled={!comment} className="mt-4">
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default CommentForm;
