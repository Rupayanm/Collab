import React from "react";

const Input = (props) => {
  const { error, ...rest } = props;
  return (
    <>
      <input
        {...rest}
        className={` w-full px-3 py-2 mb-1  text-base border border-gray-300 text-black transition duration-500 ease-in-out  transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ${
          error && "ring-2 ring-red-300"
        }`}
      />
      {error && (
        <div className="text-red-400 text-xs font-medium text-right">
          {error}
        </div>
      )}
    </>
  );
};

export default Input;
