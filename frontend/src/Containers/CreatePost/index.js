import React, { useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import MultiInput from "../../Components/MultiInput.js";
import MultiSelectTabs from "../../Components/MultiSelectTabs";
import { skillList } from "../../Constants";
import PostForm from "./PostForm.js";

const CreatePost = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    title: "",
    description: "",
    tags: [],
    links: [],
  });

  return <PostForm formDetails={formDetails} setFormDetails={setFormDetails} />;
};

export default CreatePost;
