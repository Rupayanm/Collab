import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { BsCaretUp, BsCaretDown } from "react-icons/bs";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { LikePost, DislikePost } from "./../../queries/PostQuery";

const ListItem = ({ post, refetch }) => {
  const { refetch: like } = useQuery("like-post", () => LikePost(post._id), {
    enabled: false,
  });
  const { refetch: dislike } = useQuery(
    "dislike-post",
    () => DislikePost(post._id),
    {
      enabled: false,
    }
  );

  return (
    <div className="w-full flex group dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="container flex flex-row pl-4 pr-6 py-6 mx-auto dark:bg-coolGray-900">
        <div className="w-6 pt flex-shrink-0  flex flex-col items-center leading-none">
          <span
            onClick={like}
            className={
              "w-full text-gray-400  text-opacity-75 transition-all duration-300 hover:text-green-500 cursor-pointer mx-auto"
            }
          >
            <BsCaretUp size={25} className="mx-auto" />
          </span>
          <p className="text-xs text-gray-500 font-semibold text-center">
            {post.likesCounter}
          </p>
          <span
            onClick={dislike}
            className="w-full text-gray-400 text-opacity-75 transition-all duration-300 hover:text-red-500 cursor-pointer mx-auto"
          >
            <BsCaretDown className="mx-auto" size={25} />
          </span>
        </div>
        <div className="flex-grow pl-4">
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-coolGray-400">Jun 1, 2020</span>
          </div>
          <div className="mt-2">
            <Link to={`/post/${post._id}`}>
              <p className="text-2xl font-bold truncate cursor-pointer">
                {post.title}
              </p>
            </Link>
            <div className="mt-2 max-h-30 child-ellipsis">
              {post.description ? parse(post.description) : null}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Link to={`/post/${post._id}`}>
              <p className="flex flex-nowrap gap-2 font-semibold items-center text-purple-700 cursor-pointer dark:text-emerald-400">
                Read more
                <FiArrowRight className="transition-transform transform group-hover:translate-x-2" />
              </p>
            </Link>
            <div>
              <p className="flex items-center hover:text-gray-900 cursor-pointer">
                <img
                  // src="https://source.unsplash.com/50x50/?portrait"
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg"
                  alt="avatar"
                  className="object-cover w-6 h-6 mx-4 rounded-full dark:bg-coolGray-500"
                />
                <span className=" dark:text-coolGray-400">{post?.author}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
