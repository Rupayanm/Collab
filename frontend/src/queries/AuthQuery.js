import { createPost, apiURL } from "./requests.config";

export const login = async (formDetails) => {
  const data = await (
    await fetch(`${apiURL}auth/`, createPost(formDetails))
  ).json();
  return data;
};

export const googlelogin = async (formDetails) => {
  const data = await (
    await fetch(`${apiURL}auth/google`, createPost(formDetails))
  ).json();
  return data;
};

export const signup = async (formDetails) => {
  const data = await (
    await fetch(`${apiURL}users/`, createPost(formDetails))
  ).json();
  return data;
};
