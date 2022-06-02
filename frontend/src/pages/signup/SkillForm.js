import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { skillList } from "../../Constants";
import { MultiSelectTabs } from "../../components";

const SkillForm = ({ formik, setStep }) => {
  return (
    <>
      <div>
        <label className="block text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Skills
        </label>
        <MultiSelectTabs
          formik={formik}
          options={skillList}
          selected={formik.values.skills}
          name="skills"
        />
      </div>
      <div className="inline-flex w-full">
        <div
          onClick={() => setStep(1)}
          className="flex items-center px-4 py-3 mt-6 font-semibold border transition duration-500 ease-in-out transform bg-white rounded-l-lg rounded- hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        >
          <FaChevronLeft />
        </div>
        <div
          onClick={() => setStep(3)}
          className="block flex-grow px-4 py-3 text-center mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-r-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        >
          Continue
        </div>
      </div>
    </>
  );
};

export default SkillForm;
