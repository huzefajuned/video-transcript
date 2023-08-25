import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../../routes";

// logo
import logo from "../../assets/images/logo.jpeg";

//AuthContext

import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 750px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const { isAuth, setIsAut } = useContext(AuthContext);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_User")) {
      setIsAut(true);
    }
  }, [pathname]);

  function handleLogout() {
    const shouldLogout = window.confirm("Are you sure you want to log out?");

    if (shouldLogout) {
      localStorage.removeItem("auth_User");
      navigate("/Login");
      toast.success(" Successfully Logout !");
      setIsAut(false);
    }
  }

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, []);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div className="">
      <div
        onClick={() => setOpen(false)}
        className={`xl:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        // initial={{ x: 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex flex-row items-center justify-between overflow-x-hidden  font-medium border-b py-3 border-slate-300   mx-3">
          <img src={logo} width={40} alt="" className="" />
          <span className="text-3xl  whitespace-pre ">Dashboard</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            {routes.map((rName, index) =>
              // Exclude the "Log In" route from being displayed when user is authenticated
              isAuth && rName.path === "/Login" ? null : (
                <li
                  className=""
                  key={index}
                  onClick={() => navigate(rName.path)}
                >
                  <NavLink className="link hover:bg-primaryColor hover:text-whiteColor hover:duration-600">
                    {rName.icon}
                    {rName.title}
                  </NavLink>
                </li>
              )
            )}
            {isAuth && (
              <div className="bg-white overflow-hidden">
                <h2
                  onClick={() => handleLogout()}
                  className="p-2.5 flex  hover:bg-primaryColor hover:text-whiteColor hover:duration-600 rounded-md gap-6 items-center md:cursor-pointer  font-medium"
                >
                  <AiOutlineLogout size={23} className="" />
                  Log Out
                </h2>
              </div>
            )}
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 10,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 3 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
