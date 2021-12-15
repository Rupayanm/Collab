import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import SocialForm from "./SocialForm";
import DetailsForm from "./DetailsForm";
import SkillForm from "./SkillForm";
import { TOKEN, PROFILEKEY } from "../../../Constants";
import { HOME } from "../../../routes.contants";
import { signup } from "../../../queries/AuthQuery";
import { GetMyProfile } from "../../../queries/ProfileQuery";
import { ToastError, ToastSuccess } from "../../../Components/Toasts";

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

const SignUpForm = ({ setSignup }) => {
  const [step, setStep] = useState(1);
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
      ToastError({ message: "Sign Up Failed" || data.error.msg });
    } else {
      ToastSuccess({ message: "Account registered" });
      localStorage.setItem(TOKEN, data.token);
      getProfileInfo();
    }
  };

  const signUpQuery = useMutation((values) => signup(values), {
    onSuccess,
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => signUpQuery.mutate(values),
    validationSchema,
  });

  return (
    <div className="w-full h-100 relative">
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
            isLoading={signUpQuery.isLoading}
            isLoadingProfile={isLoadingProfile}
          />
        ) : null}
      </form>
      <hr className="w-full my-6 border-blueGray-300" />

      <div className="mt-8 text-center flex justify-between">
        <p> Already have an account? </p>
        <p
          className="font-semibold cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={() => {
            setSignup(false);
          }}
        >
          Login
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
