import {
  createGet,
  createGetAuth,
  createPostAuth,
  //   createPost,
} from "./requests.config";

export const UPDATEPROFILE = "UPDATE_PROFILE";
export const UpdateProfile = async (values) => {
  const data = await (
    await fetch(
      "http://localhost:5000/api/profile/updateinfo",
      createPostAuth(values)
    )
  ).json();
  return data;
};

export const GETPROFILE = "GET_PROFILE";
export const GetProfile = async (id) => {
  const data = await (
    await fetch("http://localhost:5000/api/profile/" + id, createGet())
  ).json();
  return data;
};

export const GETMYPROFILE = "GETMYPROFILE";
export const GetMyProfile = async () => {
  const data = await (
    await fetch("http://localhost:5000/api/profile/me", createGetAuth())
  ).json();
  return data;
};

export const GETPROFILEFEED = "GET_PROFILE_FEED";
export const GetProfileFeed = async (id = "", page = 1, limit = 50) => {
  const data = await (
    await fetch(
      `http://localhost:5000/api/profile/profilePosts/${id}?page=${page}&limit=${limit}`,
      createGetAuth()
    )
  ).json();
  return data;
};

export const GETMYPROFILEFEED = "GETMYPROFILEFEED";
export const GetMyProfileFeed = async (page = 1, limit = 50) => {
  const data = await (
    await fetch(
      `http://localhost:5000/api/profile/profilePosts/me?page=${page}&limit=${limit}`,
      createGetAuth()
    )
  ).json();
  return data;
};
