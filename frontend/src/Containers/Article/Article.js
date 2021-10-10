import React from "react";

const Article = ({ data }) => {
  return (
    <div className="max-w-2xl h-full pl-20 pr-10 py-16 space-y-12">
      <article className="space-y-6 dark:bg-coolGray-800 dark:text-coolGray-50">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
            Suspendisse ut magna et ipsum sodales accumsan.
          </h1>
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-coolGray-400">
            <div className="flex items-center md:space-x-2">
              <img
                src="https://source.unsplash.com/75x75/?portrait"
                alt=""
                className="w-4 h-4 border rounded-full dark:bg-coolGray-500 dark:border-coolGray-700"
              />
              <p className="text-sm">Leroy Jenkins • July 19th, 2021</p>
            </div>
            <p className="flex-shrink-0 mt-3 text-sm md:mt-0">1,570 views</p>
          </div>
        </div>
        <div className="dark:text-coolGray-100">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </article>
      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-coolGray-400">
          <p
            href="#"
            className="px-3 py-1 cursor-pointer bg-red-500 text-white border border-gray-300 rounded-lg hover:underline dark:bg-emerald-400 dark:text-coolGray-900"
          >
            #MambaUI
          </p>
          <p
            href="#"
            className="px-3 py-1 cursor-pointer bg-blue-500 text-white border border-gray-300 rounded-lg hover:underline dark:bg-emerald-400 dark:text-coolGray-900"
          >
            #TailwindCSS
          </p>
          <p
            href="#"
            className="px-3 py-1 cursor-pointer border border-gray-300 rounded-lg hover:underline dark:bg-emerald-400 dark:text-coolGray-900"
          >
            #Angular
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Related posts</h4>
          <ul className="ml-4 space-y-1 list-disc">
            <li>
              <p href="#" className="hover:underline">
                Nunc id magna mollis
              </p>
            </li>
            <li>
              <p href="#" className="hover:underline">
                Duis molestie, neque eget pretium lobortis
              </p>
            </li>
            <li>
              <p href="#" className="hover:underline">
                Mauris nec urna volutpat, aliquam lectus sit amet
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Article;
