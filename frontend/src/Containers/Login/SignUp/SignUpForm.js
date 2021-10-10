import React, { useState, useRef } from "react";
import SocialForm from "./SocialForm";
import DetailsForm from "./DetailsForm";
import SkillForm from "./SkillForm";

const SignUpForm = ({ setSignup, setFormDetails, formDetails }) => {
  const [step, setStep] = useState(1);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
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
