import React from "react";
import HomeButtons from "./HomeButtons";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Group = () => {
  const groups = [
    {
      id: 1,
      userName: "John Doe",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      lastText: "Hey, how have you been?",
    },
    {
      id: 2,
      userName: "Jane Smith",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      lastText: "Are we still on for lunch tomorrow?",
    },
    {
      id: 3,
      userName: "Michael Johnson",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      lastText: "Don’t forget to send the report.",
    },
    {
      id: 4,
      userName: "Emily Davis",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      lastText: "Had a great time at the event!",
    },
    {
      id: 5,
      userName: "William Brown",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      lastText: "Can you review my code?",
    },
    {
      id: 6,
      userName: "Olivia Wilson",
      img: "https://randomuser.me/api/portraits/women/6.jpg",
      lastText: "Let’s catch up over coffee.",
    },
    {
      id: 7,
      userName: "James Taylor",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      lastText: "Meeting has been rescheduled.",
    },
    {
      id: 8,
      userName: "Sophia Martinez",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      lastText: "Can you send me the presentation?",
    },
    {
      id: 9,
      userName: "Liam Anderson",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      lastText: "Happy Birthday! Have a great day!",
    },
  ];

  return (
    <div>
      <div className="rounded-[20px] shadow-2xl w-[100%] h-[347px] overflow-auto bg-white pt-[0] pl-[20px] pr-[30px] pb-[20px]">
        <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white z-20 pt-3.5 pb-2">
          <h2 className="font-poppins text-xl font-semibold">Groups</h2>
          <span className="cursor-pointer text-xl">
            <HiOutlineDotsVertical />
          </span>
        </div>
        {groups.map((item) => (
          <div
            key={item.id}
            className={
              item.id === groups.length
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
                  {item.lastText ? item.lastText : "Hi Guys, Wassup!"}
                </p>
              </div>
            </div>
            <div>
              <p>Today</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
