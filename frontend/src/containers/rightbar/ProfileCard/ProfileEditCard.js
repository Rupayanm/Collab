import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  GetMyProfile,
  UpdateProfile,
  GETMYPROFILE,
  GETPROFILE,
} from "../../../queries/ProfileQuery";
import { skillList } from "../../../Constants";
import { useHistory } from "react-router-dom";
import { PROFILE } from "./../../../routes/routes.contants";
import {
  MultiSelectTabs,
  MultiSocialForm,
  // DropzoneInput,
  Input,
  Loading,
} from "../../../components";

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
  bio: "",
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
  bio: Yup.string()
    .max(200, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const tabClass = "text-sm w-min p-0 rounded-full";
const containerClass = "p-0 justify-center gap-2";

const ProfileEditCard = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  //Get Profile Query
  const { data: profileData, isLoading } = useQuery(GETMYPROFILE, GetMyProfile);

  //Update Profile Query
  const updateQuery = useMutation((values) => UpdateProfile(values), {
    onSuccess: () => {
      queryClient.invalidateQueries(GETMYPROFILE, GETPROFILE);
      history.push(PROFILE);
    },
  });

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
      <div className="m-2 border border-gray-300 rounded-xl scrollbar-hide">
        <div className="w-full pt-5 mx-auto text-xl font-bold text-center ">
          {profileData.name}
        </div>
        <div>{/* <DropzoneInput /> */}</div>
        <div className="px-5 pt-3">
          <label className="block mb-2 text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
            Designation
          </label>
          <Input
            name="designation"
            type="text"
            placeholder="Software developer ..."
            value={formik.values.designation}
            onChange={formik.handleChange}
            error={formik.errors.designation}
            touched={formik.touched.designation}
          />
        </div>
        <div className="px-5 py-3 ">
          <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
            About
          </label>
          <textarea
            name="bio"
            type="text"
            placeholder="Your bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            className={`w-full px-3 py-2 mt-2 text-base text-black transition duration-300 transform border border-gray-300 rounded-lg resize-none h-36 bg-blueGray-100 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ${
              formik.errors.bio && formik.touched.bio && "ring-2 ring-red-300"
            }`}
          />
          {formik.errors.bio && formik.touched.bio && (
            <div className="text-xs font-medium text-right text-red-400">
              {formik.errors.bio}
            </div>
          )}
        </div>
        {/* <div className="flex flex-row justify-center mx-4 mb-6 divide-x-2 divide-gray-400 flex-nowrap"></div> */}
        <div className="flex mx-6 my-3 justify-evenly">
          <MultiSocialForm name="socials" formik={formik} />
        </div>
        <div className="flex flex-wrap justify-center gap-2 m-5">
          <MultiSelectTabs
            name="skills"
            formik={formik}
            selected={formik.values.skills}
            options={skillList}
            tabClass={tabClass}
            containerClass={containerClass}
          />
        </div>
        <div className="w-full px-5 mb-5">
          <button
            type="button"
            className="justify-center w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border border-gray-400 rounded-lg hover:bg-black hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 "
            onClick={() => formik.handleSubmit()}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileEditCard;
