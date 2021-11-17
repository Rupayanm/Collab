import React, { useContext } from "react";
import parse from "html-react-parser";
import { FormContext } from "../Layout/FormContext";

const PreviewArticle = () => {
  const { formDetails } = useContext(FormContext);
  return (
    <div className="max-w-2xl p-10 space-y-12">
      <article className="space-y-6 dark:bg-coolGray-800 dark:text-coolGray-50">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl break-words">
            {formDetails.title ? formDetails.title : "This is a demo title!!!"}
          </h1>
        </div>
        <div className="dark:text-coolGray-100 break-words">
          {formDetails.description ? parse(formDetails.description) : ""}
        </div>
      </article>
      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-coolGray-400">
          {formDetails.tags.map((item, index) => (
            <p
              key={index}
              className="px-3 py-1 cursor-pointer border border-gray-300 rounded-lg hover:underline dark:bg-emerald-400 dark:text-coolGray-900"
            >
              {item}
            </p>
          ))}
        </div>
        {formDetails.links.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Related posts</h4>
            <ul className="ml-4 space-y-1 list-disc">
              {formDetails.links.map((item, index) => (
                <li key={index}>
                  <a
                    href={item}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-blue-700 hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewArticle;
