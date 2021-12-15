import React, { useState } from "react";
import Input from "../Input";
import { socialList } from "../../Constants";

const MultiSocialForm = (props) => {
  const { formik, name, label = true, defaultValue = "github" } = props;

  const [social, setSocial] = useState(defaultValue);

  const updateSocial = (value) => {
    const socialUrls = { ...formik.values[name], [social]: value };
    formik.setFieldValue(name, socialUrls);
  };

  return (
    <>
      <div className="w-full">
        {label && (
          <label className="block w-full mb-2 pb-2 text-md font-medium leading-relaxed tracking-tighter text-blueGray-700 ">
            Socials
          </label>
        )}
        <div className="w-full mb-5 flex flex-nowrap justify-evenly gap-x-3 gap-y-2 text-gray-500 text-lg">
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
        <Input
          type="url"
          value={formik.values.socials[social]}
          onChange={(e) => updateSocial(e.target.value)}
          placeholder={`Your ${social} url`}
        />
      </div>
    </>
  );
};

export default MultiSocialForm;
