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
import { GETFEED, GETPUBLICFEED } from "../../../queries/FeedQuery";
import { GETPROFILEFEED } from "../../../queries/ProfileQuery";

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

  const like = useMutation(() => LikePost(post._id), {
    onSuccess: () => {
      queryClient.invalidateQueries(GETFEED);
      queryClient.invalidateQueries(GETPUBLICFEED);
      queryClient.invalidateQueries(GETPROFILEFEED);
    },
  });

  const dislike = useMutation(() => DislikePost(post._id), {
    onSuccess: () => {
      queryClient.invalidateQueries(GETFEED);
      queryClient.invalidateQueries(GETPUBLICFEED);
      queryClient.invalidateQueries(GETPROFILEFEED);
    },
  });

  const ratePost = (value) => {
    if (value === "LIKED") {
      like.mutate();
    } else {
      dislike.mutate();
    }
  };

  return (
    <div className="w-full group dark:bg-coolGray-800 dark:text-coolGray-100 last:border-b">
      <div className="flex flex-row px-2 py-5 mx-auto dark:bg-coolGray-900 w-full">
        <div className="flex flex-col items-center w-6 leading-none pt shrink-0">
          <span
            onClick={() => ratePost("LIKED")}
            className={`w-full text-opacity-75 transition-all duration-300 hover:text-green-500 cursor-pointer mx-auto ${
              post?.status === "LIKED" ? "text-green-600" : "text-gray-400"
            }`}
          >
            <BsCaretUp size={25} className="mx-auto" />
          </span>
          <p className="text-xs font-semibold text-center text-gray-500">
            {post.likesCounter}
          </p>
          <span
            onClick={() => ratePost("DISLIKED")}
            className={`w-full text-opacity-75 transition-all duration-300 hover:text-red-400 cursor-pointer mx-auto 
                ${
                  post?.status === "DISLIKED" ? "text-red-500" : "text-gray-400"
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
        <div className="grow pl-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{getTime(post.date)}</span>
          </div>
          <div className="mt-0.5 ">
            <Link to={`/post/${post._id}`}>
              <p className="text-2xl font-bold line-clamp-2 cursor-pointer">
                {post.title}
              </p>
            </Link>
            <div
              className="mt-2 max-h-30 child-ellipsis line-clamp-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.description),
              }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link to={`/post/${post._id}`}>
              <p className="flex items-center gap-2 font-semibold text-purple-700 cursor-pointer flex-nowrap ">
                Read more
                <FiArrowRight className="transition-transform transform group-hover:translate-x-2" />
              </p>
            </Link>
            {post?.name && (
              <div>
                <Link to={`/profile/${post?.postedBy}`}>
                  <p className="flex items-end cursor-pointer hover:text-gray-900">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg"
                      alt="avatar"
                      className="object-cover w-5 h-5 mx-2 rounded-full dark:bg-coolGray-500"
                    />
                    <span className="text-sm font-medium text-gray-500 hover:text-cyan-600 dark:text-coolGray-400">
                      {post?.name}
                    </span>
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
