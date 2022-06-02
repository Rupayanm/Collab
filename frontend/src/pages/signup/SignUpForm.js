import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import SocialForm from "./SocialForm";
import DetailsForm from "./DetailsForm";
import SkillForm from "./SkillForm";
import { HOME } from "../../routes/routes.contants";
import { signup } from "../../queries/AuthQuery";
import { ToastError, ToastSuccess } from "../../components/Toasts";
import { useAuth } from "../../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase/config";

const initialValues = {
  name: "",
  email: "",
  skills: [],
  password: "",
  socials: { github: "", twitter: "", facebook: "", linkedin: "" },
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be more than 8 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
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
      ToastError({ message: error.message });
      break;
  }
};

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const history = useHistory();

  const onCreateUser = async () => {
    if (formik.validateField("email") && formik.validateField("password")) {
      try {
        setIsLoading(true);
        const data = await createUserWithEmailAndPassword(
          auth,
          formik.values.email,
          formik.values.password
        );
        console.log("user UID");
        signUpQuery.mutate({ ...formik.values, userUID: data?.user.uid });
      } catch (e) {
        showErrorToast(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSuccess = (data) => {
    if (data.token === undefined || data.errors) {
      ToastError({ message: "Sign Up Failed" || data.errors[0].msg });
    } else {
      ToastSuccess({ message: "Account registered" });
      setToken(data.token);
      history.push(HOME);
    }
  };

  const signUpQuery = useMutation((values) => signup(values), {
    onSuccess,
  });

  const formik = useFormik({
    initialValues,
    onSubmit: onCreateUser,
    validationSchema,
  });

  return (
    <div className="relative w-full h-100">
      <h1 className="mt-12 text-3xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
        Sign Up
      </h1>
      <form className="mt-6" onSubmit={formik.handleSubmit}>
        {step === 1 ? <DetailsForm setStep={setStep} formik={formik} /> : null}
        {step === 2 ? <SkillForm setStep={setStep} formik={formik} /> : null}
        {step === 3 ? (
          <SocialForm
            setStep={setStep}
            formik={formik}
            isLoading={signUpQuery.isLoading || isLoading}
            isLoadingProfile={false}
          />
        ) : null}
      </form>
      <hr className="w-full my-6 border-blueGray-300" />

      <div className="flex justify-between mt-8 text-center">
        <p> Already have an account? </p>
        <Link
          to="/login"
          className="font-semibold text-blue-500 cursor-pointer hover:text-blue-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
