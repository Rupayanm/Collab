import React, { useRef } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { MdAdd } from "react-icons/md";

const MultiInput = ({ values, addItem, removeItem }) => {
  const inputRef = useRef(null);

  const add = () => {
    addItem(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div className="w-full pt-2 flex flex-wrap gap-x-3 gap-y-2">
      <div className="w-full flex flex-nowrap gap-x-2 ">
        <input
          type="url"
          placeholder="Link "
          ref={inputRef}
          className="w-full px-4 py-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
        />
        <div
          className="text-white p-2 bg-black rounded-lg"
          onClick={() => add()}
        >
          <MdAdd size={25} />
        </div>
      </div>
      {values.map((item, index) => (
        <div
          className="w-full flex flex-nowrap gap-x-2 items-center border-b border-gray-300"
          key={index}
        >
          <div className="w-full flex-grow-1 px-4 py-2 mt-2 overflow-x-hidden text-blue-700 hover:underline">
            <a href={item} rel="noopener noreferrer" target="_blank">
              {item}
            </a>
          </div>
          <div
            className="p-2 mt-2 text-red-400"
            onClick={() => removeItem(item)}
          >
            <TiDeleteOutline size={28} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiInput;
