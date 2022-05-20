import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import ListItem from "../Feed/ListItem";
// import { getFeed } from "../../../queries/FeedQuery";
import { FiSettings } from "react-icons/fi";
import ProfileCard from "../../rightbar/ProfileCard/ProfileCard";
import ProfileEditCard from "../../rightbar/ProfileCard/ProfileEditCard";
import { PROFILEEDIT, PROFILE } from "../../../routes/routes.contants";

const Profile = () => {
  const location = useLocation();
  const { data: posts, refetch } = useQuery("feed", () => {});
  console.log(location);

  return (
    <>
      <div className="relative mx-2">
        <div className="pt-4 lg:hidden">
          {location.pathname === PROFILEEDIT ? (
            <ProfileEditCard />
          ) : (
            <ProfileCard />
          )}
        </div>
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between w-full h-auto p-2 text-2xl font-medium bg-white border-b border-gray-300">
          <div className="pl-1.5">Posts</div>
          {location.pathname === PROFILEEDIT ? (
            <Link to={PROFILE}>
              <div className="text-xl p-2.5 cursor-pointer rounded-full hover:bg-gray-100">
                <FiSettings />
              </div>
            </Link>
          ) : (
            <Link to={PROFILEEDIT}>
              <div className="text-xl p-2.5 cursor-pointer rounded-full hover:bg-gray-100">
                <FiSettings />
              </div>
            </Link>
          )}
        </div>
        <div className="grid w-full grid-cols-1 px-1 divide-y divide-gray-200 ">
          {Array.isArray(posts) &&
            posts.map((post, index) => (
              <ListItem post={post} key={index} refetch={refetch} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
