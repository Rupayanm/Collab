import React from "react";

const BlackButton = (props) => {
  const { error, children, ...rest } = props;
  return (
    <button
      {...rest}
      className="block w-full px-4 py-3 mt-6 text-center font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
    >
      {children}
    </button>
  );
};

export default BlackButton;
