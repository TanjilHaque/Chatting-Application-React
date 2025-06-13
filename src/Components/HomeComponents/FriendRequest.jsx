//FriendRequest.jsx

import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import {
  getDatabase,
  ref,
  onValue,
  off,
  push,
  set,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import UserListSkeleton from "../../Skeletons/UserListSkeleton.jsx";
import { toast } from "react-toastify";
import moment from "moment";

const FriendRequest = () => {
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getDatabase();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Subscribe to incoming friend requests
  useEffect(() => {
    const requestRef = ref(db, "friendRequest/");
    const fetchRequests = () => {
      onValue(requestRef, (snapshot) => {
        const list = [];
        snapshot.forEach((item) => {
          if (currentUser?.uid === item.val().receiver_id) {
            list.push({ ...item.val(), FRKey: item.key });
          }
        });
        setRequestList(list);
        setLoading(false);
      });
    };
  
   fetchRequests();
   return ()=> off(requestRef)
  }, [currentUser, db]);
  

  // Accept a friend request
  const handleAccept = (item = {}) => {
    const now = moment().format();
    const friendsRef = ref(db, "friends/");
    const requestRef = ref(db, `friendRequest/${item.FRKey}`);
    const notificationRef = ref(db, "notificaton/");

    // 1) Add to friends
    set(push(friendsRef), {
      ...item,
      createdAt: now,
    })
      // 2) Remove the friendRequest entry
      .then(() => remove(requestRef))
      // 3) Create a notification
      .then(() =>
        set(push(notificationRef), {
          notificationMsg: `${item.sender_username} accepted your friend request`,
          sender_profile_picture: item.sender_profile_picture || Avatar,
          createdAt: now,
        })
      )
      // 4) Show success toast
      .then(() => {
        toast.success(`${item.sender_username} added to your friends`);
      })
      .catch((err) => {
        console.error("Error accepting friend request:", err);
        toast.error("Could not accept request. Try again.");
      });
  };

  // Reject a friend request
  const handleReject = (item = {}) => {
    if (!window.confirm("Are you sure you want to reject this request?")) {
      return;
    }
    const requestRef = ref(db, `friendRequest/${item.FRKey}`);
    remove(requestRef)
      .then(() => toast.info("Friend request rejected"))
      .catch((err) => {
        console.error("Error rejecting friend request:", err);
        toast.error("Could not reject request. Try again.");
      });
  };

  return (
    <div className="shadow-2xs mt-3">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="relative font-bold text-lg">
          Friend Requests
          <span className="absolute -right-6 -top-1 w-5 h-5 text-xs rounded-full bg-green-300 text-black flex items-center justify-center">
            {requestList.length}
          </span>
        </h1>
        <HiDotsVertical />
      </div>

      <div className="overflow-y-scroll h-[38dvh] scrollable-content px-4 pb-4">
        {loading ? (
          <UserListSkeleton />
        ) : requestList.length === 0 ? (
          <p className="text-center text-gray-500 mt-5">No friend requests</p>
        ) : (
          requestList.map((item, idx) => (
            <div
              key={item.FRKey}
              className={`flex items-center justify-between mt-3 ${
                idx === requestList.length - 1 ? "" : "border-b border-gray-800 pb-2"
              }`}
            >
              {/* Avatar */}
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <img
                  src={item.sender_profile_picture || Avatar}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Username & Time */}
              <div className="flex-1 px-3">
                <h1 className="font-semibold">{item.sender_username}</h1>
                <p className="text-sm text-gray-400">
                  {moment(item.createdAt).fromNow()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleAccept(item)}
                  className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-1.5"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(item)}
                  className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-1.5"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
