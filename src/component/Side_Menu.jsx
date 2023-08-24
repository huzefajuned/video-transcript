import React from "react";
import { GrClose } from "react-icons/gr";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";

const Side_Menu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${
        menuOpen
          ? "w-full sm:w-8/12 md:w-4/12 lg:w-2/12 xl:4/12 2xl:w-6/12"
          : "w-0"
      } h-full transition-all duration-300 fixed top-0 left-0 z-0 overflow-scroll no-scrollbar bg-primaryColor shadow-xl  `}
    >
      <div className="h-screen p-4">
        <div className="text-xl font-semibold mb-4 flex flex-row justify-between items-center">
          <h2 className="text-2xl">Dashboard</h2>
          <GrClose
            size={30}
            className="cursor-pointer rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col gap-2">
          {routes.map((rName, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-100 rounded-md flex flex-row gap-3 p-2 items-center text-center"
              onClick={() => navigate(rName.path)}
            >
              <p className="text-lg">{rName.icon}</p>
              <p>{rName.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Side_Menu;
