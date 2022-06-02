import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Audio } from "svg-loaders-react";
import { MultiSocialForm } from "../../components";

const SocialForm = ({ formik, setStep, isLoading, isProfileLoading }) => {
  return (
    <>
      <div>
        <MultiSocialForm name="socials" formik={formik} />
      </div>
      <div className="inline-flex w-full">
        <div
          onClick={() => setStep(2)}
          className=" px-4 py-3 mt-6 flex items-center font-semibold border transition duration-500 ease-in-out transform bg-white rounded-l-lg rounded- hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        >
          <FaChevronLeft />
        </div>
        <button
          type="submit"
          disabled={isLoading || isProfileLoading}
          className="block flex-grow px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-r-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        >
          {isLoading ? (
            <Audio height={20} width={20} className="w-full mx-auto" />
          ) : (
            "Log in"
          )}
        </button>
      </div>
    </>
  );
};

export default SocialForm;
