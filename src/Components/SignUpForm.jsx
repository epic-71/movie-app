import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMail, setErrorMail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorConfPass, setErrorConfPass] = useState("");

  const dispatch = useDispatch();
  const existingUsers = useSelector((s) => s.user);
  useEffect(() => {
    console.log(existingUsers);
  }, [existingUsers]);
  const navigate = useNavigate();

  const validEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const handleValue = (e) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "password") setPassword(e.target.value);
    if (e.target.id === "confirmPassword") setConfirmPassword(e.target.value);
    if (e.target.id === "userid") setUserId(e.target.value);
  };

  const handleBlur = (e) => {
    if (e.target.id === "email") {
      if (email && !email.match(validEmail)) {
        setErrorMail("Please Enter a valid Email");
      } else {
        setErrorMail("");
      }
    }
    if (e.target.id === "password") {
      if (password && !password.match(validPassword)) {
        setErrorPass("Password Error");
      } else {
        setErrorPass("");
      }
    }
    if (e.target.id === "confirmPassword") {
      if (confirmPassword && confirmPassword !== password) {
        setErrorConfPass("Password not Match");
      } else {
        setErrorConfPass("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !email ||
      errorMail ||
      !userid ||
      !password ||
      errorPass ||
      !confirmPassword ||
      errorConfPass
    )
      return;

    const newUser = {
      id: uuidv4(),
      userid,
      role: "user",
      email,
      password,
    };

    const userExist = existingUsers.some(
      (user) => user.userid === userid || user.email === email
    );
    console.log(userExist);
    if (userExist) {
      alert("userExist");
      return;
    }

    // const updatedUsers = [...existingUsers, newUser];
    dispatch(addUser(newUser));

    setEmail("");
    setUserId("");
    setPassword("");
    setConfirmPassword("");

    navigate("/login");
  };
  return (
    <form className=" w-[80%] laptop:w-[50%] h-[80%] mt-20 p-8  rounded-lg flex flex-col gap-1">
      <h1 className="font-bold text-2xl text-center laptop:text-3xl">
        Create Account
      </h1>
      <Input
        id="email"
        type="email"
        label="Email"
        value={email}
        onHandleValue={handleValue}
        onHandleBlur={handleBlur}
        error={errorMail}
        placeHolder="Enter your email ID"
        div_width={100}
        div_height={25}
      />
      <Input
        id="userid"
        type="text"
        label="User Id"
        value={userid}
        onHandleValue={handleValue}
        onHandleBlur={handleBlur}
        placeHolder="Create Unique user ID"
        div_width={100}
        div_height={25}
      />
      <Input
        id="password"
        type="text"
        label="Password"
        value={password}
        onHandleValue={handleValue}
        onHandleBlur={handleBlur}
        error={errorPass}
        placeHolder="Set a password"
        div_width={100}
        div_height={25}
      />
      <Input
        id="confirmPassword"
        type="text"
        label="Confirm Password"
        value={confirmPassword}
        onHandleValue={handleValue}
        onHandleBlur={handleBlur}
        error={errorConfPass}
        placeHolder="Re-enter the password"
        div_width={100}
        div_height={25}
      />
      <Button bold={true} onHandleSubmit={(e) => handleSubmit(e)}>
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
