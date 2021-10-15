import { TOKEN } from "./Constants";

const token = localStorage.getItem(TOKEN);

export const createGet = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const createGetAuth = () => {
  return {
    method: "GET",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
};

export const createPost = (value) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
};

export const createPostAuth = (value) => {
  return {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
};
