import React from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import {
  BsCaretUp,
  BsCaretDown,
  // BsBookmark,
  // BsBookmarkFill,
} from "react-icons/bs";
import DOMPurify from "dompurify";
import { useMutation } from "react-query";
import { LikePost, DislikePost } from "../../../queries/PostQuery";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { GETFEED } from "../../../queries/FeedQuery";
import { TOKEN } from "../../../Constants";

dayjs.extend(RelativeTime);

const getTime = (time) => {
  if (dayjs().isSame(time, "month")) {
    return dayjs(time).fromNow();
  } else if (dayjs().isSame(time, "month")) {
    return dayjs(time).format("MMM DD");
  }
  return dayjs(time).format("MMM DD, YY");
};

const ListItem = ({ post }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem(TOKEN);

  const like = useMutation(() => LikePost(post._id), {
    onSuccess: () => queryClient.invalidateQueries([GETFEED, token]),
  });

  const dislike = useMutation(() => DislikePost(post._id), {
    onSuccess: () => queryClient.invalidateQueries([GETFEED, token]),
  });

  const ratePost = (value) => {
    if (value === 1) {
      like.mutate();
    } else {
      dislike.mutate();
    }
  };

  return (
    <div className="w-full flex group dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="container flex flex-row px-2 py-5 mx-auto dark:bg-coolGray-900">
        <div className="w-6 pt shrink-0  flex flex-col items-center leading-none">
          <span
            onClick={() => ratePost(1)}
            className={`w-full text-opacity-75 transition-all duration-300 hover:text-green-500 cursor-pointer mx-auto ${
              post?.hasLiked === 1 ? "text-green-500" : "text-gray-400"
            }`}
          >
            <BsCaretUp size={25} className="mx-auto" />
          </span>
          <p className="text-xs text-gray-500 font-semibold text-center">
            {post.likesCounter}
          </p>
          <span
            onClick={() => ratePost(-1)}
            className={`w-full text-opacity-75 transition-all duration-300 hover:text-red-500 cursor-pointer mx-auto 
                ${
                  (post?.hasLiked === 1) === -1
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
          >
            <BsCaretDown className="mx-auto" size={25} />
          </span>
          {/* <span
            onClick={() => ratePost(-1)}
            className={`w-full text-opacity-75 transition-all duration-300 hover:text-gray-700 cursor-pointer md:mt-auto md:mb-1
                ${post?.isBookmarked ? "text-gray-400" : "text-gray-500"}`}
          >
            {post?.isBookmarked ? (
              <BsBookmark className="mx-auto" size={18} />
            ) : (
              <BsBookmarkFill className="mx-auto" size={18} />
            )}
          </span> */}
        </div>
        <div className="flex-grow pl-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{getTime(post.date)}</span>
          </div>
          <div className="mt-0.5">
            <Link to={`/post/${post._id}`}>
              <p className="text-2xl font-bold truncate cursor-pointer">
                {post.title}
              </p>
            </Link>
            <div
              className="mt-2 max-h-30 child-ellipsis"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.description),
              }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link to={`/post/${post._id}`}>
              <p className="flex flex-nowrap gap-2 font-semibold items-center text-purple-700 cursor-pointer ">
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
