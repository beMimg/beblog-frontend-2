import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PencilIcon } from "lucide-react";
import { ACCEPTED_IMAGE_TYPES } from "../contants/contants";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../api/useAxiosPrivate";

const EditProfile = ({ user, onProfileUpdate }: any) => {
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState<string>(user.bio);
  const [image, setImage] = useState<File | null>();

  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: () => {
      const formDataToSend = new FormData();
      if (bio.length > 0) {
        formDataToSend.append("bio", bio);
      }
      if (image) {
        formDataToSend.append("file", image);
      }

      return axiosPrivate.put("/user", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onError: (error) => {
      console.error(error);
    },

    onSuccess: () => {
      setOpen(false);
      mutation.reset();
      onProfileUpdate();
    },
  });

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-2" size="sm">
          <PencilIcon className="h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your bio here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept={ACCEPTED_IMAGE_TYPES}
                onChange={(e) => setImage(e.target.files && e.target.files[0])}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Biography
              </Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="flex sm:flex-col">
            {mutation.isError ? (
              <span className="self-end pb-4">
                <p className=" text-destructive">An error accour.</p>
              </span>
            ) : null}
            <Button type="submit" className="self-end flex justify-self-end">
              {mutation.isPending ? "Loading..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
