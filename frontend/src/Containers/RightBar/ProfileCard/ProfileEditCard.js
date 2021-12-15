import React from "react";
import { useQuery, useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GetMyProfile, UpdateProfile } from "../../../queries/ProfileQuery";
import { skillList } from "../../../Constants";
import {
  MultiSelectTabs,
  MultiSocialForm,
  DropzoneInput,
  Input,
  Loading,
} from "../../../Components";

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

const initialValues = {
  name: "",
  designation: "",
  about: "",
  skills: [],
  socials: { github: "", twitter: "", facebook: "", linkedin: "" },
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  designation: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  about: Yup.string()
    .max(200, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const tabClass = "text-sm w-min p-0 rounded-full";
const containerClass = "p-0 justify-center gap-2";

const ProfileEditCard = () => {
  //Get Profile Query
  const { data: profileData, isLoading } = useQuery(
    "getMyProfile",
    GetMyProfile
  );

  //Update Profile Query
  const updateQuery = useMutation((values) => UpdateProfile(values));

  const formik = useFormik({
    initialValues: { ...initialValues, ...profileData },
    enableReinitialize: true,
    onSubmit: (values) => updateQuery.mutate(values),
    validationSchema,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className=" m-2 rounded-xl border border-gray-300 scrollbar-hide">
        <div className="w-full text-center text-xl mx-auto pt-5 font-bold ">
          {profileData.name}
        </div>
        <div>
          <DropzoneInput />
        </div>
        <div className=" px-5 ">
          <label className="block mb-2 text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
            Designation
          </label>
          <Input
            name="designation"
            type="text"
            placeholder="Your bio"
            value={formik.values.designation}
            onChange={formik.handleChange}
          />
        </div>
        <div className="py-3 px-5 ">
          <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
            About
          </label>
          <textarea
            type="text"
            placeholder="Your bio"
            value={formik.values.about}
            onChange={formik.handleChange}
            className="w-full h-36 resize-none px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-gray-300 "
          />
        </div>
        {/* <div className="flex flex-row flex-nowrap justify-center divide-x-2 divide-gray-400 mx-4 mb-6"></div> */}
        <div className="flex justify-evenly mx-6 my-3">
          <MultiSocialForm name="socials" formik={formik} />
        </div>
        <div className="m-5 flex flex-wrap justify-center gap-2">
          <MultiSelectTabs
            name="skills"
            formik={formik}
            selected={formik.values.skills}
            options={skillList}
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
