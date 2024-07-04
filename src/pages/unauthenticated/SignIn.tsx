import LoginForm from "../../components/forms/LoginForm";
import { Button } from "../../components/ui/button";

const SignIn = () => {
  return (
    <div className="flex-1 max-w-2xl mx-auto flex  flex-col items-center justify-center gap-14 w-full ">
      <h1 className="text-center">
        Welcome to{" "}
        <a
          className="hover:underline transition-all"
          target="_blank"
          href="https://www.bemimg.com"
        >
          beMimg's
        </a>{" "}
        blog
      </h1>
      <LoginForm />
    </div>
  );
};

export default SignIn;
