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
import axios from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(50),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    email: z.string().email(),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

type FormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      password_confirmation: "",
    },
  });

  const { setAccessToken } = useAuth();

  const navigation = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post("/auth/signup", formData);
    },

    onSuccess: (data) => {
      setAccessToken(data.data.token);
      navigation("/", { replace: true });
    },
  });

  function onSubmit(values: FormData) {
    mutation.mutate(values);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
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
                    <Input placeholder="duckcowboy_slaying" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="duckcowboy@private.pri" {...field} />
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
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
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
                  Something went wrong, please try again later.
                </p>
              </span>
            )}
            {mutation.isSuccess && (
              <span>
                <p className=" text-emerald-500/90">
                  Your account has been successfully created. Redirecting you
                  now...
                </p>
              </span>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        Already registered?
        <Button variant="link" className="px-2 py-0">
          <Link to="/sign-in">Sign in</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
