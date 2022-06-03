import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link, useHistory } from "react-router-dom";
import { Audio } from "svg-loaders-react";
import { HOME } from "../../routes/routes.contants";
import { ToastError, Input, BlackButton, ToastSuccess } from "../../components";

const showErrorToast = (error) => {
  const errormessage = error.code.slice(5).split("-").join(" ");
  ToastError({ message: errormessage });
};

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const sendResetEmail = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      ToastSuccess({ message: "Recovery link sent to Email" });
      history.push(HOME);
    } catch (error) {
      showErrorToast(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-100">
      <h1 className="mt-12 text-3xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
        Forgot Password
      </h1>
      <form className="mt-6" onSubmit={sendResetEmail}>
        <div>
          <label className="block mb-1.5 text-sm font-medium leading-relaxed tracking-tighter ext-blueGray-700">
            Email Address
          </label>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2 text-right">
          <Link
            to="/login"
            className="text-sm font-semibold leading-relaxed cursor-pointer text-blueGray-700 hover:text-blue-700 focus:text-blue-700"
          >
            Login
          </Link>
        </div>
        <BlackButton type="submit" disabled={isLoading}>
          <ButtonText isLoading={isLoading} />
        </BlackButton>
      </form>
      <hr className="w-full my-6 border-blueGray-300" />

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
  );
}

const ButtonText = ({ isLoading }) => {
  if (isLoading) {
    return <Audio height={20} width={20} className="w-full mx-auto" />;
  }
  return <div>Send recovery link</div>;
};

export default ForgotPassword;
