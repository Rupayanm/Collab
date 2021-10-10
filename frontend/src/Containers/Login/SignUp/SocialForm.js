import React, { useState } from "react";
import { socialList } from "./Constants";
import { FaChevronLeft } from "react-icons/fa";

const SocialForm = ({ setFormDetails, formDetails, setStep, submitForm }) => {
  const [social, setSocial] = useState("github");

  const updateSocial = (value) => {
    const socialUrls = { ...formDetails.socials, [social]: value };
    setFormDetails({ ...formDetails, socials: socialUrls });
    console.log();
  };

  return (
    <>
      <div>
        <label className="block text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Socials
        </label>
        <div className="w-full mt-2 pt-2 flex flex-nowrap justify-evenly gap-x-3 gap-y-2 text-black text-lg">
          {socialList.map((item, index) => (
            <div key={index}>
              <div
                className="border rounded-full p-2 border-gray-300"
                onClick={() => setSocial(item.name)}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        <input
          type="url"
          value={formDetails.socials[social]}
          onChange={(e) => updateSocial(e.target.value)}
          placeholder={`Your ${social} url`}
          className="w-full px-4 py-2 mt-4 text-base border border-gray-100 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="inline-flex w-full">
        <div
          onClick={() => setStep(2)}
          className="block px-4 py-3 mt-6 font-semibold border transition duration-500 ease-in-out transform bg-white rounded-l-lg rounded- hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        >
          <FaChevronLeft />
        </div>
        <button
          type="submit"
          className="block flex-grow px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-r-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default SocialForm;
