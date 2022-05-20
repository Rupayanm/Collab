import React from "react";
import Nav from "../../containers/navbar/Nav";
import { FormProvider } from "../../context/FormContext";
import Content from "../../containers/content";
import Sidebar from "../../containers/sidebar";
import RightBar from "../../containers/rightbar";

const Layout = () => {
  return (
    <>
      <FormProvider>
        <div className=" flex flex-nowrap w-screen h-screen ">
          <div className="hidden w-1/3 h-full border-r border-gray-300 bg-menu-pattern backdrop-contrast-150 md:block lg:w-1/4">
            <Sidebar />
          </div>
          <div className="w-full flex flex-col md:w-2/3 lg:w-3/4">
            <div className="w-full h-auto">
              <Nav />
            </div>
            <div className="w-full h-full flex-grow-1 flex flex-row relative overflow-y-scroll">
              <div className="w-full lg:w-4/6 ">
                <Content />
              </div>
              <div className="hidden w-2/6 sticky top-0 lg:block overflow-y-scroll scrollbar-hide">
                <RightBar />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default Layout;
