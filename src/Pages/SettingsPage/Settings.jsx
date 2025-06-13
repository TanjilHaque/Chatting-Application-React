//Settings.jsx

import React, { useState } from "react";
import Searchbar from "../../Components/HomeComponents/Searchbar";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { FaKey } from "react-icons/fa6";
import { BsCircleHalf } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { Link } from "react-router";
import { getAuth } from "firebase/auth";

const Settings = () => {
  const auth = getAuth();
  console.log(auth)
  const [userNameClicked, setUserNameClicked] = useState(true);
  const handleChangeUserName = () => {
    setUserNameClicked(!userNameClicked);
  };
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState(auth.currentUser.displayName);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    setSavedName(name);
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // Hide message after 3s
  };
  auth.currentUser.displayName = savedName;
  if (userNameClicked) {
    return (
      <div>
        <div className="searchBar">
          <Searchbar></Searchbar>
        </div>
        <div className="flex items-center gap-[28px]">
          <div className="profileSettings ml-[20px] mt-[36px] pt-[26px] shadow-xl rounded-[20px] h-[81vh]">
            <h3 className="profileSettingsTitle mt-[26px] ml-[26px] mb-[50px] font-semibold text-xl">
              Profile Settings
            </h3>
            <div className="user flex ml-[42px] gap-[31px] items-center">
              <img className="rounded-full"
                src={auth.currentUser.photoURL}
                alt="avatar"
              />
              <div className="userCredentials">
                <h3 className="font-semibold text-[25px]">
                  {savedName}
                </h3>
                <p className="text-xl">Stay home stay safe</p>
              </div>
            </div>
            <div className="thinLine h-[1px] w-[455px] bg-[#00000040] mt-[30px] mb-[43px] ml-[44px] mr-[39px]"></div>
            <div className="settingsOptions ml-[80px] flex flex-col gap-[37px]">
              <div
                onClick={handleChangeUserName}
                className="profileName flex items-center text-[20px] gap-[39px]"
              >
                <PiPencilSimpleLineFill className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Edit Profile Name.</p>
              </div>
              <div className="profileStatus flex items-center text-[20px] gap-[39px]">
                <HiMiniChatBubbleOvalLeftEllipsis className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Edit Profile Status Info.</p>
              </div>
              <div className="profilePhoto flex items-center text-[20px] gap-[39px]">
                <MdAddPhotoAlternate className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Edit Profile Photo.</p>
              </div>
              <div className="help flex items-center text-[20px] gap-[39px]">
                <BsQuestionCircle className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Help.</p>
              </div>
            </div>
          </div>

          <div className="accountSettins mt-[36px] pt-[26px] shadow-xl rounded-[20px] h-[81vh] w-[40vw]">
            <h3 className="mt-[26px] ml-[26px] mb-[50px] font-semibold text-xl">
              Account Settings
            </h3>
            <div className="settingsOptions ml-[80px] flex flex-col gap-[37px]">
              <div className="profileName flex items-center text-[20px] gap-[39px]">
                <FaKey className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Change Password.</p>
              </div>
              <div className="profileStatus flex items-center text-[20px] gap-[39px]">
                <BsCircleHalf className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Theme.</p>
              </div>
              <div className="profilePhoto flex items-center text-[20px] gap-[39px]">
                <BsTrash3Fill className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Delete Account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="searchBar">
          <Searchbar></Searchbar>
        </div>
        <div className="flex items-center gap-[28px]">
          <div className="profileSettings ml-[20px] mt-[36px] pt-[26px] shadow-xl rounded-[20px] h-[81vh]">
            <h3 className="profileSettingsTitle mt-[26px] ml-[26px] mb-[50px] font-semibold text-xl">
              Profile Settings
            </h3>
            <div className="user flex ml-[42px] gap-[31px] items-center">
              <img className="rounded-full"
                src={auth.currentUser.photoURL}
                alt="avatar"
              />
              <div className="userCredentials">
                <h3 className="font-semibold text-[25px]">
                  {savedName}
                </h3>
                <p className="text-xl">Stay home stay safe</p>
              </div>
            </div>
            <div className="thinLine h-[1px] w-[455px] bg-[#00000040] mt-[30px] mb-[43px] ml-[44px] mr-[39px]"></div>
            <div className="settingsOptions ml-[80px] flex flex-col gap-[37px]">
              <div
                onClick={handleChangeUserName}
                className="profileName flex items-center text-[20px] gap-[39px]"
              >
                <PiPencilSimpleLineFill className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Edit Profile Name.</p>
              </div>
              <div className="profileStatus flex items-center text-[20px] gap-[39px]">
                <HiMiniChatBubbleOvalLeftEllipsis className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Edit Profile Status Info.</p>
              </div>
              <div className="profilePhoto flex items-center text-[20px] gap-[39px]">
                <MdAddPhotoAlternate className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Edit Profile Photo.</p>
              </div>
              <div className="help flex items-center text-[20px] gap-[39px]">
                <BsQuestionCircle className="text-[30px] cursor-pointer" />
                <p className="cursor-pointer">Help.</p>
              </div>
            </div>
          </div>

          <div className=" bg-white mt-[36px] px-5 pt-[30px] shadow-xl rounded-[20px] h-[81vh] w-[40vw]">
            <h2 className="text-lg font-bold mb-4">Change Profile Name</h2>

            <p className="text-gray-600 mb-2">
              Current Name: <span className="font-semibold">{auth.currentUser.displayName}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Save Name
              </button>
            </form>

            {success && (
              <p className="mt-4 text-green-600 text-sm">
                Name updated successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Settings;
