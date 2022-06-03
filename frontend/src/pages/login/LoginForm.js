import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Audio } from "svg-loaders-react";
import { login } from "../../queries/AuthQuery";
import { HOME } from "../../routes/routes.contants";
import { ToastError, Input, BlackButton } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase/config";
import GoogleLogin from "./GoogleLogin";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

const showErrorToast = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      ToastError({ message: `Email address already in use.` });
      break;
    case "auth/invalid-email":
      ToastError({ message: `Email address is invalid.` });
      break;
    case "auth/operation-not-allowed":
      ToastError({ message: `Oops!! Error during sign up. Try Again.` });
      break;
    case "auth/weak-password":
      ToastError({ message: `Password is not strong enough.` });
      break;
    default:
      ToastError({
        message: error.code
          .slice(5)
          .split("-")
          .join(" ")
          .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()),
      });
      break;
  }
};

const LoginForm = ({ setSignup }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();

  const onSuccess = (data) => {
    if (data.token === undefined || data.error) {
      ToastError({ message: data.error ? data.error : "Invalid Token" });
    } else {
      setToken(data.token);
      history.push(HOME);
    }
  };

  const loginQuery = useMutation((values) => login(values), {
    onSuccess,
  });

  async function onSignIn() {
    try {
      setIsLoading(true);
      const data = await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );
      loginQuery.mutate({ ...formik.values, userUID: data.user.uid });
    } catch (e) {
      showErrorToast(e);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    // onSubmit: (values) => loginQuery.mutate(values),
    onSubmit: onSignIn,
    validationSchema,
  });

  const ButtonText = () => {
    if (isLoading || loginQuery.isLoading) {
      return <Audio height={20} width={20} className="w-full mx-auto" />;
    }
    return <div>Log in</div>;
  };

  return (
    <>
      <div className="w-full h-100">
        <h1 className="mt-12 text-3xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
          Log in to your account
        </h1>
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block mb-1.5 text-sm font-medium leading-relaxed tracking-tighter ext-blueGray-700">
              Email Address
            </label>
            <Input
              name="email"
              type="email"
              placeholder="Your Email "
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1.5 text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="Your Password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <div className="mt-2 text-right">
            <Link
              to="/login/recovery"
              className="text-sm font-semibold leading-relaxed cursor-pointer text-blueGray-700 hover:text-black focus:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>
          <BlackButton
            type="submit"
            disabled={loginQuery.isLoading || isLoading}
          >
            <ButtonText />
          </BlackButton>
        </form>
        <hr className="w-full my-6 border-blueGray-300" />
        <div className="flex justify-center">
          <GoogleLogin />
        </div>

        <div className="flex justify-between mt-8 text-center">
          <p> Need an account? </p>
          <Link
            to="/signup"
            className="font-semibold text-blue-500 cursor-pointer hover:text-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
