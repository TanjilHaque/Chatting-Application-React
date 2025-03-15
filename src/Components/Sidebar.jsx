import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";
import { SlHome } from "react-icons/sl";
import { Link, useLocation, useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuClicked, setMenuClicked] = useState(false);
  const menuIcons = [
    {
      id: 1,
      iconName: <SlHome />,
      path: "/house",
    },
    {
      id: 2,
      iconName: <AiOutlineMessage />,
      path: "/message",
    },
    {
      id: 3,
      iconName: <FaRegBell />,
      path: "/notification",
    },
    {
      id: 4,
      iconName: <BsGear />,
      path: "/settings",
    },
  ];
  const handleMenuBtn = () => {
    setMenuClicked(!menuClicked);
  };
  return (
    <div>
      <div className="bg-[#5F35F5] w-[10vw] h-[90vh] rounded-3xl ml-[20px] mt-[20px]">
        <div className="avatar">
          <div className="imageContainer flex justify-center items-center group ">
            <img
              className={`rounded-full w-[100px] h-[100px] mt-[38px] mb-[78px] cursor-pointer`}
              src="./src/images/RegistrationImages/avatar.png"
              alt="avatar"
            />
            <span className="absolute hidden group-hover:block z-10 text-5xl text-white ">
              <IoCloudUploadOutline />
            </span>
          </div>
        </div>
        <div className="icons text-[46px] flex flex-col justify-center items-center gap-[33px]">
          {menuIcons.map((item, index) => (
            <Link to={item.path}>
              <div
                key={item.id}
                className={
                  item.path == location.pathname
                    ? `cursor-pointer pt-4 pb-5 pl-10 pr-14 text-white menuActive`
                    : `cursor-pointer pt-4 pb-5 pl-10 pr-14 text-white`
                }
                onClick={handleMenuBtn}
              >
                {item.iconName}
              </div>
            </Link>
          ))}
        </div>
        <div className="exitIcon">
          <div className="text-[46px] text-[#fff] flex justify-center items-end mt-[60px] cursor-pointer">
            <ImExit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
