import { TOKEN } from "./../Constants";
import { createGet, createGetAuth } from "../requests.config";

const token = localStorage.getItem(TOKEN);

export const getFeed = async () => {
  if (token) {
    const data = await (
      await fetch("http://localhost:5000/api/feed/publicfeed", createGet())
    ).json();
    return data;
  } else {
    const data = await (
      await fetch("http://localhost:5000/api/feed/publicfeed", createGetAuth())
    ).json();
    return data;
  }
};
