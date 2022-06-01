import {
  createGet,
  createGetAuth,
  createPostAuth,
  createPutAuth,
  //   createPost,
  apiURL,
} from "./requests.config";

export const UPDATEPROFILE = "UPDATE_PROFILE";
export const UpdateProfile = async (values) => {
  const data = await (
    await fetch(`${apiURL}profile/updateinfo`, createPostAuth(values))
  ).json();
  return data;
};

export const GETPROFILE = "GET_PROFILE";
export const GetProfile = async (id) => {
  const data = await (
    await fetch(`${apiURL}profile/` + id, createGet())
  ).json();
  return data;
};

export const GETMYPROFILE = "GETMYPROFILE";
export const GetMyProfile = async () => {
  const data = await (
    await fetch(`${apiURL}profile/me`, createGetAuth())
  ).json();
  return data;
};

export const GETPROFILEFEED = "GET_PROFILE_FEED";
export const GetProfileFeed = async (id = "", page = 1, limit = 50) => {
  const data = await (
    await fetch(
      `${apiURL}profile/profilePosts/${id}?page=${page}&limit=${limit}`,
      createGetAuth()
    )
  ).json();
  return data;
};

export const GETMYPROFILEFEED = "GETMYPROFILEFEED";
export const GetMyProfileFeed = async (page = 1, limit = 50) => {
  const data = await (
    await fetch(
      `${apiURL}profile/profilePosts/me?page=${page}&limit=${limit}`,
      createGetAuth()
    )
  ).json();
  return data;
};

export const GETNOTIFICATIONS = "GETNOTIFICATIONS";
export const GetNotifications = async () => {
  const data = await (
    await fetch(`${apiURL}users/notifications`, createGetAuth())
  ).json();
  return data;
};

export const READNOTIFICATION = "READNOTIFICATION";
export const ReadNotification = async (id) => {
  const data = await (
    await fetch(`${apiURL}users/notifications/read/` + id, createPutAuth())
  ).json();
  return data;
};
