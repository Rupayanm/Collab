import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { skillList } from "../../../Constants";
import MultiSelectTabs from "../../../Components/MultiSelectTabs";

const SkillForm = ({ setFormDetails, formDetails, setStep }) => {
  const removeSkill = (value) => {
    let skills = formDetails.skills.filter((item) => item !== value);
    setFormDetails({ ...formDetails, skills });
  };

  const addSkill = (value) => {
    let skills = formDetails.skills;
    skills.push(value);
    setFormDetails({ ...formDetails, skills });
  };

  return (
    <>
      <div>
        <label className="block text-md font-medium leading-relaxed tracking-tighter text-blueGray-700">
          Skills
        </label>
        <MultiSelectTabs
          options={skillList}
          selected={formDetails.skills}
          addItem={addSkill}
          removeItem={removeSkill}
        />
      </div>
      <div className="inline-flex w-full">
        <div
          onClick={() => setStep(1)}
          className="block px-4 py-3 mt-6 font-semibold border transition duration-500 ease-in-out transform bg-white rounded-l-lg rounded- hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
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
