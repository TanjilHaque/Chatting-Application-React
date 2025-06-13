import React, { useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HomeButtons from "./HomeButtons";
import Modal from "react-modal";
import lib from "../../lib/lib";
import Avatar from "../../../src/assets/homeAssets/avatar.gif";
import HomeError from "../../Pages/Error/HomeError";
import GrouplistError from "../../Pages/Error/GrouplistError";
import { validationGroup } from "../../validation/grouplist.validation";
import { useFetchData } from "../../hooks/fetchData";
import { getAuth } from "firebase/auth";
import { uploadFirebaseData } from "../../utils/uploadFirebase.utils";
import { uploadCloudinaryFile } from "../../utils/cloudinary.utils";
// These helper functions must be defined or imported if not already
 // example path

const GroupList = () => {
  const inputRef = useRef(null);
  const auth = getAuth();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupError, setGroupError] = useState({});
  const { data, loading: isLoading, error } = useFetchData("Grouplist/");
  const [arrLength, setarrLength] = useState(10);
  const [loading, setloading] = useState(false);
  const [count, setcount] = useState(0);

  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupTagName: "",
    groupImage: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e, setState, setError) => {
    const { name, value, files } = e.target;
    if (name === "groupImage") {
      setState(prev => ({ ...prev, groupImage: files[0] }));
      setError(prev => ({ ...prev, groupImageError: "" }));
    } else {
      setState(prev => ({ ...prev, [name]: value }));
      setError(prev => ({ ...prev, [`${name}Error`]: "" }));
    }
  };

  const hanldeCreateGroup = async () => {
    const error = validationGroup(groupInfo, setGroupError);
    if (!error) return;

    const formData = new FormData();
    formData.append("file", groupInfo.groupImage);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    setloading(true);
    try {
      const Url = await uploadCloudinaryFile(formData);
      await uploadFirebaseData("Grouplist/", {
        adminUid: auth?.currentUser?.uid,
        adminName: auth?.currentUser?.displayName,
        adminEmail: auth?.currentUser?.email,
        adminPhoto: auth?.currentUser?.photoURL,
        groupName: groupInfo.groupName,
        groupTagName: groupInfo.groupTagName,
        groupImage: Url,
      });
    } catch (err) {
      console.log("error", err);
    } finally {
      setloading(false);
      setGroupInfo({
        groupName: "",
        groupTagName: "",
        groupImage: "",
      });
      setGroupError({});
      if (inputRef.current) inputRef.current.value = null;
      closeModal();
    }
  };

  if (error) {
    return (
      <HomeError>
        <GrouplistError>
          <a className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary">
            The number of Error is: {count}
          </a>
        </GrouplistError>
      </HomeError>
    );
  }

  return (
    <>
      <div>
        {/* Search Bar */}
        <div className="relative p-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search ..."
            required
          />
        </div>

        {/* List */}
        <div className="shadow-2xs mt-3">
          <div className="flex items-center justify-between">
            <h1 className="relative">
              Groups List{" "}
              <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                {arrLength}
              </span>
            </h1>
            <button
              onClick={openModal}
              className="focus:outline-none text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Create Group
            </button>
          </div>

          <div className="overflow-y-scroll h-[35dvh] scrollable-content">
            {[...new Array(arrLength)].map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-between mt-3 ${
                  arrLength - 1 !== index ? "border-b border-b-gray-800" : ""
                } pb-2`}
              >
                <div className="w-[50px] h-[50px] rounded-full">
                  <img
                    src={Avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="font-bold">Friends Reunion</h1>
                  <p className="text-sm font-normal">Hi Guys, Wassup!</p>
                </div>
                <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={lib.modalCustomStyle()}>
        <button
          onClick={closeModal}
          className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 mb-4"
        >
          Close
        </button>

        <div className="mt-5 w-full p-6 bg-white border rounded-lg shadow-sm dark:bg-gray-800">
          {/* Group Name Input */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-green-700">Group Name</label>
            <input
              type="text"
              name="groupName"
              value={groupInfo.groupName}
              onChange={(e) => handleChange(e, setGroupInfo, setGroupError)}
              className="bg-green-50 border border-green-500 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter group name"
            />
            {groupError.groupNameError && (
              <span className="text-sm text-red-600">{groupError.groupNameError}</span>
            )}
          </div>

          {/* Group Tag Input */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-green-700">Group Tag Name</label>
            <input
              type="text"
              name="groupTagName"
              value={groupInfo.groupTagName}
              onChange={(e) => handleChange(e, setGroupInfo, setGroupError)}
              className="bg-green-50 border border-red-500 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter group tag"
            />
            {groupError.groupTagNameError && (
              <span className="text-sm text-red-600">{groupError.groupTagNameError}</span>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021 4 4 0 0 0 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">JPG, PNG, GIF</p>
                {groupError.groupImageError && (
                  <span className="text-sm text-red-600">{groupError.groupImageError}</span>
                )}
              </div>
              <input
                id="dropzone-file"
                name="groupImage"
                type="file"
                ref={inputRef}
                onChange={(e) => handleChange(e, setGroupInfo, setGroupError)}
                className="hidden"
              />
            </label>
          </div>

          {/* Upload Button */}
          <button
            onClick={hanldeCreateGroup}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default GroupList;
