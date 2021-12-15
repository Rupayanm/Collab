import React from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Audio } from "svg-loaders-react";
import { PROFILEKEY, TOKEN } from "../../Constants";
import { login } from "./../../queries/AuthQuery";
import { GetMyProfile } from "./../../queries/ProfileQuery";
import { HOME } from "./../../routes.contants";
import { ToastError, Input, BlackButton } from "./../../Components";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be more than 8 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

const LoginForm = ({ setSignup }) => {
  const history = useHistory();

  const onSuccessProfile = (data) => {
    if (data.error) {
      ToastError({ message: data.error.msg });
    } else {
      localStorage.setItem(PROFILEKEY, JSON.stringify(data));
      history.push(HOME);
    }
  };

  const { refetch: getProfileInfo, isLoading: isLoadingProfile } = useQuery(
    "getMyProfile",
    GetMyProfile,
    {
      enabled: false,
      onSuccess: onSuccessProfile,
      cacheTime: 500,
    }
  );

  const onSuccess = (data) => {
    if (data.token === undefined || data.error) {
      ToastError({ message: data.error ? data.error : "Invalid Token" });
    } else {
      localStorage.setItem(TOKEN, data.token);
      getProfileInfo();
    }
  };

  const loginQuery = useMutation((values) => login(values), {
    onSuccess,
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => loginQuery.mutate(values),
    validationSchema,
  });

  const ButtonText = () => {
    if (isLoadingProfile) {
      return (
        <>
          <div className="text-sm font-semibold text-gray-200 text-center">
            You will be redirected soon..
          </div>
        </>
      );
    }
    if (loginQuery.isLoading) {
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
            />
          </div>
          <div className="mt-2 text-right">
            <p className="text-sm cursor-pointer font-semibold leading-relaxed text-blueGray-700 hover:text-black focus:text-blue-700">
              Forgot Password?
            </p>
          </div>
          <BlackButton
            type="submit"
            disabled={loginQuery.isLoading || isLoadingProfile}
          >
            <ButtonText />
          </BlackButton>
        </form>
        <hr className="w-full my-6 border-blueGray-300" />
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-flex w-full px-4 py-3 justify-center font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-black hover:text-white focus:outline-none focus:shadow-outline focus:ring-2  "
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  ></path>
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible"></use>
                </clipPath>
                <path
                  clipPath="url(#b)"
                  fill="#FBBC05"
                  d="M0 37V11l17 13z"
                ></path>
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                ></path>
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                ></path>
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                ></path>
              </svg>
              <span className="ml-4"> Log in with Google </span>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center flex justify-between">
          <p> Need an account? </p>
          <p
            className="font-semibold cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => setSignup(true)}
          >
            Sign Up
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
