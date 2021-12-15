import React from "react";
import { Input } from "../../../Components";

const DetailsForm = ({ setStep, formik }) => {
  const nextPage = () => {
    if (formik.isValid) {
      setStep(2);
    }
  };

  return (
    <>
      <div>
        <label className="block mb-1.5 text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Full Name
        </label>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          placeholder="Your Full Name "
        />
      </div>
      <div className="mt-2">
        <label className="block mb-1.5 text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Email Address
        </label>
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          placeholder="Your Email "
        />
      </div>
      <div className="mt-2">
        <label className="block mb-1.5 text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          {" "}
          Password
        </label>
        <Input
          type="password"
          name="password"
          placeholder="Your Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
        />
      </div>
      <div
        onClick={nextPage}
        className="block w-full px-4 py-3 mt-6 font-semibold text-center text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
      >
        Next
      </div>
    </>
  );
};

export default DetailsForm;
