import React, { useState, useRef } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import SocialForm from "./SocialForm";
import DetailsForm from "./DetailsForm";
import SkillForm from "./SkillForm";
import { TOKEN } from "../../../Constants";
import { HOME } from "../../../routes.contants";
import { signup } from "../../../queries/AuthQuery";
import { ToastError, ToastSuccess } from "../../../Components/Toasts";

const SignUpForm = ({ setSignup, setFormDetails, formDetails }) => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const formRef = useRef(null);

  const onSuccess = (data) => {
    if (data.error) {
      ToastError({ message: data.error.msg });
    } else {
      ToastSuccess({ message: "Account registered" });
      localStorage.setItem(TOKEN, data.token);
      history.push(HOME);
    }
  };

  const { isLoading, refetch } = useQuery("signup", () => signup(formDetails), {
    enabled: false,
    onSuccess,
    cacheTime: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    refetch();
  };

  return (
    <div className="w-full h-100 relative">
      <h1 className="mt-12 text-3xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
        Sign Up
      </h1>
      <form className="mt-6" onSubmit={handleSubmit} ref={formRef}>
        {step === 1 ? (
          <DetailsForm
            setStep={setStep}
            formDetails={formDetails}
            setFormDetails={setFormDetails}
            formRef={formRef}
          />
        ) : null}
        {step === 2 ? (
          <SkillForm
            setStep={setStep}
            formDetails={formDetails}
            setFormDetails={setFormDetails}
          />
        ) : null}
        {step === 3 ? (
          <SocialForm
            setStep={setStep}
            formDetails={formDetails}
            setFormDetails={setFormDetails}
            isLoading={isLoading}
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
