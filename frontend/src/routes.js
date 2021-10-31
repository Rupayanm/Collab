import { lazy } from "react";
import {
  HOME,
  CREATE,
  ARTICLE,
  EXPLORE,
  // NOTIFICATION,
  PROFILE,
} from "./routes.contants";

const PostForm = lazy(() => import("./Containers/CreatePost/PostForm"));
const Menu = lazy(() => import("./Containers/Sidebar/Menu"));
const Article = lazy(() => import("./Containers/Article/Article"));
const Feed = lazy(() => import("./Containers/Feed/FeedList"));
const NotificationBar = lazy(() =>
  import("./Containers/RightBar/Notification/NotificationBar")
);
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
    RightBar: () => null,
  },
  {
    path: HOME,
    Sidebar: () => <Menu />,
    Content: () => <Feed />,
    RightBar: () => <NotificationBar />,
  },
  {
    path: ARTICLE,
    Sidebar: () => <Menu />,
    Content: () => <Article />,
    RightBar: () => null,
  },
  {
    path: EXPLORE,
    Sidebar: () => <Menu />,
    Content: () => null,
    RightBar: () => <NotificationBar />,
  },
  // {
  //   path: NOTIFICATION,
  //   Sidebar: () => <Menu />,
  //   Content: () => null,
  // },
  {
    path: PROFILE,
    Sidebar: () => <Menu />,
    Content: () => null,
    RightBar: () => <NotificationBar />,
  },
];
