import { createPost } from "../requests.config";

export const login = async (formDetails) => {
  const data = await (
    await fetch("http://localhost:5000/api/auth/", createPost(formDetails))
  ).json();
  return data;
};

export const signup = async (formDetails) => {
  const data = await (
    await fetch("http://localhost:5000/api/users/", createPost(formDetails))
  ).json();
  return data;
};
