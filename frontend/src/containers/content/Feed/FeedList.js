import React, { useEffect } from "react";
import ListItem, { LoadingSkeleton } from "./ListItem";
// import { posts } from "../../demo/posts";
import { useQuery } from "react-query";
import { getFeed, GETFEED } from "../../../queries/FeedQuery";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
// import Pagination from "./../../../components/Pagination";

const Feed = () => {
  const { token } = useAuth();

  const { data, refetch, isLoading } = useQuery(
    [GETFEED, token],
    () => getFeed(1, 50),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [token, refetch]);

  return (
    <>
      <div className="grid w-full grid-cols-1 px-4 divide-y divide-gray-200">
        {isLoading ? (
          <div className="flex flex-col divide-y">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : (
          <>
            {data && data?.feed?.length > 0 ? (
              <>
                {Array.isArray(data.feed) &&
                  data.feed.map((post, index) => (
                    <ListItem key={index + token ?? ""} post={post} />
                  ))}
              </>
            ) : (
              <p className="py-4 text-xl text-gray-500 leading-8">
                Oops no posts match your skillset !!!
                <br />
                <Link to="/explore">
                  <span className="text-green-400 hover:text-red-400 duration-300">
                    Explore
                  </span>
                </Link>{" "}
                all posts
              </p>
            )}
          </>
        )}
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default Feed;
