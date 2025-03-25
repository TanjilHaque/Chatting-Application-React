import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HomeButtons from "./HomeButtons";

const UserList = () => {
  const userLists = [
    {
      id: 1,
      userName: "Alice Johnson",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      lastMessageDate: "2025-03-17T14:30:00Z",
      lastText: "Looking forward to our meeting next week.",
    },
    {
      id: 2,
      userName: "Bob Smith",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      lastMessageDate: "2025-03-16T09:15:00Z",
      lastText: "Can you review the document I sent?",
    },
    {
      id: 3,
      userName: "Catherine Lee",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      lastMessageDate: "2025-03-15T18:45:00Z",
      lastText: "Happy Birthday! Hope you had a great day!",
    },
    {
      id: 4,
      userName: "David Brown",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
      lastMessageDate: "2025-03-14T11:20:00Z",
      lastText: "The project deadline has been moved up.",
    },
    {
      id: 5,
      userName: "Eva Green",
      img: "https://randomuser.me/api/portraits/women/14.jpg",
      lastMessageDate: "2025-03-13T16:00:00Z",
      lastText: "Let’s catch up over coffee soon.",
    },
    {
      id: 6,
      userName: "Frank White",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
      lastMessageDate: "2025-03-12T08:30:00Z",
      lastText: "Please find the attached files.",
    },
    {
      id: 7,
      userName: "Grace Kim",
      img: "https://randomuser.me/api/portraits/women/16.jpg",
      lastMessageDate: "2025-03-11T20:15:00Z",
      lastText: "Congratulations on your promotion!",
    },
    {
      id: 8,
      userName: "Henry Adams",
      img: "https://randomuser.me/api/portraits/men/17.jpg",
      lastMessageDate: "2025-03-10T13:50:00Z",
      lastText: "Can we reschedule our meeting?",
    },
    {
      id: 9,
      userName: "Isabella Martinez",
      img: "https://randomuser.me/api/portraits/women/18.jpg",
      lastMessageDate: "2025-03-09T17:25:00Z",
      lastText: "Thank you for your assistance earlier.",
    },
  ];

  return (
    <div>
      <div className="rounded-[20px] shadow-2xl w-[100%] h-[429px] overflow-auto bg-white pt-[0] pl-[20px] pr-[30px] pb-[20px]">
        <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white z-20 pt-3.5 pb-2">
          <h2 className="font-poppins text-xl font-semibold">User List</h2>
          <span className="cursor-pointer text-xl">
            <HiOutlineDotsVertical />
          </span>
        </div>
        {userLists.map((item) => (
          <div
            key={item.id}
            className={
              item.id === userLists.length
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
                  {item.lastMessageDate ? item.lastMessageDate : "Hi Guys, Wassup!"}
                </p>
              </div>
            </div>
            <div>
              <HomeButtons title="+" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
