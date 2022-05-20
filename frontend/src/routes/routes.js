import { lazy } from "react";
import {
  HOME,
  CREATE,
  ARTICLE,
  EXPLORE,
  EDIT,
  // NOTIFICATION,
  PROFILE,
  PROFILEEDIT,
} from "./routes.contants";

const PostForm = lazy(() =>
  import("../containers/content/CreatePost/PostForm")
);
const Menu = lazy(() => import("../containers/sidebar/Menu/Menu"));
const Article = lazy(() => import("../containers/content/Article/Article"));
const Feed = lazy(() => import("../containers/content/Feed/FeedList"));
const Profile = lazy(() => import("../containers/content/Profile/Profile"));
const NotificationBar = lazy(() =>
  import("../containers/rightbar/Notification/NotificationBar")
);
const ProfileCard = lazy(() =>
  import("../containers/rightbar/ProfileCard/ProfileCard")
);
const ProfileEditCard = lazy(() =>
  import("../containers/rightbar/ProfileCard/ProfileEditCard")
);
const PreviewArticle = lazy(() =>
  import("../containers/content/CreatePost/PreviewArticle")
);

export const sidebarRoutes = [
  {
    path: CREATE,
    restricted: true,
    exact: true,
    Sidebar: PostForm,
  },
  {
    path: EDIT,
    restricted: true,
    exact: true,
    Sidebar: PostForm,
  },
  {
    path: HOME,
    Sidebar: Menu,
  },
  {
    path: ARTICLE,
    Sidebar: Menu,
  },
  {
    path: EXPLORE,
    Sidebar: Menu,
  },
  // {
  //   path: NOTIFICATION,
  //   Sidebar: () => <Menu />,
  //   Content: () => null,
  // },
  {
    path: PROFILE,
    restricted: true,
    Sidebar: Menu,
  },
];

export const contentRoutes = [
  {
    path: CREATE,
    restricted: true,
    exact: true,
    Content: PreviewArticle,
  },
  {
    path: EDIT,
    restricted: true,
    exact: true,
    Content: PreviewArticle,
  },
  {
    path: HOME,
    Content: Feed,
  },
  {
    path: ARTICLE,
    Content: Article,
  },
  {
    path: EXPLORE,
    Content: () => null,
  },
  // {
  //   path: NOTIFICATION,
  //   Sidebar: () => <Menu />,
  //   Content: () => null,
  // },
  {
    path: PROFILE,
    restricted: true,
    Content: Profile,
  },
];

export const rightbarRoutes = [
  {
    path: CREATE,
    restricted: true,
    exact: true,
    RightBar: () => null,
  },
  {
    path: EDIT,
    restricted: true,
    exact: true,
    RightBar: () => null,
  },
  {
    path: HOME,
    RightBar: NotificationBar,
  },
  {
    path: ARTICLE,
    RightBar: () => null,
  },
  {
    path: EXPLORE,
    RightBar: NotificationBar,
  },
  // {
  //   path: NOTIFICATION,
  //   Sidebar: () => <Menu />,
  //   Content: () => null,
  // },
  {
    path: PROFILEEDIT,
    restricted: true,
    RightBar: ProfileEditCard,
  },
  {
    path: PROFILE,
    exact: true,
    restricted: true,
    RightBar: ProfileCard,
  },
  {
    path: "/",
    RightBar: NotificationBar,
  },
];
