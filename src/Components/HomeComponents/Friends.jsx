import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { FriendAction } from "../../features/slices/friendSlice.js";
import Avatar from '../../../src/assets/homeAssets/avatar.gif'
import UserListSkeleton from "../../Skeletons/UserListSkeleton.jsx";

const Friends = ({ showButton = true }) => {
  const [friendsList, setFriendsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();

  useEffect(() => {
    const friendsRef = ref(db, "friends");

    const unsubscribe = onValue(friendsRef, (snapshot) => {
      const currentUserId = auth.currentUser?.uid;
      const list = [];

      snapshot.forEach((item) => {
        const friend = item.val();

        const isCurrentUserInvolved =
          friend.sender_id === currentUserId ||
          friend.receiver_id === currentUserId;

        if (isCurrentUserInvolved) {
          const isSender = friend.sender_id === currentUserId;

          list.push({
            key: item.key,
            name: isSender ? friend.receiver_username : friend.sender_username,
            email: isSender ? friend.receiver_email : friend.sender_email,
            photo: isSender
              ? friend.receiver_profile_picture
              : friend.sender_profile_picture,
            userUid: isSender ? friend.receiver_id : friend.sender_id,
          });
        }
      });

      setFriendsList(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUnfriend = (key) => {
    const confirmDelete = confirm("Are you sure you want to unfriend?");
    if (!confirmDelete) return;

    remove(ref(db, `friends/${key}`))
      .then(() => {
        alert("Unfriended successfully");
      })
      .catch((err) => {
        console.error("Failed to unfriend:", err);
        alert("Something went wrong while unfriending.");
      });
  };

  const handleFriendInfo = (friend) => {
    dispatch(
      FriendAction({
        userUid: friend.userUid,
        userName: friend.name,
        userEmail: friend.email,
        userProfilePicture: friend.photo,
      })
    );
  };

  return (
    <div className="shadow-lg rounded-lg p-4 h-[48vh] overflow-y-auto bg-white dark:text-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-black">Friends</h2>
        <HiDotsVertical />
      </div>

      {loading ? (
        <UserListSkeleton />
      ) : friendsList.length === 0 ? (
        <p className="text-gray-500 text-sm">No friends yet.</p>
      ) : (
        friendsList.map((friend) => (
          <div
            key={friend.key}
            onClick={() => handleFriendInfo(friend)}
            className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm mb-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src={friend.photo || Avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-black">{friend.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {friend.email}
                </p>
              </div>
            </div>
            {showButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering handleFriendInfo
                  handleUnfriend(friend.key);
                }}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded text-sm font-medium transition"
              >
                Unfriend
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Friends;
