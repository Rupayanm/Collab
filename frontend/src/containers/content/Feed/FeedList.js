import React, { useEffect } from "react";
import ListItem from "./ListItem";
// import { posts } from "../../demo/posts";
import { useQuery } from "react-query";
import { getFeed, GETFEED } from "../../../queries/FeedQuery";
import { useAuth } from "../../../context/AuthContext";
// import Pagination from "./../../../components/Pagination";

const Feed = () => {
  const { token } = useAuth();

  const { data, refetch } = useQuery([GETFEED, token], () => getFeed(1, 50), {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    refetch();
  }, [token, refetch]);

  return (
    <>
      <div className="grid w-full grid-cols-1 px-4 divide-y divide-gray-200">
        {data &&
          Array.isArray(data.feed) &&
          data.feed.map((post, index) => (
            <ListItem key={index + token ?? ""} post={post} />
          ))}
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default Feed;
