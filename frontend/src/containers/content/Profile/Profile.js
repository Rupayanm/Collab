import React from "react";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import ListItem, { LoadingSkeleton } from "../Feed/ListItem";
// import { getFeed } from "../../../queries/FeedQuery";
import { FiSettings } from "react-icons/fi";
import ProfileCard from "../../rightbar/ProfileCard/ProfileCard";
import ProfileEditCard from "../../rightbar/ProfileCard/ProfileEditCard";
import { PROFILEEDIT, PROFILE } from "../../../routes/routes.contants";
import {
  GETPROFILEFEED,
  GetProfileFeed,
} from "./../../../queries/ProfileQuery";
import { useAuth } from "../../../context/AuthContext";

const Profile = () => {
  let { id } = useParams();
  const { user } = useAuth();
  const history = useHistory();
  const location = useLocation();
  id = id !== ":id" && id !== "me" ? id : null;

  const { data, refetch, isLoading } = useQuery([GETPROFILEFEED], () =>
    GetProfileFeed(id ?? user?._id)
  );

  if (!(id || user?._id)) {
    history.goBack();
  }

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
          {isLoading ? (
            <>
              <div className="flex flex-col divide-y">
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
              </div>
            </>
          ) : (
            <>
              {data?.posts && data?.posts?.length === 0 ? (
                <p className="py-3 px-2.5 text-xl text-gray-500 leading-8">
                  Oops no posts found!
                  {id === null ||
                    (id === user?._id && (
                      <>
                        <br />
                        <Link to="/create">
                          <span className="text-green-400 hover:text-red-400 duration-300">
                            Create
                          </span>
                        </Link>{" "}
                        your first post now!
                      </>
                    ))}
                </p>
              ) : (
                <>
                  {data?.posts?.map((post, index) => (
                    <ListItem post={post} key={index} refetch={refetch} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
