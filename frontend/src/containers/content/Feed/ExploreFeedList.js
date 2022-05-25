import React from "react";
import ListItem from "./ListItem";
import { useQuery } from "react-query";
import { getPublicFeed, GETPUBLICFEED } from "../../../queries/FeedQuery";
import { useAuth } from "../../../context/AuthContext";
// import Pagination from "../../../components/Pagination";

const ExploreFeed = () => {
  const { token } = useAuth();

  const { data } = useQuery(
    [GETPUBLICFEED, token],
    () => getPublicFeed(1, 50),
    {
      onError: (error) => console.log(error),
    }
  );

  return (
    <>
      <div className="grid w-full grid-cols-1 px-4 divide-y divide-gray-200">
        {data &&
          Array.isArray(data.feed) &&
          data.feed.map((post) => <ListItem key={post?._id} post={post} />)}
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default ExploreFeed;
