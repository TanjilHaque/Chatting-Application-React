import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HomeButtons from "./HomeButtons";

const FriendRequest = () => {
  const friendRequests = [
    {
      id: 1,
      userName: "Alice Johnson",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      lastText: "Hi, I would like to connect with you.",
    },
    {
      id: 2,
      userName: "Bob Smith",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      lastText: "Hey, let’s catch up sometime!",
    },
    {
      id: 3,
      userName: "Catherine Lee",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      lastText: "It would be great to collaborate on future projects.",
    },
    {
      id: 4,
      userName: "David Brown",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
      lastText: "Looking forward to connecting with you.",
    },
    {
      id: 5,
      userName: "Eva Green",
      img: "https://randomuser.me/api/portraits/women/14.jpg",
      lastText: "Hi there, let’s be friends!",
    },
    {
      id: 6,
      userName: "Frank White",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
      lastText: "I’d like to add you to my professional network.",
    },
    {
      id: 7,
      userName: "Grace Kim",
      img: "https://randomuser.me/api/portraits/women/16.jpg",
      lastText: "Can we connect?",
    },
    {
      id: 8,
      userName: "Henry Adams",
      img: "https://randomuser.me/api/portraits/men/17.jpg",
      lastText: "Let’s connect and share ideas.",
    },
    {
      id: 9,
      userName: "Isabella Martinez",
      img: "https://randomuser.me/api/portraits/women/18.jpg",
      lastText: "I’d love to connect with you.",
    },
  ];

  return (
    <div>
      <div className="rounded-[20px] shadow-2xl w-[427px] h-[347px] overflow-auto bg-white pt-[14px] pl-[20px] pr-[30px] pb-[20px]">
        <div className="flex justify-between items-center mb-[20px]">
          <h2 className="font-poppins text-xl font-semibold">Friend Request</h2>
          <span className="cursor-pointer text-xl">
            <HiOutlineDotsVertical />
          </span>
        </div>
        {friendRequests.map((item) => (
          <div
            key={item.id}
            className={
              item.id === friendRequests.length
                ? `flex justify-between items-center pb-[28px]`
                : `flex justify-between items-center groupsList pb-[28px]`
            }
          >
            <div className="flex justify-center items-center gap-[14px]">
              <img
                src={item.img}
                alt="img"
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
              <HomeButtons title="Accept" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
