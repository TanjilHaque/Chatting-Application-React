//UserList.jsx

import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HomeButtons from "./HomeButtons";
import {
  getDatabase,
  ref,
  onValue,
  // off, // off can be removed if using unsubscribe returned by onValue
  push,
  set,
  remove, // Added
  query,    // Added
  orderByChild, // Added
  equalTo   // Added
} from "firebase/database";
import { getAuth } from "firebase/auth";
import UserListSkeleton from "../../Skeletons/UserListSkeleton";
import moment from "moment";
import { toast } from "react-toastify";

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [userList, setUserList] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [sentRequests, setSentRequests] = useState([]); // Will store objects: { id: "senderUidreceiverUid", key: "firebaseKey" }
  const [friends, setFriends] = useState([]); // Will store UIDs of friends: ["friend1Uid", "friend2Uid"]

  // Fetch Users and Logged-in User's data
  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }
    const userRef = ref(db, "users/");
    const unsubscribe = onValue(userRef, (snapshot) => {
      const users = [];
      let currentUserData = {};
      snapshot.forEach((item) => {
        const userData = { ...item.val(), userKey: item.key };
        if (item.val().userUid === auth.currentUser.uid) {
          currentUserData = userData;
        } else {
          users.push(userData);
        }
      });
      setUserList(users);
      setLoggedUser(currentUserData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching users:", error);
      setLoading(false);
      toast.error("Could not fetch user data.");
    });

    return () => unsubscribe();
  }, [db, auth, auth.currentUser]);

  // Fetch Sent Friend Requests
  useEffect(() => {
    if (!auth.currentUser) return;

    const requestRef = ref(db, "friendRequest/");
    const unsubscribe = onValue(requestRef, (snapshot) => {
      const requestsData = [];
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.sender_id === auth.currentUser.uid) {
          requestsData.push({
            id: request.sender_id + request.receiver_id,
            key: item.key, // Firebase key of the friendRequest entry
          });
        }
      });
      setSentRequests(requestsData);
    }, (error) => {
      console.error("Error fetching sent friend requests:", error);
      toast.error("Could not fetch sent requests.");
    });

    return () => unsubscribe();
  }, [db, auth, auth.currentUser]);

  // Fetch Friends (UIDs of friends)
  useEffect(() => {
    if (!auth.currentUser) return;

    const currentUserId = auth.currentUser.uid;
    const friendsNodeRef = ref(db, "friends/");
    const unsubscribe = onValue(friendsNodeRef, (snapshot) => {
      const myFriendUids = new Set();
      snapshot.forEach((childSnapshot) => {
        const friendship = childSnapshot.val();
        if (friendship && friendship.sender_id && friendship.receiver_id) {
          if (friendship.sender_id === currentUserId) {
            myFriendUids.add(friendship.receiver_id);
          } else if (friendship.receiver_id === currentUserId) {
            myFriendUids.add(friendship.sender_id);
          }
        }
      });
      setFriends(Array.from(myFriendUids));
    }, (error) => {
      console.error("Error fetching friends:", error);
      toast.error("Could not fetch friends list.");
    });

    return () => unsubscribe();
  }, [db, auth, auth.currentUser]);

  const handleFriendRequest = (item) => { // item is the target user
    if (!loggedUser.userUid) {
        toast.error("Your user data is not loaded yet. Please wait.");
        return;
    }

    // Check if already friends
    if (friends.includes(item.userUid)) {
      toast.info("You are already friends!");
      return;
    }

    // Check if request already sent (using the updated sentRequests structure)
    const potentialRequestId = auth.currentUser.uid + item.userUid;
    if (sentRequests.some(req => req.id === potentialRequestId)) {
      toast.warning("Friend request already sent!");
      return;
    }

    const friendRequestCollectionRef = ref(db, "friendRequest/");
    const newRequestRef = push(friendRequestCollectionRef); // Get a ref with a key first
    const requestKey = newRequestRef.key; // This is the key for the friend request

    const requestData = {
      sender_id: loggedUser.userUid,
      sender_email: loggedUser.email,
      sender_profile_picture: loggedUser.profile_picture,
      sender_userKey: loggedUser.userKey,
      sender_username: loggedUser.username,
      receiver_id: item.userUid,
      receiver_email: item.email,
      receiver_profile_picture: item.profile_picture,
      receiver_userKey: item.userKey,
      receiver_username: item.username,
      createdAt: moment().format(),
      // No need to store requestKey inside requestData, it's the document's key
    };

    set(newRequestRef, requestData)
      .then(() => {
        return set(push(ref(db, "notification/")), {
          notificationMsg: `${loggedUser.username} sent you a friend request`, // Corrected typo
          sender_id: loggedUser.userUid,
          receiver_id: item.userUid, // Crucial for targeting notifications
          sender_profile_picture: loggedUser.profile_picture,
          createdAt: moment().format(),
          type: 'friend_request_received', // For easier querying/filtering
          relatedKey: requestKey, // Link notification to the specific friend request
        });
      })
      .then(() => {
        toast.success("Friend request sent");
      })
      .catch((err) => {
        console.error("Friend request error:", err);
        toast.error("Something went wrong. Try again.");
      });
  };

  const handleCancelRequest = (requestKeyToRemove, receiverUserUid) => {
    if (!auth.currentUser) return;

    const specificRequestRef = ref(db, `friendRequest/${requestKeyToRemove}`);
    remove(specificRequestRef)
      .then(() => {
        toast.success("Friend request cancelled.");

        // Attempt to remove the associated notification
        const notificationsRef = ref(db, "notification/");
        const notificationQuery = query(notificationsRef, orderByChild('relatedKey'), equalTo(requestKeyToRemove));
        
        onValue(notificationQuery, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const notification = childSnapshot.val();
            // Ensure it's the correct notification type and intended for the original receiver from this sender
            if (notification.type === 'friend_request_received' &&
                notification.receiver_id === receiverUserUid &&
                notification.sender_id === auth.currentUser.uid) {
              remove(ref(db, `notification/${childSnapshot.key}`)).catch(err => console.error("Error removing notification:", err));
            }
          });
        }, { onlyOnce: true }); // Fetch notifications once to find and delete

      })
      .catch((err) => {
        toast.error("Failed to cancel friend request. Try again.");
        console.error("Cancel request error:", err);
      });
  };

  if (loading) return <UserListSkeleton />;

  return (
    <div className="rounded-[20px] shadow-2xl w-full h-[429px] overflow-auto bg-white pt-0 pl-[20px] pr-[30px] pb-[20px]">
      <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white pt-3.5 pb-2">
        <h2 className="font-poppins text-xl font-semibold">User List</h2>
        <span className="cursor-pointer text-xl">
          <HiOutlineDotsVertical />
        </span>
      </div>

      {userList.map((item) => {
        // item is a user from the list (potential friend)
        const potentialRequestId = auth.currentUser.uid + item.userUid;
        const sentRequestObject = sentRequests.find(req => req.id === potentialRequestId);
        const isRequested = !!sentRequestObject;
        const isFriend = friends.includes(item.userUid);

        return (
          <div
            key={item.userUid}
            className="flex justify-between items-center pb-[28px] groupsList"
          >
            <div className="flex items-center gap-[14px]">
              <img
                src={item.profile_picture}
                alt="user"
                className="rounded-full w-[70px] h-[70px]"
              />
              <div>
                <h3 className="font-poppins font-semibold text-lg">
                  {item.username || "Unnamed User"}
                </h3>
                <p className="font-poppins font-medium text-sm text-[#4D4D4DBF]">
                  {item.lastMessageDate || "Hi there!"} {/* This might need to be sourced from chat data */}
                </p>
              </div>
            </div>

            <div>
              {isFriend ? (
                <HomeButtons title="✓ Friends" disabled />
              ) : isRequested ? (
                <div onClick={() => handleCancelRequest(sentRequestObject.key, item.userUid)}>
                  <HomeButtons title="Cancel" /> {/* Changed from "⏳" to "Cancel" and made active */}
                </div>
              ) : (
                <div onClick={() => handleFriendRequest(item)}>
                  <HomeButtons title="+" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;