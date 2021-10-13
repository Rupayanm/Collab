import React from "react";

const MultiSelect = ({ options, selected, addItem, removeItem }) => {
  return (
    <div className="w-full pt-2 flex flex-wrap gap-x-3 gap-y-2">
      {options.map((item, index) =>
        selected.includes(item.value) ? (
          <div
            key={index}
            onClick={() => removeItem(item.value)}
            className="font-medium text-sm w-min py-2 px-4 border border-black rounded-lg text-white cursor-pointer transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800"
          >
            {item.label}
          </div>
        ) : (
          <div
            key={index}
            className="font-medium text-sm w-min py-2 px-4 border rounded-lg text-gray-500 cursor-pointer transition duration-500 ease-in-out transform"
            onClick={() => addItem(item.value)}
          >
            {item.label}
          </div>
        )
      )}
    </div>
  );
};

export default MultiSelect;
