import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";
import { SlHome } from "react-icons/sl";
import { Link, useLocation, useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuClicked, setMenuClicked] = useState(false);
  const auth = getAuth();

  //handle icon function implement
  const handleIcon = (path = '/')=>{
    navigate(path);
  }

  // Define sidebar menu items with associated icons and paths
  const menuIcons = [
    {
      id: 1,
      iconName: <SlHome />, // Home icon
      path: "/home",
    },
    {
      id: 2,
      iconName: <AiOutlineMessage />, // Message icon
      path: "/message",
    },
    {
      id: 3,
      iconName: <FaRegBell />, // Notification icon
      path: "/notification",
    },
    {
      id: 4,
      iconName: <BsGear />, // Settings icon
      path: "/settings",
    },
  ];

  // Toggle menu state when a menu item is clicked
  const handleMenuBtn = () => {
    setMenuClicked(!menuClicked);
  };

  // Function to handle profile picture upload using Cloudinary widget
  const handleUploadIconBtn = () => {
    cloudinary.openUploadWidget(
      {
        cloudName: "dfchfmhre", // Cloudinary account identifier
        uploadPreset: "mern2403", // Predefined settings for uploads
        sources: [
          "local",
          "url",
          "camera",
          "dropbox",
          "image_search",
          "shutterstock",
          "gettyimages",
          "istock",
          "unsplash",
          "google_drive",
        ],
        googleAPIKey: "AIzaSyAE1eM1y14XRkzvezynzQvBrRxKAFlIsOs",
        searchBySites: ["all", "cloudinary.com"],
        searchByRights: true,
      },
      (error, result) => {
        if (error) {
          throw new Error("Failed to upload Profile Picture");
        }
        console.log(result.info.secure_url); // Log uploaded image URL
      }
    );
  };

  // Load Cloudinary upload widget script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // handle log out
  const handleLogOut = ()=>{
    signOut(auth).then(() => {
      navigate('/login')
    }).catch((error) => {
      console.log("Error from Logout ",error)
    });
  }

  return (
    <div>
      {/* Sidebar Container */}
      <div className="bg-[#5F35F5] w-[10vw] h-[90vh] rounded-3xl ml-[20px] mt-[20px]">
        {/* Profile Avatar Section */}
        <div className="avatar">
          <div className="imageContainer flex justify-center items-center group relative">
            <img
              className="rounded-full w-[100px] h-[100px] mt-[38px] mb-[78px] cursor-pointer"
              src="./src/images/RegistrationImages/avatar.png"
              alt="avatar"
            />
            {/* Upload Icon Appears on Hover */}
            <span
              onClick={handleUploadIconBtn}
              className="cursor-pointer absolute opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out z-10 text-5xl text-white"
            >
              <IoCloudUploadOutline />
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Icons */}
        <div className="icons text-[46px] flex flex-col justify-center items-center gap-[33px]">
          {menuIcons.map((item, index) => (
            <Link to={item.path} key={item.id}>
              <div
                className={
                  item.path === location.pathname
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

        {/* Logout/Exit Icon at the Bottom */}
        <div className="exitIcon">
          <div onClick={handleLogOut} className="text-[46px] text-[#fff] flex justify-center items-end mt-[60px] cursor-pointer">
            <ImExit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
