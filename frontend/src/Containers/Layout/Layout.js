import React, { useState } from "react";
import { useLocation } from "react-router";
import Article from "../Article/Article";
import PreviewArticle from "../CreatePost/PreviewArticle";
import Nav from "../Navbar/Nav";
import Menu from "../Sidebar/Menu";
import PostForm from "../CreatePost/PostForm";

const Layout = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    title: "",
    description: "",
    tags: [],
    links: [],
  });
  const location = useLocation();

  return (
    <>
      <div className=" flex flex-nowrap w-screen h-screen ">
        <div className="hidden w-1/3 h-full border-r border-gray-300 bg-menu-pattern backdrop-contrast-150 md:block lg:w-1/4">
          {/* <Menu /> */}
          <PostForm formDetails={formDetails} setFormDetails={setFormDetails} />
        </div>
        <div className="w-full flex flex-col md:w-2/3 lg:w-3/4">
          <div className="w-full h-auto">
            <Nav />
          </div>
          <div className="w-full flex-grow-1 overflow-y-scroll">
            <PreviewArticle data={formDetails} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
