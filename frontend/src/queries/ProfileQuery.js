import {
  createGet,
  //   createGetAuth,
  createPostAuth,
  //   createPost,
} from "../requests.config";

export const UpdateProfile = async (values) => {
  const data = await (
    await fetch(
      "http://localhost:5000/api/profile/updateinfo",
      createPostAuth(values)
    )
  ).json();
  return data;
};

export const GetProfile = async () => {
  const data = await (
    await fetch("http://localhost:5000/api/profile", createGet())
  ).json();
  return data;
};

export const GetMyProfile = async () => {
  const data = await (
    await fetch("http://localhost:5000/api/profile/me", createGet())
  ).json();
  return data;
};
