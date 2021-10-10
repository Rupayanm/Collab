import React from "react";

const DetailsForm = ({ formDetails, setFormDetails, setStep, formRef }) => {
  const validate = () => {
    if (formRef.current.reportValidity()) {
      setStep(2);
    }
  };

  return (
    <>
      <div>
        <label className="block text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Full Name
        </label>
        <input
          type="text"
          value={formDetails.name}
          onChange={(e) =>
            setFormDetails({ ...formDetails, name: e.target.value })
          }
          required
          placeholder="Your Full Name "
          className="w-full px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 "
        />
      </div>
      <div className="mt-4">
        <label className="block text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Email Address
        </label>
        <input
          type="email"
          value={formDetails.email}
          onChange={(e) =>
            setFormDetails({ ...formDetails, email: e.target.value })
          }
          placeholder="Your Email "
          required
          className="w-full px-4 py-2 mt-2 text-base border  border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 "
        />
      </div>
      <div className="mt-4">
        <label className="block text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Password
        </label>
        <input
          type="password"
          minLength="8"
          placeholder="Your Password"
          value={formDetails.password}
          onChange={(e) =>
            setFormDetails({ ...formDetails, password: e.target.value })
          }
          className="w-full px-4 py-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div
        onClick={validate}
        className="block w-full px-4 py-3 mt-6 font-semibold text-center text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
      >
        Next
      </div>
    </>
  );
};

export default DetailsForm;
