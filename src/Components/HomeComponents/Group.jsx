import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { FaUserGroup } from "react-icons/fa6"; // For the group icon

// Import Redux actions
import { setJoinedGroups, setLoading, setError } from '../../features/slices/groupSlice';

const Group = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;

  const { joinedGroups, loading, error } = useSelector((state) => state.group); // Access from Redux store

  useEffect(() => {
    if (!currentUser) {
      dispatch(setJoinedGroups([])); // Clear joined groups if no user
      return;
    }

    dispatch(setLoading(true));
    const userRef = ref(db, `users/${currentUser.uid}/joinedGroups`); // Path to user's joined groups

    const unsubscribe = onValue(userRef, async (snapshot) => {
      const joinedGroupIds = snapshot.val(); // Get map of groupId: true
      let groupsPromises = [];
      const fetchedGroups = [];

      if (joinedGroupIds) {
        for (const groupId in joinedGroupIds) {
          if (joinedGroupIds[groupId]) { // Ensure it's a true value
            groupsPromises.push(
              new Promise((resolve) => {
                const groupDetailsRef = ref(db, `Grouplist/${groupId}`);
                onValue(groupDetailsRef, (groupSnapshot) => {
                  const groupData = groupSnapshot.val();
                  if (groupData) {
                    fetchedGroups.push({ groupId: groupId, ...groupData });
                  }
                  resolve(); // Resolve promise even if group not found/deleted
                }, { onlyOnce: true }); // Fetch group details only once for now
              })
            );
          }
        }
      }

      await Promise.all(groupsPromises);
      dispatch(setJoinedGroups(fetchedGroups));
      dispatch(setLoading(false));
    }, (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error("Failed to fetch your groups.");
    });

    return () => unsubscribe(); // Cleanup listener
  }, [db, currentUser, dispatch]);


  return (
    <div className="w-full bg-white rounded-[20px] shadow-2xl pt-0 pl-[20px] pr-[30px] pb-[20px] h-[429px] overflow-y-auto">
      <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white z-20 pt-3.5 pb-2">
        <h2 className="font-poppins text-xl font-semibold">Your Groups</h2>
        <span className="text-3xl text-gray-400">
          <FaUserGroup />
        </span>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-full">
          <SyncLoader color="#36d7b7" size={10} />
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && joinedGroups.length === 0 && (
        <p className="text-gray-500 text-center">You haven't joined any groups yet.</p>
      )}

      {/* Joined Group List Display */}
      <div className="space-y-4">
        {joinedGroups.map((group) => (
          <div
            key={group.groupId}
            className="flex justify-between items-center pb-[28px] border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center gap-[14px]">
              <img
                src={group.groupImage || "https://via.placeholder.com/70"}
                alt="group avatar"
                className="w-[70px] h-[70px] rounded-full object-cover"
              />
              <div>
                <h3 className="font-poppins text-lg font-semibold text-[#000]">
                  {group.groupName}
                </h3>
                <p className="font-poppins text-sm text-[#4D4D4D]">
                  {group.groupTagline}
                </p>
              </div>
            </div>
            {/* You can add action buttons here, e.g., "View Group", "Leave Group" */}
            {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm">View</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;