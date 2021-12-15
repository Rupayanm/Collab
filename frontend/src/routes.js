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

const PostForm = lazy(() => import("./Containers/CreatePost/PostForm"));
const Menu = lazy(() => import("./Containers/Sidebar/Menu/Menu"));
const Article = lazy(() => import("./Containers/Article/Article"));
const Feed = lazy(() => import("./Containers/Feed/FeedList"));
const Profile = lazy(() => import("./Containers/Profile/Profile"));
const NotificationBar = lazy(() =>
  import("./Containers/RightBar/Notification/NotificationBar")
);
const ProfileCard = lazy(() =>
  import("./Containers/RightBar/ProfileCard/ProfileCard")
);
const ProfileEditCard = lazy(() =>
  import("./Containers/RightBar/ProfileCard/ProfileEditCard")
);
const PreviewArticle = lazy(() =>
  import("./Containers/CreatePost/PreviewArticle")
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
    path: EDIT,
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
    restricted: true,
    Sidebar: () => <Menu />,
    Content: () => <Profile />,
    RightBar: () => <ProfileCard />,
  },
];
