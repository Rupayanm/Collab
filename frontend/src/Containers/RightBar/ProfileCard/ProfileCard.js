import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetProfile, GetMyProfile } from "../../../queries/ProfileQuery";
import { socialList } from "../../../Constants";
import { Loading } from "../../../Components";

// const data = {
//   name: "Subhajit Mandal",
//   designation: "Tech Enthusiast",
//   about:
//     "Elit in irure anim ex. Officia deserunt quis do proident culpa. Veniam officia do nulla velit aliqu do fugiat elit pariatur mollit eiusmod eiusmod do ex.",
//   likes: 36,
//   post: 4,
// };

const ProfileCard = () => {
  const { id } = useParams();

  const queryFunc =
    id !== ":id" && id !== undefined ? () => GetProfile(id) : GetMyProfile;

  const { data: profileData, isLoading } = useQuery("getProfile", queryFunc);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className=" m-2 rounded-xl border border-gray-300 scrollbar-hide">
        <div className="py-4 h-32 flex items-center relative">
          <div className="rounded-r-2xl z-10 h-24 w-28 bg-green-300 overflow-hidden">
            <img
              src={profileData?.avatar}
              alt="profile"
              className="rounded-r-2xl h-24 w-24 "
            ></img>
          </div>
          <div className="h-full w-full z-10 flex flex-col justify-center">
            <div className="text-xl flex items-end h-1/2 px-3  font-medium">
              {profileData?.name}
            </div>
            <div className=" px-3 h-1/2 text-purple-600 font-medium break-words">
              {profileData?.designation || profileData?.email}
            </div>
          </div>
          <div className="h-1/2 w-full bg-gray-200 z-0 absolute bottom-0"></div>
        </div>
        <div className="text-sm p-5">{profileData?.about}</div>
        <div className="flex flex-row flex-nowrap justify-center divide-x-2 divide-gray-400 mx-4 mb-6">
          <div className="px-10 text-center">
            <h6 className="text-lg font-bold text-deep-purple-accent-400">
              {profileData?.post || 0}
            </h6>
            <p className="font-bold">Posts</p>
          </div>
          <div className="px-10 text-center ">
            <h6 className="text-lg font-bold text-deep-purple-accent-400">
              {profileData?.likes || 0}
            </h6>
            <p className="font-bold">Likes</p>
          </div>
        </div>
        {profileData?.socials && (
          <div className="flex justify-evenly m-6">
            {socialList.map((item, index) => (
              <button
                key={index}
                className={`border text-gray-800 rounded-full p-2 border-gray-300 cursor-pointer hover:border-gray-500 hover:text-${item.name}`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        )}
        <div className="m-5 flex flex-wrap justify-center gap-2">
          {profileData?.skills.map((item, index) => (
            <div
              key={index}
              className="font-medium text-sm w-min py-1 px-3 rounded-full border"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
