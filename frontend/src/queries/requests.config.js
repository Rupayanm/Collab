import { TOKEN } from "../Constants";

export const createGet = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const createGetAuth = () => {
  const token = localStorage.getItem(TOKEN);
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
  const token = localStorage.getItem(TOKEN);
  return {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
};

export const createPut = (value) => {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
};

export const createPutAuth = (value) => {
  const token = localStorage.getItem(TOKEN);
  return {
    method: "PUT",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
};

export const createDeleteAuth = (value) => {
  const token = localStorage.getItem(TOKEN);
  return {
    method: "DELETE",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
};
