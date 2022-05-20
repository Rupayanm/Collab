import React from "react";
import ListItem from "./ListItem";
// import { posts } from "../../demo/posts";
import { useQuery } from "react-query";
import { getFeed, GETFEED } from "../../../queries/FeedQuery";
import { TOKEN } from "../../../Constants";

const Feed = () => {
  const token = localStorage.getItem(TOKEN);

  const { data } = useQuery([GETFEED, token], () => getFeed(1, 50), {
    onError: (error) => console.log(error),
  });

  return (
    <div className="grid w-full grid-cols-1 px-4 divide-y divide-gray-200 ">
      {data &&
        Array.isArray(data.feed) &&
        data.feed.map((post, index) => <ListItem key={index} post={post} />)}
    </div>
  );
};

export default Feed;
