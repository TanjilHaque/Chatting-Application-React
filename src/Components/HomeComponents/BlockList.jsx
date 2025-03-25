import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HomeButtons from "./HomeButtons";

const BlockList = () => {
  const blockLists = [
    {
      id: 1,
      userName: "Liam Smith",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      lastDate: "2025-03-17T14:30:00Z",
    },
    {
      id: 2,
      userName: "Olivia Brown",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      lastDate: "2025-03-16T09:15:00Z",
    },
    {
      id: 3,
      userName: "Noah Johnson",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      lastDate: "2025-03-15T18:45:00Z",
    },
    {
      id: 4,
      userName: "Emma Williams",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      lastDate: "2025-03-14T11:20:00Z",
    },
    {
      id: 5,
      userName: "James Jones",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      lastDate: "2025-03-13T16:00:00Z",
    },
    {
      id: 6,
      userName: "Ava Garcia",
      img: "https://randomuser.me/api/portraits/women/6.jpg",
      lastDate: "2025-03-12T08:30:00Z",
    },
    {
      id: 7,
      userName: "William Martinez",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      lastDate: "2025-03-11T20:15:00Z",
    },
    {
      id: 8,
      userName: "Sophia Rodriguez",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      lastDate: "2025-03-10T13:50:00Z",
    },
    {
      id: 9,
      userName: "Benjamin Davis",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      lastDate: "2025-03-09T17:25:00Z",
    },
  ];

  return (
    <div>
      <div className="rounded-[20px] shadow-2xl w-[100%] h-[347px] overflow-auto bg-white pt-[0] pl-[20px] pr-[30px] pb-[20px]">
        <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white z-20 pt-3.5 pb-2">
          <h2 className="font-poppins text-xl font-semibold">Block List</h2>
          <span className="cursor-pointer text-xl">
            <HiOutlineDotsVertical />
          </span>
        </div>
        {blockLists.map((item) => (
          <div
            key={item.id}
            className={
              item.id === blockLists.length
                ? `flex justify-between items-center pb-[28px]`
                : `flex justify-between items-center groupsList pb-[28px]`
            }
          >
            <div className="flex justify-center items-center gap-[14px]">
              <img
                src={item.img}
                alt="groupImage"
                className="rounded-full w-[70px] h-[70px]"
              />
              <div>
                <h3 className="font-poppins font-semibold text-lg">
                  {item.userName ? item.userName : "Chat Group"}
                </h3>
                <p className="font-poppins font-medium text-sm text-[#4D4D4DBF]">
                  {item.lastMessageDate
                    ? item.lastMessageDate
                    : "Hi Guys, Wassup!"}
                </p>
              </div>
            </div>
            <div>
              <HomeButtons title="Unblock" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockList;
