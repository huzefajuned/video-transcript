import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";

const Header = ({ toggleMenu, menuOpen }) => {
  return (
    <div className="bg-white flex flex-row items-center justify-between border-b-2 h-[80px] p-4 sticky top-0">
      <div className="flex flex-row items-center gap-10">
        {menuOpen !== true ? (
          <RxHamburgerMenu
            size={25}
            className=" cursor-pointer"
            onClick={toggleMenu}
          />
        ) : (
          <GrClose size={25} className=" cursor-pointer" onClick={toggleMenu} />
        )}

        <h3 className="text-gray-600 text-4xl">Transcipt Editor</h3>
      </div>
      <div>
        <button className=" h-[45px] w-[150px] tracking-wider text-xl rounded-md border-[1px]  border-neutral-800 cursor-pointer hover:border-gray-400 hover:border-2">
          Download
        </button>
      </div>
    </div>
  );
};

export default Header;
