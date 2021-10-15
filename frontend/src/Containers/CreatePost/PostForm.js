import React, { useContext } from "react";
import { useHistory } from "react-router";
import { MdOutlineArrowBack } from "react-icons/md";
import MultiInput from "../../Components/MultiInput.js";
import MultiSelectTabs from "../../Components/MultiSelectTabs";
import { skillList } from "../../Constants";
import { FormContext } from "../Layout/FormContext.js";
import TextEditor from "../../Components/TextEditor/TextEditor.js";

const PostForm = () => {
  const history = useHistory();
  const { formDetails, setFormDetails } = useContext(FormContext);

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
        <form className="mt-6" action="#" method="POST">
          <div>
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Title.. "
              value={formDetails.title}
              onChange={(e) =>
                setFormDetails({ ...formDetails, title: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Description
            </label>
            <div className="w-full resize-y mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ">
              <TextEditor setDescription={setDescription} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">
              Tags
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
          <div className="block w-full px-4 py-3 mt-6 text-center font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">
            Create Post
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
