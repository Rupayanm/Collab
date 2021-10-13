import { RiHomeLine } from "react-icons/ri";
import { GiCubeforce } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";

export const Menuitems = [
  { name: "Home", link: "/home", logo: <RiHomeLine size={24} /> },
  { name: "Explore", link: "/explore", logo: <GiCubeforce size={24} /> },
  { name: "Profile", link: "/profile", logo: <AiOutlineUser size={24} /> },
  {
    name: "Notifications",
    link: "/notifications",
    logo: <IoMdNotificationsOutline size={24} />,
  },
];
