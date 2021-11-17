import { RiHomeLine } from "react-icons/ri";
import { GiCubeforce } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
// import { IoMdNotificationsOutline } from "react-icons/io";
import { HOME, EXPLORE } from "./../../routes.contants";

export const Menuitems = [
  { name: "Home", link: HOME, logo: <RiHomeLine size={24} /> },
  { name: "Explore", link: EXPLORE, logo: <GiCubeforce size={24} /> },
  { name: "Profile", link: "/profile", logo: <AiOutlineUser size={24} /> },
  // {
  //   name: "Notifications",
  //   link: NOTIFICATION,
  //   logo: <IoMdNotificationsOutline size={24} />,
  // },
];
