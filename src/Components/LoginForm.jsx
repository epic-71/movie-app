import { useCallback, useMemo, useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeLoggedUser } from "../Redux/LoggedUserSlice";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const [touched, setTouched] = useState({});
const promise=Promise
console.log(promise)
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const existingUsers = useSelector((s) => s.user);

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validEmail = useMemo(
    () =>
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    []
  );
  const validPassword = useMemo(
    () => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    []
  );

  const handleBlur = useCallback(
    (e) => {
      if (e.target.id === "email") {
        setTouched({ ...touched, email: true });
        const value = emailRef.current.value;
        setEmail(value);
        if (value && !value.match(validEmail)) {
          setEmailError("Email not valid");
        }
      }
      if (e.target.id === "password") {
        setTouched({ ...touched, password: true });
        const value = passwordRef.current.value;
        setPassword(value);
        if (value && !value.match(validPassword)) {
          setPasswordError("Password Error");
        } else {
          setPasswordError("");
        }
      }
    },
    [validEmail, validPassword, touched]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log(existingUsers);

      if (!email || !password) return;

      const isUserExists = existingUsers.find((user) => user.email === email);

      if (!isUserExists) {
        alert("no user exists");
        return;
      }

      if (isUserExists.password !== password) {
        alert("invalid password");
        return;
      }

      dispatch(storeLoggedUser(isUserExists));

      if (isUserExists.role === "user") {
        navigate("/");
      } else if (isUserExists.role === "admin") {
        navigate("/admin/");
      }
    },
    [dispatch, email, existingUsers, navigate, password]
  );
  return (
    <form className="w-[80%] laptop:w-[50%] h-[60%] mt-20 p-8  rounded-lg flex flex-col gap-2 ">
      <h1 className="font-bold text-2xl text-center laptop:text-3xl">Login</h1>
      <Input
        id="email"
        type="email"
        label="Email"
        refe={emailRef}
        onHandleBlur={handleBlur}
        error={emailError}
        div_width={100}
        div_height={25}
        touched={touched.email}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        refe={passwordRef}
        onHandleBlur={handleBlur}
        error={passwordError}
        div_width={100}
        div_height={25}
        touched={touched.password}
      />
      <Button onHandleSubmit={handleSubmit} bold={true}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
