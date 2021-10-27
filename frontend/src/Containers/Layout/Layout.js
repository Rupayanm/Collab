import React from "react";
import Nav from "../Navbar/Nav";

const Layout = ({ Sidebar, Content }) => {
  return (
    <>
      <div className=" flex flex-nowrap w-screen h-screen ">
        <div className="hidden w-1/3 h-full border-r border-gray-300 bg-menu-pattern backdrop-contrast-150 md:block lg:w-1/4">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col md:w-2/3 lg:w-3/4">
          <div className="w-full h-auto">
            <Nav />
          </div>
          <div className="w-full h-full flex-grow-1 overflow-y-scroll">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
