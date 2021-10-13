import React from "react";
import { FiArrowRight } from "react-icons/fi";

const ListItem = () => {
  return (
    <div className="w-full dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="container max-w-4xl px-6 py-6 mx-auto dark:bg-coolGray-900">
        <div className="flex items-center justify-between">
          <span className="text-sm dark:text-coolGray-400">Jun 1, 2020</span>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold hover:underline">
            Nos creasse pendere crescit angelos etc
          </p>
          <p className="mt-2">
            Tamquam ita veritas res equidem. Ea in ad expertus paulatim
            poterunt. Imo volo aspi novi tur. Ferre hic neque vulgo hae athei
            spero. Tantumdem naturales excaecant notaverim etc cau perfacile
            occurrere. Loco visa to du huic at in dixi aër.
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="flex flex-nowrap gap-2 font-semibold items-center text-purple-700 hover:underline dark:text-emerald-400">
            Read more
            <FiArrowRight />
          </p>
          <div>
            <p className="flex items-center">
              <img
                src="https://source.unsplash.com/50x50/?portrait"
                alt="avatar"
                className="object-cover w-6 h-6 mx-4 rounded-full dark:bg-coolGray-500"
              />
              <span className="hover:underline dark:text-coolGray-400">
                Leroy Jenkins
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
