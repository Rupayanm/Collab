import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menuitems } from "./MenuItems";
import { CREATE, HOME } from "./../../routes.contants";

const Menu = () => {
  const location = useLocation();

  return (
    <div className=" w-full h-screen px-6 pt-6 dark:bg-coolGray-800 dark:text-coolGray-100 overflow-x-hidden">
      <div className="w-full h-full relative flex flex-col flex-nowrap ">
        <Link to={HOME}>
          <h1 className="text-4xl py-4 px-6 font-logo2 font-medium">
            Collab.<span className="font-logoend text-gray-900">io</span>
          </h1>
        </Link>
        {Menuitems.map((item, index) => (
          <Link to={item.link} key={index}>
            {item.link === location.pathname ? (
              <div className="w-full flex flex-nowrap gap-x-4 items-center py-4 px-6 mt-3 bg-gray-400 bg-opacity-10 ring-4 ring-gray-400 ring-opacity-10 transition-all duration-500 ease-in-out transform font-semibold rounded-full text-xl cursor-pointer">
                {item.logo}
                {item.name}
              </div>
            ) : (
              <div className="w-full flex flex-nowrap gap-x-4 items-center py-4 px-6 mt-3 transition-all duration-500 ease-in-out transform rounded-full font-semibold text-xl cursor-pointer hover:ring-2 hover:ring-gray-400 hover:ring-opacity-30">
                {item.logo}
                {item.name}
              </div>
            )}
          </Link>
        ))}
        <Link to={CREATE}>
          <div className="hidden w-full bg-black font-semibold text-xl text-white text-center absolute bottom-6 py-4 px-6 rounded-full cursor-pointer transition duration-500 shadow-xl ease-in-out transform hover:bg-ring-4 md:block">
            Create Post
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
