import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Searchbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center cursor-pointer w-[100%] bg-white shadow-xl px-[23px] py-[14.5px] rounded-[20px]">
        <div className="flex justify-center items-center gap-[36px]">
          <span className="text-[25px]">
            <CiSearch />
          </span>
          <input className="w-[350px] h-[30px] text-xl" type="text" placeholder="Search" />
        </div>
        <span className="text-[#5F35F5] text-xl">
          <HiOutlineDotsVertical />
        </span>
      </div>
    </div>
  );
};

export default Searchbar;
