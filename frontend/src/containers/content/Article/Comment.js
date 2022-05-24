import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../../context/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import {
  AddComment,
  DeleteComment,
  GETPOST,
} from "./../../../queries/PostQuery";

dayjs.extend(RelativeTime);

const getTime = (time) => {
  if (dayjs().isSame(time, "month")) {
    return dayjs(time).fromNow();
  } else if (dayjs().isSame(time, "month")) {
    return dayjs(time).format("MMM DD");
  }
  return dayjs(time).format("MMM DD, YY");
};

function Comment({ comments }) {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const addComment = useMutation((values) => AddComment(id, values), {
    onSuccess: () => queryClient.invalidateQueries(GETPOST),
  });

  const postComment = () => {
    if (text) {
      addComment.mutate({ text });
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-baseline">
        <div className="py-4 text-xl font-bold">Comments</div>
        <div className="text-sm">{comments?.length} Comments</div>
      </div>
      <div className="flex space-x-2.5 -z-10">
        <div className="grow">
          <input
            className={` w-full px-3 py-2  text-base border border-gray-300 text-black transition duration-500 ease-in-out  transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ${
              false && "ring-2 ring-red-300"
            }`}
            placeholder="Type something here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {false && (
            <div className="text-red-400 text-xs font-medium text-right"></div>
          )}
        </div>
        <button
          className="px-5 text-center font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
          onClick={postComment}
        >
          Post
        </button>
      </div>
      <div className="flex flex-col divide-y my-4 items-stretch">
        {comments?.map((item) => (
          <CommentItem
            key={item?._id}
            item={item}
            active={item?.user === user?._id}
          />
        ))}
      </div>
    </div>
  );
}

const CommentItem = React.memo(({ item, active }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const deleteComment = useMutation(() => DeleteComment(id, item?._id), {
    onSuccess: () => queryClient.invalidateQueries(GETPOST),
  });

  return (
    <>
      <div className="flex py-4 group min-w-full">
        <div className="bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full w-10 h-10 mt-1 mr-3 shrink-0 grid place-items-center">
          <span className="text-gray-100 font-bold">
            {item?.name?.slice(0, 1)}
          </span>
        </div>
        <div className="grow">
          <div className="flex w-full items-center space-x-1.5 text-gray-700 mb-0.25">
            <Link to={"/profile/" + item?.user}>
              <div className="font-bold duration-200 hover:text-black cursor-pointer">
                {item?.name}
              </div>
            </Link>
            <span>•</span>
            <div className="text-xs grow">{getTime(dayjs(item?.date))}</div>
            {active && (
              <div
                className="hidden text-[10px] font-bold border-2 rounded-md border-red-400 text-red-500 px-2 cursor-pointer group-hover:flex"
                onClick={deleteComment.mutate}
              >
                DELETE
              </div>
            )}
          </div>
          <div className="text-sm leading-5">{item?.text}</div>
        </div>
      </div>
    </>
  );
});

export default Comment;
