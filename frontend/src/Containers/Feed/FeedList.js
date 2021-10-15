import React from "react";
import ListItem from "./ListItem";

const Feed = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="max-w-2xl px-4 grid grid-cols-1 divide-y divide-gray-200 ">
      {items.map((item, index) => (
        <ListItem key={index} />
      ))}
    </div>
  );
};

export default Feed;
