import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  GETNOTIFICATIONS,
  GetNotifications,
  ReadNotification,
} from "./../../../queries/ProfileQuery";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
import { FiChevronDown } from "react-icons/fi";

const NotificationBar = () => {
  const { token } = useAuth();

  const { data: notis } = useQuery(
    [GETNOTIFICATIONS, token],
    GetNotifications,
    {
      enabled: Boolean(token),
    }
  );

  return (
    <>
      <div className=" m-2 rounded-xl border border-gray-300 overflow-hidden">
        <div className="py-3 px-5 text-2xl font-semibold border-b border-gray-300">
          Notifications
        </div>
        <div className="flex flex-col divide-y max-h-84 overflow-y-scroll noti-scrollbar noti">
          {notis && notis?.length === 0 ? (
            <div className="mx-3 px-1 py-3">No notifications found</div>
          ) : (
            <>
              {notis?.map((item) => (
                <NotificationItem data={item} key={item?._id} />
              ))}
            </>
          )}
          {/* {data.map((item, index) => (
            <Accordian data={item} key={index} />
          ))} */}
        </div>
      </div>
    </>
  );
};

const NotificationItem = ({ data }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const readMutation = useMutation(ReadNotification, {
    onSuccess: queryClient.invalidateQueries(GETNOTIFICATIONS),
  });

  const handleRead = () => {
    setOpen((prev) => !prev);
    if (data?.isRead === false) {
      readMutation.mutate(data?._id);
    }
  };
  return (
    <div className={`flex flex-col mx-3 px-1 py-3 ${data?.isRead ? "" : ""}`}>
      <div className="w-full mx-1 flex flex-row justify-between items-center">
        <div className="flex-grow">
          <div className="font-medium">
            <Link to={`/profile/${data?.sender?._id}`}>
              <span className="duration-200 hover:text-green-400">
                {data?.sender?.name}
              </span>
            </Link>{" "}
            {data?.content}
          </div>
          {/* <div className="max-w-full overflow-hidden">
            <p className="line-clamp-1">{data?.post?.title}</p>
          </div> */}
          <div className="text-xs mt-0.5 text-gray-500 ">
            {dayjs(data?.createdAt)?.format("HH:mm MMMM DD, YYYY")}
          </div>
        </div>
        <div
          className={`mx-1 p-1 transition-colors duration-150 rounded-full hover:bg-gray-100 focus:bg-black focus:text-white`}
          onClick={handleRead}
        >
          <FiChevronDown
            size={25}
            className={` duration-100
            ${open ? "rotate-180" : ""}
            ${!data?.isRead && !open ? "text-green-500" : "text-black"}`}
          />
        </div>
      </div>
      <div
        className={`word-break  transition-all mx-1 overflow-hidden ${
          open ? "mt-2 h-auto" : "h-0 "
        }`}
      >
        <Link to={`/post/` + data?.post?._id}>
          <div className="font-medium line-clamp-2 text-gray-900 hover:text-black cursor-pointer">
            {data?.post?.title}
          </div>
        </Link>
        {data?.type === "COMMENT" && (
          <div className=" text-sm line-clamp-4 text-gray-700">
            {data?.meta?.body}
          </div>
        )}
      </div>
    </div>
  );
};
export default NotificationBar;
