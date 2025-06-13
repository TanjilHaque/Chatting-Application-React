//Blocklist.jsx
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HomeButtons from "./HomeButtons";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
const BlockList = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  const handleUnblock = (blockId) => {
    const confirmUnblock = confirm("Do you want to unblock this user?");
    if (!confirmUnblock) return;

    remove(ref(db, `blocks/${blockId}`))
      .then(() => {
        alert("User unblocked successfully.");
      })
      .catch((err) => {
        console.error("Failed to unblock:", err);
        alert("Something went wrong while unblocking.");
      });
  };

  useEffect(() => {
    const blockRef = ref(db, "blocks");
    const unsubscribe = onValue(blockRef, (snapshot) => {
      const currentUserId = auth.currentUser?.uid;
      const list = [];

      snapshot.forEach((item) => {
        const data = item.val();
        if (data.blocker_id === currentUserId) {
          list.push({ key: item.key, ...data });
        }
      });

      setBlockedUsers(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="rounded-[20px] shadow-2xl w-[100%] h-[347px] overflow-auto bg-white pt-[0] pl-[20px] pr-[30px] pb-[20px]">
        <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white pt-3.5 pb-2">
          <h2 className="font-poppins text-xl font-semibold">Block List</h2>
          <span className="cursor-pointer text-xl">
            <HiOutlineDotsVertical />
          </span>
        </div>
        {blockedUsers.map((item, index) => (
          <div
            key={item.key}
            className={
              index === blockedUsers.length - 1
                ? `flex justify-between items-center pb-[28px]`
                : `flex justify-between items-center groupsList pb-[28px]`
            }
          >
            <div className="flex justify-center items-center gap-[14px]">
              <img
                src={item.blocked_photo || Avatar}
                alt="Blocked User"
                className="rounded-full w-[70px] h-[70px]"
              />
              <div>
                <h3 className="font-poppins font-semibold text-lg">
                  {item.blocked_name}
                </h3>
                <p className="font-poppins font-medium text-sm text-[#4D4D4DBF]">
                  {item.blocked_email}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleUnblock(item.key)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded text-sm font-medium transition"
              >
                Unblock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockList;
