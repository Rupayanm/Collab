import { TOKEN } from "./../Constants";
import { createGet, createGetAuth } from "./requests.config";

export const GETFEED = "GET_FEED";
export const getFeed = async (page = 1, limit = 50) => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    const data = await (
      await fetch(
        `http://localhost:5000/api/feed/privatefeed?page=${page}&limit=${limit}`,
        createGetAuth()
      )
    ).json();
    return data;
  } else {
    const data = await (
      await fetch(
        `http://localhost:5000/api/feed/publicfeed?page=${page}&limit=${limit}`,
        createGet()
      )
    ).json();
    return data;
  }
};

export const GETPRIVATEFEED = "GET_PRIVATE_FEED";
export const getPrivateFeed = async (page = 1, limit = 50) => {
  const data = await (
    await fetch(
      `http://localhost:5000/api/feed/privatefeed?page=${page}&limit=${limit}`,
      createGetAuth()
    )
  ).json();
  return data;
};

export const GETPUBLICFEED = "GET_PUBLIC_FEED";
export const getPublicFeed = async (page = 1, limit = 50) => {
  const data = await (
    await fetch(
      `http://localhost:5000/api/feed/publicfeed?page=${page}&limit=${limit}`,
      createGet()
    )
  ).json();
  return data;
};
