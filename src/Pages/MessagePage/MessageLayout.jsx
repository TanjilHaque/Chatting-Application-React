//MessageLayout.jsx
import React from "react";
import Searchbar from "../../Components/HomeComponents/Searchbar";
import Group from "../../Components/HomeComponents/Group";
import Friends from "../../Components/HomeComponents/Friends";
import Message from "./Message";

const MessageLayout = () => {
  return (
    <div className="flex justify-ceneter items-center gap-[27px] h-[85vh]">
      <div className="flex flex-col gap-[43px] mt-[20px] h-[100%]">
        <div>
          <Searchbar />
        </div>
        <div>
          <Group />
        </div>
        <div>
          <Friends showButton={false} />
        </div>
      </div>
      <div className="h-[100%] w-full rounded-[25px] py-[20px] px-[50px]
      flex justify-center items-center">
        <Message></Message>
      </div>
    </div>
  );
};

export default MessageLayout;
