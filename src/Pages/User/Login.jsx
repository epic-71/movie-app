import LoginForm from "../../Components/LoginForm";

function Login() {
  
  return (
    <div className="w-full h-screen flex  justify-center laptop:justify-start bg-primary_black laptop:bg-joker laptop:bg-no-repeat laptop:bg-cover bg-right text-white">
      <LoginForm />
    </div>
  );
}

export default Login;
