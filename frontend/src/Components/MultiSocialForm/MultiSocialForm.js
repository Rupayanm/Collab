import React, { useState } from "react";
import { socialList } from "../../Constants";

const MultiSocialForm = ({ setFormDetails, formDetails }) => {
  const [social, setSocial] = useState("github");

  const updateSocial = (value) => {
    const socialUrls = { ...formDetails.socials, [social]: value };
    setFormDetails({ ...formDetails, socials: socialUrls });
    console.log();
  };

  return (
    <>
      <div className="w-full">
        {/* <label className="block w-full mb-2 pb-2 text-md font-medium leading-relaxed tracking-tighter text-blueGray-700 ">
          Socials
        </label> */}
        <div className="w-full flex flex-nowrap justify-evenly gap-x-3 gap-y-2 text-black text-lg">
          {socialList.map((item, index) => (
            <div key={index}>
              {item.name !== social ? (
                <div
                  className={`border rounded-full p-2 border-gray-300 hover:border-gray-500 hover:text-${item.name}`}
                  onClick={() => setSocial(item.name)}
                >
                  {item.icon}
                </div>
              ) : (
                <div
                  className={`border rounded-full p-2 border-gray-500 text-${item.name}`}
                  onClick={() => setSocial(item.name)}
                >
                  {item.icon}
                </div>
              )}
            </div>
          ))}
        </div>
        <input
          type="url"
          value={formDetails.socials[social]}
          onChange={(e) => updateSocial(e.target.value)}
          placeholder={`Your ${social} url`}
          className="w-full px-4 py-2 mt-4 text-base border border-gray-100 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:border-gray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-gray-300"
        />
      </div>
    </>
  );
};

export default MultiSocialForm;
