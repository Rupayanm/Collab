import React from "react";
import ListItem from "./ListItem";
// import { posts } from "../../demo/posts";
import { useQuery } from "react-query";
import { getFeed } from "../../queries/FeedQuery";

const Feed = () => {
  const { data, refetch } = useQuery("feed", getFeed);

  return (
    <div className="w-full px-4 grid grid-cols-1 divide-y divide-gray-200 ">
      {data?.map((post, index) => (
        <ListItem key={index} post={post} refetch={refetch} />
      ))}
    </div>
  );
};

export default Feed;
