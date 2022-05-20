import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetProfile, GetMyProfile } from "../../../queries/ProfileQuery";
import { socialList } from "../../../Constants";
import { Loading } from "../../../components";

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
      <div className="m-2 border border-gray-300  rounded-xl scrollbar-hide">
        <div className="relative flex items-center h-32 py-4">
          <div className="rounded-xl ml-3 z-10 h-[5.5rem] w-28  overflow-hidden">
            <img
              src={profileData?.avatar}
              alt="profile"
              className="w-24 h-24 rounded-r-2xl "
            ></img>
          </div>
          <div className="z-10 flex flex-col justify-center w-full h-full">
            <div className="flex items-end px-3 text-xl font-medium h-1/2">
              {profileData?.name}
            </div>
            <div className="px-3 font-medium text-purple-600 break-words  h-1/2">
              {profileData?.designation || profileData?.email}
            </div>
          </div>
          <div className="absolute bottom-0 z-0 w-full bg-gray-200 h-1/2"></div>
        </div>
        <div className="p-5 text-sm">{profileData?.about}</div>
        <div className="flex flex-row justify-center mx-4 mb-6 divide-x-2 divide-gray-400 flex-nowrap">
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
          <div className="flex m-6 justify-evenly">
            {socialList?.map((item, index) => (
              <button
                key={index}
                className={`border text-gray-800 rounded-full p-2 border-gray-300 cursor-pointer hover:border-gray-500 hover:text-${item.name}`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-2 m-5">
          {profileData?.skills?.map((item, index) => (
            <div
              key={index}
              className="px-3 py-1 text-sm font-medium border rounded-full w-min"
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
