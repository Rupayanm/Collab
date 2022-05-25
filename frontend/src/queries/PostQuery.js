import {
  //   createGet,
  createGetAuth,
  createPostAuth,
  createPut,
  createPutAuth,
  createDeleteAuth,
  apiURL
  //   createPost,
} from "./requests.config";

export const NEWPOST = "NEW_POST";
export const NewPost = async (values) => {
  const data = await (
    await fetch(
      `${apiURL}posts/createPost`,
      createPostAuth(values)
    )
  ).json();
  return data;
};

export const GETPOST = "GET_POST";
export const GetPost = async (id) => {
  const data = await (
    await fetch(`${apiURL}posts/` + id, createGetAuth())
  ).json();
  return data;
};

export const UPDATEPOST = "UPDATE_POST";
export const UpdatePost = async (id, value) => {
  const data = await (
    await fetch(
      `${apiURL}posts/editPost/` + id,
      createPostAuth(value)
    )
  ).json();
  return data;
};

export const DELETEPOST = "DELETE_POST";
export const DeletePost = async (id) => {
  const data = await (
    await fetch(`${apiURL}posts/` + id, createDeleteAuth())
  ).json();
  return data;
};

export const VIEWPOST = "VIEW_POST";
export const ViewPost = async (id) => {
  const data = await (
    await fetch(`${apiURL}posts/view/` + id, createPut())
  ).json();
  return data;
};

export const LIKEPOST = "LIKE_POST";
export const LikePost = async (id) => {
  const data = await (
    await fetch(`${apiURL}posts/like/` + id, createPutAuth())
  ).json();
  return data;
};

export const DISLIKEPOST = "DISLIKE_POST";
export const DislikePost = async (id) => {
  const data = await (
    await fetch(`${apiURL}posts/unlike/` + id, createPutAuth())
  ).json();
  return data;
};

export const ADDCOMMENT = "ADD_COMMENT";
export const AddComment = async (id, values) => {
  const data = await (
    await fetch(
      `${apiURL}posts/comment/` + id,
      createPostAuth(values)
    )
  ).json();
  return data;
};

export const DELETECOMMENT = "DELETE_COMMENT";
export const DeleteComment = async (id, commentId) => {
  const data = await (
    await fetch(
      `${apiURL}posts/comment/` + id + "/" + commentId,
      createDeleteAuth()
    )
  ).json();
  return data;
};
