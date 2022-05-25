import { createPost } from "./requests.config";

export const SEARCHPOSTBYTITLE = "SEARCH_POST_BY_TITLE";
export const searchPostByTitle = async (values) => {
  const data = await (
    await fetch(`http://localhost:5000/api/search/posts`, createPost(values))
  ).json();
  return data;
};
