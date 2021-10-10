import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUp/SignUpForm";

const Login = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    skills: [],
    password: "",
    socials: { github: "", twitter: "", facebook: "", linkedin: "" },
  });
  const [singup, setSignup] = useState(false);

  return (
    <div>
      <section className="flex flex-col items-center h-screen md:flex-row ">
        <div className="hidden h-full bg-black lg:block md:w-1/12 lg:w-1/12">
          <img
            src="/images/login.jpg"
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
          {singup ? (
            <SignUpForm
              setSignup={setSignup}
              formDetails={formDetails}
              setFormDetails={setFormDetails}
            />
          ) : (
            <LoginForm
              setSignup={setSignup}
              formDetails={formDetails}
              setFormDetails={setFormDetails}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
