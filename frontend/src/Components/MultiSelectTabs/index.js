import React from "react";

const MultiSelectTabs = (props) => {
  const {
    options,
    selected,
    formik,
    name,
    addTag,
    removeTag,
    error,
    tabClass,
    containerClass,
  } = props;

  const addItem = (value) => {
    if (!formik) {
      return;
    }
    let skills = formik.values[name];
    skills.push(value);
    formik.setFieldValue(name, skills);
  };

  const removeItem = (value) => {
    if (!formik) {
      return;
    }
    let skills = formik.values[name].filter((item) => item !== value);
    formik.setFieldValue(name, skills);
  };

  return (
    <>
      <div
        className={`w-full pt-2 flex flex-wrap gap-x-3 gap-y-2 ${containerClass}`}
      >
        {options.map((item, index) =>
          selected.includes(item.value) ? (
            <div
              key={index}
              onClick={() =>
                removeTag ? removeTag(item.value) : removeItem(item.value)
              }
              className={`font-medium text-sm w-min py-2 px-4 border border-black rounded-lg text-white cursor-pointer transition duration-500 ease-in-out transform bg-black hover:bg-blueGray-800 ${tabClass}`}
            >
              {item.label}
            </div>
          ) : (
            <div
              key={index}
              className={`font-medium text-sm w-min py-2 px-4 border rounded-lg text-gray-500 cursor-pointer transition duration-500 ease-in-out transform ${tabClass}`}
              onClick={() =>
                addTag ? addTag(item.value) : addItem(item.value)
              }
            >
              {item.label}
            </div>
          )
        )}
      </div>
      {error && (
        <div className="text-sm font-semibold italic text-red-600 text-right px-6">
          Required
        </div>
      )}
    </>
  );
};

export default MultiSelectTabs;
