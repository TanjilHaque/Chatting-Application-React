import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HomeButtons from "./HomeButtons";

const GroupList = () => {
  const userList = [
    {
      id: 1,
      groupName: "Alpha Team",
      lastText: "Meeting rescheduled to 3 PM.",
      groupImage: "https://picsum.photos/seed/alpha/200/200",
    },
    {
      id: 2,
      groupName: "Beta Squad",
      lastText: "Project deadline is next Friday.",
      groupImage: "https://picsum.photos/seed/beta/200/200",
    },
    {
      id: 3,
      groupName: "Gamma Group",
      lastText: "Please review the latest draft.",
      groupImage: "https://picsum.photos/seed/gamma/200/200",
    },
    {
      id: 4,
      groupName: "Delta Crew",
      lastText: "Team lunch tomorrow at noon.",
      groupImage: "https://picsum.photos/seed/delta/200/200",
    },
    {
      id: 5,
      groupName: "Epsilon Unit",
      lastText: "Client meeting has been confirmed.",
      groupImage: "https://picsum.photos/seed/epsilon/200/200",
    },
    {
      id: 6,
      groupName: "Zeta Circle",
      lastText: "Budget report is due Monday.",
      groupImage: "https://picsum.photos/seed/zeta/200/200",
    },
    {
      id: 7,
      groupName: "Eta Alliance",
      lastText: "Workshop scheduled for next week.",
      groupImage: "https://picsum.photos/seed/eta/200/200",
    },
    {
      id: 8,
      groupName: "Theta Network",
      lastText: "Please submit your timesheets.",
      groupImage: "https://picsum.photos/seed/theta/200/200",
    },
    {
      id: 9,
      groupName: "Iota League",
      lastText: "New project proposals are welcome.",
      groupImage: "https://picsum.photos/seed/iota/200/200",
    },
  ];

  return (
    <div className="rounded-[20px] shadow-2xl w-[427px] h-[347px] overflow-auto bg-white pt-[14px] pl-[20px] pr-[30px] pb-[20px]">
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="font-poppins text-xl font-semibold">Group List</h2>
        <span className="cursor-pointer text-xl">
          <HiOutlineDotsVertical />
        </span>
      </div>
      {userList.map((item) => (
        <div
          key={item.id}
          className={
            item.id === userList.length
              ? `flex justify-between items-center pb-[28px]`
              : `flex justify-between items-center groupsList pb-[28px]`
          }
        >
          <div className="flex justify-center items-center gap-[14px]">
            <img
              src={item.groupImage}
              alt="groupImage"
              className="rounded-full w-[70px] h-[70px]"
            />
            <div>
              <h3 className="font-poppins font-semibold text-lg">
                {item.groupName ? item.groupName : "Chat Group"}
              </h3>
              <p className="font-poppins font-medium text-sm text-[#4D4D4DBF]">
                {item.lastText ? item.lastText : "Hi Guys, Wassup!"}
              </p>
            </div>
          </div>
          <div>
            <HomeButtons title="Join" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
