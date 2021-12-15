import {
  //   createGet,
  createGetAuth,
  createPostAuth,
  createPutAuth,
  //   createPost,
} from "../requests.config";

export const NewPost = async (values) => {
  const data = await (
    await fetch(
      "http://localhost:5000/api/posts/createPost",
      createPostAuth(values)
    )
  ).json();
  return data;
};

export const GetPost = async (id) => {
  const data = await (
    await fetch("http://localhost:5000/api/posts/" + id, createGetAuth())
  ).json();
  return data;
};

export const UpdatePost = async (id, value) => {
  const data = await (
    await fetch("http://localhost:5000/api/posts/update/" + id, createPutAuth())
  ).json();
  return data;
};

export const LikePost = async (id) => {
  const data = await (
    await fetch("http://localhost:5000/api/posts/like/" + id, createPutAuth())
  ).json();
  return data;
};

export const DislikePost = async (id) => {
  const data = await (
    await fetch("http://localhost:5000/api/posts/unlike/" + id, createPutAuth())
  ).json();
  return data;
};

export const AddComment = async (id) => {
  const data = await (
    await fetch("http://localhost:5000/api/posts/" + id, createGetAuth())
  ).json();
  return data;
};

export const DeleteComment = async (id) => {
  const data = await (
    await fetch("http://localhost:5000/api/posts/" + id, createGetAuth())
  ).json();
  return data;
};
