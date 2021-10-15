import { lazy } from "react";

const PostForm = lazy(() => import("./Containers/CreatePost/PostForm"));
const Menu = lazy(() => import("./Containers/Sidebar/Menu"));
const Article = lazy(() => import("./Containers/Article/Article"));
const Feed = lazy(() => import("./Containers/Feed/FeedList"));
const PreviewArticle = lazy(() =>
  import("./Containers/CreatePost/PreviewArticle")
);

export const sidebarRoutes = [
  {
    path: "/create",
    protect: true,
    component: () => <PostForm />,
  },
  {
    path: "/",
    component: () => <Menu />,
  },
];

export const contentRoutes = [
  {
    path: "/create",
    protect: true,
    component: () => <PreviewArticle />,
  },
  {
    path: "/home",
    component: () => <Feed />,
  },
  {
    path: "/post/:id",
    component: () => <Article />,
  },
];
