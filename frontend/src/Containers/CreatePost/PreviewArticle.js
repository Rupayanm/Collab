import React from "react";

const PreviewArticle = ({ data }) => {
  return (
    <div className="max-w-2xl p-10 space-y-12">
      <article className="space-y-6 dark:bg-coolGray-800 dark:text-coolGray-50">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
            {data.title
              ? data.title
              : "This is a demo title and this is how it looks!!!"}
          </h1>
        </div>
        <div className="dark:text-coolGray-100">
          <p>
            {data.description ? data.description : "This is a demo description"}
          </p>
        </div>
      </article>
      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-coolGray-400">
          {data.tags.map((item, index) => (
            <p
              key={index}
              className="px-3 py-1 cursor-pointer border border-gray-300 rounded-lg hover:underline dark:bg-emerald-400 dark:text-coolGray-900"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Related posts</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {data.links.map((item, index) => (
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
      </div>
    </div>
  );
};

export default PreviewArticle;
