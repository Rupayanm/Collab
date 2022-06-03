import React from "react";
import ListItem, { LoadingSkeleton } from "./ListItem";
import { useQuery } from "react-query";
import { getPublicFeed, GETPUBLICFEED } from "../../../queries/FeedQuery";
import { useAuth } from "../../../context/AuthContext";

const ExploreFeed = () => {
  const { token } = useAuth();

  const { data, isLoading } = useQuery(
    [GETPUBLICFEED, token],
    () => getPublicFeed(1, 50),
    {
      onError: (error) => console.log(error),
    }
  );

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
                Oops no posts found !!!
              </p>
            )}
          </>
        )}
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default ExploreFeed;
