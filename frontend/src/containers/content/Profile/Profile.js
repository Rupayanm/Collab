import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import ListItem from "../Feed/ListItem";
import { getFeed } from "../../../queries/FeedQuery";
import { FiSettings } from "react-icons/fi";
import ProfileCard from "../../rightbar/ProfileCard/ProfileCard";
import ProfileEditCard from "../../rightbar/ProfileCard/ProfileEditCard";
import { PROFILEEDIT, PROFILE } from "../../../routes/routes.contants";

const Profile = () => {
  const location = useLocation();
  const { data: posts, refetch } = useQuery("feed", () => getFeed(1, 50));

  return (
    <>
      <div className="mx-2 relative">
        <div className="pt-4 lg:hidden">
          {location.pathname === PROFILEEDIT ? (
            <ProfileEditCard />
          ) : (
            <ProfileCard />
          )}
        </div>
        <div className="h-auto w-full text-2xl flex flex-row justify-between items-center font-medium p-2 border-b border-gray-300 bg-white z-10 sticky top-0">
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
        <div className="w-full px-1 grid grid-cols-1 divide-y divide-gray-200 ">
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
