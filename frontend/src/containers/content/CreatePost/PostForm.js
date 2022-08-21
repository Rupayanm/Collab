import React, { useEffect } from "react";
import { useHistory, useParams, matchPath, useLocation } from "react-router";
import { useQuery, useMutation } from "react-query";
import { MdOutlineArrowBack } from "react-icons/md";
import { skillList } from "../../../Constants";
import { useFormContext } from "../../../context/FormContext";
import { NewPost, GetPost, UpdatePost } from "../../../queries/PostQuery";
import {
  // MultiInput,
  MultiSelectTabs,
  // TextEditor,
  ToastSuccess,
} from "../../../components";
import ArticleEditor from "./ArticleEditor";

const getReadTime = (paragraph) => {
  return Math.ceil(((paragraph?.split(" ")?.length || 0) * 60) / 280);
};

const PostForm = () => {
  const location = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const {
    value: formDetails,
    resetValue,
    setInitialValue,
    setTitle,
    setDescription,
    addTag,
    removeTag,
    // addLink,
    // removeLink,
  } = useFormContext();

  const match = matchPath(location.pathname, {
    path: "/edit/:id",
  });

  const { data: postData } = useQuery(["get-post", id], () => GetPost(id), {
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (postData) {
      setInitialValue(postData);
    } else {
      resetValue();
    }
    return resetValue;
    //eslint-disable-next-line
  }, [postData]);

  const onSuccess = (data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      ToastSuccess({ message: `Post ${match ? "Updated" : "Created"}` });
      history.push("/post/" + data?._id);
    }
  };

  const updatePostQuery = useMutation(
    () =>
      UpdatePost(id, {
        ...formDetails,
        readTime: getReadTime(formDetails.description),
      }),
    {
      onSuccess,
    }
  );

  const createPostQuery = useMutation(
    () =>
      NewPost({
        ...formDetails,
        readTime: getReadTime(formDetails.description),
      }),
    {
      onSuccess,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePostQuery.mutate();
    } else {
      createPostQuery.mutate();
    }
  };

  return (
    <div className=" w-full h-screen relative py-10  dark:bg-coolGray-800 dark:text-coolGray-100 overflow-x-hidden">
      <div
        onClick={() => history.goBack()}
        className="w-min z-10 backdrop-blur-lg bg-white bg-opacity-75 fixed top-10 left-8 p-1.5 border border-gray-300 rounded-full hover:border-gray-500 focus:bg-gray-500 cursor-pointer"
      >
        <MdOutlineArrowBack size={25} className="pointer-events-none" />
      </div>
      <div className="w-full min-h-full px-6 flex flex-col flex-nowrap">
        <h1 className="mt-16 text-3xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
          Post
        </h1>
        <div className="mt-6">
          <div>
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Title.. "
              maxLength="120"
              value={formDetails.title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
            />
            <div className="text-xs text-gray-500 text-right pt-1.5 px-1.5">
              {formDetails.title.length}/120
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Description<span className="text-red-500">*</span>
            </label>
            <div
            // className="w-full resize-y mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
            >
              {/* <TextEditor
                setDescription={setDescription}
                content={postData ? postData.description : ""}
              /> */}
              <ArticleEditor onChange={setDescription} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Tags<span className="text-red-500">*</span>
            </label>
            <MultiSelectTabs
              options={skillList}
              addTag={addTag}
              removeTag={removeTag}
              selected={formDetails.tags}
            />
          </div>
          {/* <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              External links
            </label>
            <MultiInput
              addItem={addLink}
              removeItem={removeLink}
              values={formDetails.links}
            />
          </div> */}
          <button
            className="block w-full px-4 py-3 mt-6 text-center font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 cursor-pointer "
            onClick={handleSubmit}
          >
            {match ? "Update" : "Create"} Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
