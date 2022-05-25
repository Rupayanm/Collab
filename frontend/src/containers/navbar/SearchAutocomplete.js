import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {
  searchPostByTitle,
  SEARCHPOSTBYTITLE,
} from "../../queries/SearchQuery";
import useDropdown from "../../hooks/useDropdown";
import useDebounce from "../../hooks/useDebounce";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

const getTime = (time) => {
  if (dayjs().isSame(time, "month")) {
    return dayjs(time).fromNow();
  } else if (dayjs().isSame(time, "month")) {
    return dayjs(time).format("MMM DD");
  }
  return dayjs(time).format("MMM DD, YY");
};

function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query, 400);
  const [containerRef, isOpen, open, close] = useDropdown();

  const clearSearch = () => setQuery("");

  const { data: postList, refetch } = useQuery(
    [SEARCHPOSTBYTITLE, debouncedValue],
    () => searchPostByTitle({ query: debouncedValue }),
    {
      enabled: Boolean(debouncedValue.length > 0),
      initialData: [],
    }
  );

  useEffect(() => {
    refetch();
  }, [debouncedValue, refetch]);

  return (
    <div className="w-full relative" ref={containerRef}>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={open}
      />
      <div
        className={`absolute z-50 left-0 w-full divide-y grid top-full mt-1 shadow border rounded-lg bg-white ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => {
          close();
          clearSearch();
        }}
      >
        {postList?.length ? (
          <>
            {postList?.map((item) => (
              <DropdownItem
                link={"/post/" + item?._id}
                item={item}
                key={item?._id}
              />
            ))}
          </>
        ) : (
          <>
            {debouncedValue?.length < 4 ? (
              <div className="px-3 py-2.5 transition duration-300 text-gray-600">
                Minimum 4 characters Required
              </div>
            ) : (
              <div className="px-3 py-2.5 transition duration-300 text-gray-600">
                Oops! No post found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const DropdownItem = ({ link, item }) => {
  return (
    <Link to={link}>
      <div className="px-3 py-2.5 transition duration-300 hover:bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="font-semibold line-clamp-1">{item.title}</div>
          <div className="text-xs text-gray-500 shrink-0">
            {getTime(dayjs(item.date))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchAutocomplete;
