import React from "react";
import { useQuery } from "react-query";
import { GetProfile } from "../../../queries/ProfileQuery";
import { socialList } from "../../../Constants";
import { FiSettings } from "react-icons/fi";

const data = {
  name: "Subhajit Mandal",
  designation: "Tech Enthusiast",
  about:
    "Elit in irure anim ex. Officia deserunt quis do proident culpa. Veniam officia do nulla velit aliqu do fugiat elit pariatur mollit eiusmod eiusmod do ex.",
  likes: 36,
  post: 4,
};

const ProfileCard = () => {
  const { data: profileData } = useQuery("get-profile", () => GetProfile("me"));
  console.log(profileData);

  const currentUser = null;
  const options = ["Python", "Javascript", "Java", "React"];
  return (
    <>
      <div className=" m-2 rounded-xl border border-gray-300 scrollbar-hide">
        <div className="py-4 flex items-center relative">
          <div className="rounded-r-2xl z-10 h-24 w-24 bg-green-300">
            {/* <img
              src="https://source.unsplash.com/ILip77SbmOE/100x110"
              alt="profile"
            ></img> */}
          </div>
          <div className="h-full w-full z-10 flex flex-col justify-center">
            <div className="text-xl  px-3 py-1 font-medium">{data.name}</div>
            <div className=" px-3 py-1 text-purple-600 font-medium">
              {data.designation}
            </div>
          </div>
          <div className="h-1/2 w-full bg-gray-200 z-0 absolute bottom-0">
            {data._id === currentUser && (
              <div className="text-lg p-2.5 rounded-full z-10 absolute top-0 right-1">
                <FiSettings />
              </div>
            )}
          </div>
        </div>
        <div className="text-sm p-5">{data.about}</div>
        <div className="flex flex-row flex-nowrap justify-center divide-x-2 divide-gray-400 mx-4 mb-6">
          <div className="px-10 text-center">
            <h6 className="text-lg font-bold text-deep-purple-accent-400">
              {data.post}
            </h6>
            <p className="font-bold">Posts</p>
          </div>
          <div className="px-10 text-center ">
            <h6 className="text-lg font-bold text-deep-purple-accent-400">
              {data.likes}
            </h6>
            <p className="font-bold">Likes</p>
          </div>
        </div>
        <div className="flex justify-evenly m-6">
          {socialList.map((item, index) => (
            <div key={index}>
              <div
                className={`border text-gray-800 rounded-full p-2 border-gray-300 cursor-pointer hover:border-gray-500 hover:text-${item.name}`}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        <div className="m-5 flex flex-wrap justify-center gap-2">
          {options.map((item, index) => (
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
