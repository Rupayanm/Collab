import React from "react";

const Nav = () => {
  return (
    <>
      <div className=" border-b border-gray-300">
        <div className="w-full lg:w-4/6 flex flex-nowrap py-5 px-10 dark:bg-coolGray-800 dark:text-coolGray-100">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
