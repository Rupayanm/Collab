import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Accordian = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (data.active) {
      //   refetch()
    }
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col mx-3 px-1 py-3">
        <div className="w-full mx-1 flex flex-row justify-between items-center">
          <div className="flex-grow">
            <div className="font-medium">{data.title}</div>
            <div className="text-xs mt-0.5 text-gray-500">{data.time}</div>
          </div>
          {open ? (
            <div
              className="mx-1 p-1 transition-colors duration-150 rounded-full hover:bg-gray-100 focus:bg-black focus:text-white"
              onClick={() => setOpen(false)}
            >
              <FiChevronUp size={25} />
            </div>
          ) : (
            <div
              className={
                "mx-1 p-1 transition-colors duration-150 rounded-full hover:bg-gray-100 focus:bg-black focus:text-white "
              }
              onClick={handleOpen}
            >
              <FiChevronDown
                size={25}
                className={data.active ? "text-green-500" : "text-black"}
              />
            </div>
          )}
        </div>
        {open ? (
          <div className="word-break text-sm mt-2">{data.description}</div>
        ) : null}
      </div>
    </>
  );
};

export default Accordian;
