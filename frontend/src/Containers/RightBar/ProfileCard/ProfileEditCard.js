import React, { useState } from "react";
import { useQuery } from "react-query";
import { GetProfile, UpdateProfile } from "../../../queries/ProfileQuery";
import MultiSocialForm from "../../../Components/MultiSocialForm/MultiSocialForm";
import { skillList } from "../../../Constants";
import MultiSelectTabs from "./../../../Components/MultiSelectTabs/index";
import DropzoneInput from "./../../../Components/Dropzone/index";

// const data = {
//   name: "Subhajit Mandal",
//   designation: "Tech Enthusiast",
//   about:
//     "Elit in irure anim ex. Officia deserunt quis do proident culpa. Veniam officia do nulla velit aliqu do fugiat elit pariatur mollit eiusmod eiusmod do ex.",
//   likes: 36,
//   post: 4,
//   skills: ["Python", "Javascript", "Java", "React"],
//   socials: { github: "", twitter: "", facebook: "", linkedin: "" },
// };

const initialData = {
  name: "",
  designation: "",
  about: "",
  skills: [],
  socials: { github: "", twitter: "", facebook: "", linkedin: "" },
};

const tabClass = "text-sm w-min p-0 rounded-full";
const containerClass = "p-0 justify-center gap-2";

const ProfileEditCard = () => {
  // const { data: profileData } = useQuery("get-profile", GetProfile);

  const [formDetails, setFormDetails] = useState(initialData);

  const { isLoading } = useQuery("update-profile", UpdateProfile(formDetails), {
    enabled: false,
  });

  const removeTag = (value) => {
    let skills = formDetails.skills.filter((item) => item !== value);
    setFormDetails({ ...formDetails, skills });
  };

  const addTag = (value) => {
    let skills = formDetails.skills;
    skills.push(value);
    setFormDetails({ ...formDetails, skills });
  };

  return (
    <>
      <div className=" m-2 rounded-xl border border-gray-300 scrollbar-hide">
        <div className="w-full text-center text-xl mx-auto pt-5 font-bold ">
          {formDetails.name}
        </div>
        <div>
          <DropzoneInput />
        </div>
        <div className=" px-5 ">
          <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
            Designation
          </label>
          <input
            type="text"
            placeholder="Your bio"
            value={formDetails.designation}
            required
            onChange={(e) =>
              setFormDetails({ ...formDetails, designation: e.target.value })
            }
            className="w-full resize-none px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-gray-300 "
          />
        </div>
        <div className="py-3 px-5 ">
          <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
            About
          </label>
          <textarea
            type="text"
            placeholder="Your bio"
            value={formDetails.about}
            required
            onChange={(e) =>
              setFormDetails({ ...formDetails, about: e.target.value })
            }
            className="w-full h-36 resize-none px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-gray-300 "
          />
        </div>
        {/* <div className="flex flex-row flex-nowrap justify-center divide-x-2 divide-gray-400 mx-4 mb-6"></div> */}
        <div className="flex justify-evenly mx-6 my-3">
          <MultiSocialForm
            formDetails={formDetails}
            setFormDetails={setFormDetails}
          />
        </div>
        <div className="m-5 flex flex-wrap justify-center gap-2">
          <MultiSelectTabs
            options={skillList}
            addItem={addTag}
            removeItem={removeTag}
            selected={formDetails.skills}
            tabClass={tabClass}
            containerClass={containerClass}
          />
        </div>
        <div className="w-full mb-5 px-5">
          <button
            type="button"
            className="w-full px-4 py-3 justify-center font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-gray-400 hover:bg-black hover:text-white focus:outline-none focus:shadow-outline focus:ring-2  "
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileEditCard;
