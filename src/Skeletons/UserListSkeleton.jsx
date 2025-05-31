import React from "react";

const UserListSkeleton = () => {
  return (
    <div>
      <div className="rounded-[20px] shadow-2xl w-full h-[429px] overflow-auto bg-white pt-0 pl-[20px] pr-[30px] pb-[20px]">
        <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white z-20 pt-3.5 pb-2">
          <h2 className="font-poppins text-xl font-semibold">User List</h2>
          <span className="text-xl text-gray-400">
            <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
          </span>
        </div>

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center pb-[28px] animate-pulse"
          >
            <div className="flex justify-center items-center gap-[14px]">
              <div className="rounded-full w-[70px] h-[70px] bg-gray-300" />
              <div>
                <div className="h-[18px] w-[120px] bg-gray-300 rounded mb-2" />
                <div className="h-[14px] w-[90px] bg-gray-200 rounded" />
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListSkeleton;
