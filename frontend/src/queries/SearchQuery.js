import { createPost ,apiURL } from "./requests.config";

export const SEARCHPOSTBYTITLE = "SEARCH_POST_BY_TITLE";
export const searchPostByTitle = async (values) => {
  const data = await (
    await fetch(`${apiURL}search/posts`, createPost(values))
  ).json();
  return data;
};
