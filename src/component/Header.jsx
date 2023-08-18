import React from "react";

const Header = () => {
  return (
    <div className="bg-white flex flex-row items-center justify-between border-b-2 h-[80px] p-4 sticky top-0">
      <div className="flex flex-row items-center gap-10">
        <h3 className="text-gray-600 text-md sm:text-md  md:text-xl lg:text-xl xl:text-2xl">
          Transcipt Editor
        </h3>
      </div>
      <div>
        <button className=" w-[140px] h-[40px] md:h-[45px] md:w-[150px]  tracking-wider text-xl rounded-md border-[1px]  border-neutral-800 cursor-pointer hover:border-gray-400 hover:border-2">
          Download
        </button>
      </div>
    </div>
  );
};

export default Header;
