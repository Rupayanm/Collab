import React from "react";
import ListItem from "./ListItem";
// import { posts } from "../../demo/posts";
import { useQuery } from "react-query";
import { getFeed, GETFEED } from "../../queries/FeedQuery";

const Feed = () => {
  const { data } = useQuery([GETFEED], () => getFeed(1, 50), {
    keepPreviousData: true,
  });

  return (
    <div className="w-full px-4 grid grid-cols-1 divide-y divide-gray-200 ">
      {data &&
        Array.isArray(data.feed) &&
        data.feed.map((post, index) => <ListItem key={index} post={post} />)}
    </div>
  );
};

export default Feed;
