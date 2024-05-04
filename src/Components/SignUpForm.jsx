import { useCallback, useMemo, useState } from "react";
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
  const [touched, setTouched] = useState({});

  const [errorMail, setErrorMail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorConfPass, setErrorConfPass] = useState("");

  const dispatch = useDispatch();
  const existingUsers = useSelector((s) => s.user);
  const userExist = useMemo(
    () =>
      existingUsers.some(
        (user) => user.userid === userid || user.email === email
      ),
    [email, existingUsers, userid]
  );

  const navigate = useNavigate();

  const validEmail = useMemo(
    () =>
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    []
  );
  const validPassword = useMemo(
    () => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    []
  );

  const handleValue = useCallback((e) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "password") setPassword(e.target.value);
    if (e.target.id === "confirmPassword") setConfirmPassword(e.target.value);
    if (e.target.id === "userid") setUserId(e.target.value);
  }, []);

  const handleBlur = useCallback(
    (e) => {
      if (e.target.id === "email") {
        setTouched({ ...touched, email: true });
        if (email && !email.match(validEmail)) {
          setErrorMail("Please Enter a valid Email");
        } else {
          setErrorMail("");
        }
      }
      if (e.target.id === "password") {
        setTouched({ ...touched, password: true });

        if (password && !password.match(validPassword)) {
          setErrorPass("Password Error");
        } else {
          setErrorPass("");
        }
      }
      if (e.target.id === "confirmPassword") {
        setTouched({ ...touched, confirmPassword: true });
        if (confirmPassword && confirmPassword !== password) {
          setErrorConfPass("Password not Match");
        } else {
          setErrorConfPass("");
        }
      }
    },
    [confirmPassword, email, password, validEmail, validPassword, touched]
  );

  const handleSubmit = useCallback(
    (e) => {
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

      console.log(userExist);
      if (userExist) {
        alert("userExist");
        return;
      }

      dispatch(addUser(newUser));

      setEmail("");
      setUserId("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    },
    [
      confirmPassword,
      dispatch,
      email,
      errorConfPass,
      errorMail,
      errorPass,
      navigate,
      password,
      userid,
      userExist,
    ]
  );

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
        touched={touched.email}
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
        type="password"
        label="Password"
        value={password}
        onHandleValue={handleValue}
        onHandleBlur={handleBlur}
        error={errorPass}
        placeHolder="Set a password"
        div_width={100}
        div_height={25}
        touched={touched.password}
      />
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onHandleValue={handleValue}
        onHandleBlur={handleBlur}
        error={errorConfPass}
        placeHolder="Re-enter the password"
        div_width={100}
        div_height={25}
        touched={touched.confirmPassword}
      />
      <Button bold={true} onHandleSubmit={(e) => handleSubmit(e)}>
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
