//Home.jsx
import React from "react";
import Searchbar from "../Components/HomeComponents/Searchbar";
import GroupList from "../Components/HomeComponents/GroupList";
import Friends from "../Components/HomeComponents/Friends";
import UserList from "../Components/HomeComponents/UserList";
import FriendRequest from "../Components/HomeComponents/FriendRequest";
import Group from "../Components/HomeComponents/Group";
import BlockList from "../Components/HomeComponents/BlockList";

const Home = () => {
  return (
    <div className="parent mt-[22px]">
      <div className="div1">
        <Searchbar />
      </div>
      <div className="div2">
        <GroupList />
      </div>
      <div className="div4">
        <Friends />
      </div>
      <div className="div6">
        <UserList />
      </div>
      <div className="div3">
        <FriendRequest />
      </div>
      <div className="div5">
        <Group />
      </div>
      <div className="div7">
        <BlockList />
      </div>
    </div>
  );
};

export default Home;
