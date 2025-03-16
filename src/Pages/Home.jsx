import React from "react";
import Searchbar from "../Components/HomeComponents/Searchbar";
import GroupList from "../Components/HomeComponents/GroupList";

const Home = () => {
  return (
    <div>
      <div>
        <Searchbar />
      </div>
      <div>
        <GroupList />
      </div>
    </div>
  );
};

export default Home;
