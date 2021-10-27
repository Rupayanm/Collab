import React from "react";
import ListItem from "./ListItem";
import { posts } from "../../demo/posts";

const Feed = () => {
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="max-w-2xl px-4 grid grid-cols-1 divide-y divide-gray-200 ">
      {posts.map((post, index) => (
        <ListItem key={index} post={post} />
      ))}
    </div>
  );
};

export default Feed;
