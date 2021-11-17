import React, { useContext, useEffect } from "react";
import { useHistory, Redirect, useParams } from "react-router";
import toast from "react-hot-toast";
import { MdOutlineArrowBack } from "react-icons/md";
import MultiInput from "../../Components/MultiInput/index.js";
import MultiSelectTabs from "../../Components/MultiSelectTabs";
import { skillList } from "../../Constants";
import { FormContext, initialValues } from "../Layout/FormContext.js";
import TextEditor from "../../Components/TextEditor/TextEditor.js";
import { useQuery } from "react-query";
import Alert from "../../Components/Alert/index.js";
import { NewPost, GetPost, UpdatePost } from "./../../queries/PostQuery";
import { HOME } from "../../routes.contants";

// const validate = () => {};

const PostForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { formDetails, setFormDetails } = useContext(FormContext);

  const { data: postData } = useQuery("get-post", () => GetPost(id), {
    enabled: id !== undefined,
  });

  const { refetch: updateData } = useQuery(
    "update-post",
    () => UpdatePost(id, formDetails),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (id && postData) {
      const { title, description, tags } = postData;
      setFormDetails({ ...formDetails, title, description, tags });
    }
    return () => {
      setFormDetails(initialValues);
    };
  }, [postData, id, setFormDetails]);

  const onSuccess = (data) => {
    if (data.error) {
      console.log(error);
    } else {
      toast.custom((t) => (
        <Alert t={t} message="Post created" type="success" />
      ));
      <Redirect to={HOME} />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (id) {
      updateData();
    } else {
      refetch();
    }
  };

  const { isLoading, error, refetch } = useQuery(
    "create-post",
    () => NewPost(formDetails),
    {
      enabled: false,
      cacheTime: 0,
      onSuccess,
    }
  );

  const setDescription = (description) => {
    setFormDetails({ ...formDetails, description });
  };

  const removeLink = (index) => {
    let links = formDetails.links;
    links.splice(index, 1);
    setFormDetails({ ...formDetails, links });
  };

  const addLink = (value) => {
    if (value === "") {
      return;
    }
    let links = formDetails.links;
    links.push(value);
    setFormDetails({ ...formDetails, links });
  };

  const removeTag = (value) => {
    let tags = formDetails.tags.filter((item) => item !== value);
    setFormDetails({ ...formDetails, tags });
  };

  const addTag = (value) => {
    let tags = formDetails.tags;
    tags.push(value);
    setFormDetails({ ...formDetails, tags });
  };

  return (
    <div className=" w-full h-screen relative py-10  dark:bg-coolGray-800 dark:text-coolGray-100 overflow-x-hidden">
      <div
        onClick={() => history.goBack()}
        className="w-min z-10 backdrop-filter backdrop-blur-sm fixed top-10 left-8 p-1.5 border border-gray-300 rounded-full hover:border-gray-500 focus:bg-gray-500 "
      >
        <MdOutlineArrowBack size={25} className="pointer-events-none" />
      </div>
      <div className="w-full min-h-full px-6 flex flex-col flex-nowrap">
        <h1 className="mt-16 text-3xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
          Post
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Title.. "
              maxLength="120"
              value={formDetails.title}
              onChange={(e) =>
                setFormDetails({ ...formDetails, title: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
            />
            <div className="text-xs text-gray-500 text-right pt-1.5 px-1.5">
              {formDetails.title.length}/120
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Description<span className="text-red-500">*</span>
            </label>
            <div className="w-full resize-y mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ">
              <TextEditor
                setDescription={setDescription}
                content={postData ? postData.description : ""}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Tags<span className="text-red-500">*</span>
            </label>
            <MultiSelectTabs
              options={skillList}
              addItem={addTag}
              removeItem={removeTag}
              selected={formDetails.tags}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              External links
            </label>
            <MultiInput
              addItem={addLink}
              removeItem={removeLink}
              values={formDetails.links}
            />
          </div>
          <button className="block w-full px-4 py-3 mt-6 text-center font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 cursor-pointer ">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
