import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";

export const size = 30;
export const routes = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome size={size} className="min-w-max" />,
    cName: "nav-text",
  },

  {
    title: "Uploads",
    path: "/uploads",
    icon: <MdIcons.MdOutlineStreetview size={size} className="min-w-max" />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/Login",
    icon: <BiIcons.BiSolidLogInCircle size={size} className="min-w-max" />,
    cName: "nav-text",
  },
  // {
  //   title: "Sing-Up",
  //   path: "/Sign-up",
  //   icon: <BiIcons.BiSolidLogInCircle size={size} className="min-w-max" />,
  //   cName: "nav-text",
  // },
];
