import React from "react";
import Article from "../Article/Article";
import Nav from "../Navbar/Nav";
import ListItem from "../Feed/ListItem";
import FeedList from "../Feed/FeedList";

const Layout = () => {
  return (
    <>
      <div className=" flex flex-nowrap w-screen h-screen overflow-hidden">
        <div className="w-1/4 h-full border-r border-gray-300"></div>
        <div className="w-3/4 flex flex-col">
          <div className="w-full h-1/12">
            <Nav />
          </div>
          <div className="w-full flex-grow-1 overflow-y-scroll">
            <Article />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
