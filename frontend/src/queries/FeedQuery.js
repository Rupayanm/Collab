import { TOKEN } from "./../Constants";
import { createGet, createGetAuth } from "../requests.config";

const token = localStorage.getItem(TOKEN);

export const getFeed = async (page = 1, limit = 50) => {
  if (token) {
    const data = await (
      await fetch(
        `http://localhost:5000/api/feed/publicfeed?page=${page}&limit=${limit}`,
        createGet()
      )
    ).json();
    return data;
  } else {
    const data = await (
      await fetch(
        `http://localhost:5000/api/feed/publicfeed?page=${page}&limit=${limit}`,
        createGetAuth()
      )
    ).json();
    return data;
  }
};
