import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 character" }),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { setAccessToken } = useAuth();

  const navigation = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post("/auth/signin", formData);
    },

    onError: (error: any) => {
      console.error(error.message);
    },
    onSuccess: (data) => {
      setAccessToken(data.data.token);
      setTimeout(() => {
        navigation("/", { replace: true });
        window.location.reload();
      }, 2000);
    },
  });

  function onSubmit(values: FormData) {
    mutation.mutate(values);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {mutation.isError && (
              <span>
                <p className=" text-destructive">
                  {mutation.error.response?.data.message
                    ? mutation.error.response?.data.message
                    : mutation.error.message}
                </p>
              </span>
            )}
            {mutation.isSuccess && (
              <span>
                <p className=" text-emerald-500/90">
                  Your have been successfully sign in. Redirecting you now...
                </p>
              </span>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        Don't have an account yet?
        <Button variant={"link"} className="px-2 py-0">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
