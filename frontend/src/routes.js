import { lazy } from "react";
import {
  HOME,
  CREATE,
  ARTICLE,
  EXPLORE,
  NOTIFICATION,
  PROFILE,
} from "./routes.contants";

const PostForm = lazy(() => import("./Containers/CreatePost/PostForm"));
const Menu = lazy(() => import("./Containers/Sidebar/Menu"));
const Article = lazy(() => import("./Containers/Article/Article"));
const Feed = lazy(() => import("./Containers/Feed/FeedList"));
const PreviewArticle = lazy(() =>
  import("./Containers/CreatePost/PreviewArticle")
);

export const routes = [
  {
    path: CREATE,
    restricted: true,
    exact: true,
    Sidebar: () => <PostForm />,
    Content: () => <PreviewArticle />,
  },
  {
    path: HOME,
    Sidebar: () => <Menu />,
    Content: () => <Feed />,
  },
  {
    path: ARTICLE,
    Sidebar: () => <Menu />,
    Content: () => <Article />,
  },
  {
    path: EXPLORE,
    Sidebar: () => <Menu />,
    Content: () => null,
  },
  {
    path: NOTIFICATION,
    Sidebar: () => <Menu />,
    Content: () => null,
  },
  {
    path: PROFILE,
    Sidebar: () => <Menu />,
    Content: () => null,
  },
];
