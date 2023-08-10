import React from "react";

const Header = () => {
  return (
    <div className="bg-white flex flex-row justify-between items-center border-b-2 h-[80px] p-4 sticky top-0">
      <h3 className="text-gray-600 text-4xl">Transcipt Editor</h3>
      <button className=" h-[45px] w-[150px] tracking-wider text-lg rounded-md border-[1px]  border-neutral-800 cursor-pointer hover:border-gray-400 hover:border-2">
        download
      </button>
    </div>
  );
};

export default Header;