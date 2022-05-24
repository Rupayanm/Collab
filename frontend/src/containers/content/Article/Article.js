import React from "react";
import { useQuery } from "react-query";
import { MdOutlineArrowBack } from "react-icons/md";
import { FiEdit, FiTrash } from "react-icons/fi";
import { GetPost } from "../../../queries/PostQuery";
import { ToastError } from "../../../components/Toasts";
import { useHistory, useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Loading from "../../../components/Loading/index";
import { GETPOST } from "../../../queries/PostQuery";
import dayjs from "dayjs";
import { useAuth } from "../../../context/AuthContext";
import Comment from "./Comment";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-indigo-500",
];

const Article = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useAuth();

  const onError = (data) => {
    ToastError({ message: data.msg });
  };

  const { isLoading, data } = useQuery([GETPOST, id], () => GetPost(id), {
    onError,
  });

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="relative w-full px-10 pb-4">
      <div className="sticky flex flex-row justify-between top-6  z-10 ">
        <div
          onClick={() => history.goBack()}
          className="w-min text-gray-800 flex flex-nowrap items-center backdrop-filter backdrop-blur-sm py-1.5 px-3 border border-gray-300 rounded-full cursor-pointer hover:border-gray-500 focus:bg-gray-500"
        >
          <MdOutlineArrowBack size={25} className="pointer-events-none" />
          <div className="px-2 font-medium text-md">Back</div>
        </div>
        {user?._id === data?.postedBy && (
          <div className="flex space-x-5">
            <Link to={`/edit/${id}`}>
              <div className="text-gray-800 flex flex-nowrap items-center backdrop-filter backdrop-blur-sm py-1.5 px-4 border border-gray-300 rounded-full sticky top-6 cursor-pointer hover:border-gray-500 focus:bg-gray-500 group">
                <FiEdit size={20} className="pointer-events-none" />
                <div className="font-medium text-md duration-300 transition-all w-0 overflow-hidden group-hover:w-auto group-hover:ml-2">
                  Edit
                </div>
              </div>
            </Link>
            <div className="text-red-500 flex flex-nowrap items-center backdrop-filter backdrop-blur-sm py-1.5 px-4 border border-red-300 rounded-full sticky top-6 cursor-pointer hover:border-red-400 focus:bg-red-400 group">
              <FiTrash size={20} className="pointer-events-none" />
              <div className="font-medium text-md duration-300 transition-all w-0 overflow-hidden group-hover:w-auto group-hover:ml-2 group-hover:mr-1">
                Delete
              </div>
            </div>
          </div>
        )}
      </div>
      <article className="mt-10 space-y-6 dark:bg-coolGray-800 dark:text-coolGray-50">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
            {data?.title}
          </h1>
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-coolGray-400">
            <div className="flex items-center md:space-x-2">
              <Link
                to={"/profile/" + data?.postedBy}
                className="flex items-center space-x-2"
              >
                <img
                  src="https://source.unsplash.com/75x75/?portrait"
                  alt=""
                  className="w-4 h-4 border rounded-full dark:bg-coolGray-500 dark:border-coolGray-700"
                />
                <p className="text-sm duration-200 hover:text-indigo-700">
                  {data?.author?.name}
                </p>
              </Link>
              <p className="text-sm">
                {" "}
                • {dayjs(data?.date).format("MMMM DD, YYYY ")}
              </p>
            </div>
            <p className="mt-3 text-sm shrink-0 md:mt-0">
              {data?.views ?? 0} views
            </p>
          </div>
        </div>
        <div
          className="pb-3 dark:text-coolGray-100"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.description),
          }}
        ></div>
      </article>
      <div className="border-b">
        <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-coolGray-400">
          {data?.tags &&
            data.tags.map((item, index) => (
              <p
                key={index}
                className={`px-3 py-1 cursor-pointer  text-white border border-gray-300 rounded-lg hover:underline dark:bg-emerald-400 dark:text-coolGray-900 capitalize ${
                  colors[index % colors.length]
                }`}
              >
                {item}
              </p>
            ))}
        </div>
        {data?.links && data.links.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Related posts</h4>
            <ul className="ml-4 space-y-1 list-disc">
              {data?.links.map((item, index) => (
                <li key={index}>
                  <a
                    href={item}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-blue-700 hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Comment comments={data?.comments} />
    </div>
  );
};

export default Article;
