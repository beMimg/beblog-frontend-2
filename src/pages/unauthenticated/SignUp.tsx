import RegisterForm from "../../components/forms/RegisterForm";

const SignUp = () => {
  return (
    <div className="flex-1 max-w-2xl mx-auto flex  flex-col items-center justify-center gap-14 w-full ">
      <h1 className="text-center">
        Creating an account will allow you to interact with posts
      </h1>
      <RegisterForm />
    </div>
  );
};

export default SignUp;
