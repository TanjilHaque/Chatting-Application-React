import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database"; // Import 'update'
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { IoMdAdd } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6"; // For the group icon
import { IoClose } from "react-icons/io5"; // For modal close button

// Import utility functions
import { handleChange } from "../../utils/ChangeHandaler.utils"; // Fix typo in filename later
import { validationGroup } from "../../validation/grouplist.validation.js";
import { uploadCloudinaryFile } from "../../utils/cloudinary.utils";
import { uploadFirebaseData } from "../../utils/uploadFirebase.utils"; // For pushing new group
import { openModal, closeModal } from "../../utils/modal.utils.js"; // Fix typo in filename later

// Import Redux actions
import {
  setAvailableGroups,
  setLoading,
  setError,
} from "../../features/slices/groupSlice.js";

const GroupList = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;

  const { availableGroups, loading, error } = useSelector(
    (state) => state.group
  ); // Access from Redux store

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupTagline: "",
    groupImage: null, // For the file object
  });
  const [groupError, setGroupError] = useState({});
  const [isCreating, setIsCreating] = useState(false); // For showing loader on creation

  // Fetch available groups from Firebase
  useEffect(() => {
    if (!currentUser) return;

    dispatch(setLoading(true));
    const groupRef = ref(db, "Grouplist/");
    const unsubscribe = onValue(
      groupRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const groupArray = Object.entries(data).map(([id, group]) => ({
            groupId: id,
            ...group,
          }));
          // Filter for public groups or groups current user is not already a member of
          // For simplicity, we'll assume all groups are "available" here unless specified.
          dispatch(setAvailableGroups(groupArray));
        } else {
          dispatch(setAvailableGroups([]));
        }
        dispatch(setLoading(false));
      },
      (error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
        toast.error("Failed to fetch groups.");
      }
    );

    return () => unsubscribe();
  }, [db, currentUser, dispatch]);

  const handleCreateGroup = async () => {
    // Validate form fields
    const isValid = validationGroup(groupInfo, setGroupError);
    if (!isValid) {
      toast.error("Please fill all group fields.");
      return;
    }

    if (!currentUser) {
      toast.error("You must be logged in to create a group.");
      return;
    }

    setIsCreating(true);

    try {
      let groupImageURL = "";
      if (groupInfo.groupImage) {
        const formData = new FormData();
        formData.append("file", groupInfo.groupImage);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Use preset from .env
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME); // Use cloud_name from .env

        groupImageURL = await uploadCloudinaryFile(formData);
        if (!groupImageURL) {
          throw new Error("Failed to upload group image to Cloudinary.");
        }
      }

      const newGroupData = {
        groupName: groupInfo.groupName,
        groupTagline: groupInfo.groupTagline,
        groupImage: groupImageURL,
        adminUid: currentUser.uid,
        adminName: currentUser.displayName || "Unknown User",
        members: {
          // Use a map for members for easier lookup
          [currentUser.uid]: true, // Admin is automatically a member
        },
        timestamp: Date.now(),
      };

      // 1. Upload group data to Grouplist/ (this generates a unique groupId)
      const newGroupRef = ref(db, "Grouplist/");
      const pushedRef = await uploadFirebaseData(newGroupRef, newGroupData); // This utility pushes with a generated ID

      // Get the ID of the newly created group
      const newGroupId = pushedRef.key; // The push method returns a ref with a key property

      // 2. Update the current user's profile to add this groupId to their joined groups
      // This requires the 'update' method on the specific user's node, not push or set utility
      const currentUserDbRef = ref(db, `users/${currentUser.uid}`);
      await update(currentUserDbRef, {
        [`joinedGroups/${newGroupId}`]: true, // Add the new group ID to user's joinedGroups map
      });

      toast.success("Group created successfully!");
      setGroupInfo({ groupName: "", groupTagline: "", groupImage: null });
      setGroupError({});
      closeModal(setIsModalOpen); // Close modal on success
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error(`Failed to create group: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinGroup = async (groupId) => {
    if (!currentUser) {
      toast.error("You must be logged in to join a group.");
      return;
    }
    dispatch(setLoading(true)); // Indicate loading for this action
    try {
      // Update group's members list
      const groupMembersRef = ref(db, `Grouplist/${groupId}/members`);
      await update(groupMembersRef, {
        [currentUser.uid]: true, // Add current user to group members
      });

      // Update user's joinedGroups list
      const userJoinedGroupsRef = ref(
        db,
        `users/${currentUser.uid}/joinedGroups`
      );
      await update(userJoinedGroupsRef, {
        [groupId]: true, // Add group to user's joinedGroups
      });

      toast.success("Joined group successfully!");
    } catch (error) {
      console.error("Error joining group:", error);
      toast.error(`Failed to join group: ${error.message}`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full bg-white rounded-[20px] shadow-2xl pt-0 pl-[20px] pr-[30px] pb-[20px] h-[429px] overflow-y-auto">
      <div className="flex justify-between items-center mb-[20px] sticky top-0 bg-white z-20 pt-3.5 pb-2">
        <h2 className="font-poppins text-xl font-semibold">Group List</h2>
        <span
          onClick={() => openModal(setIsModalOpen)}
          className="text-3xl text-primary-500 cursor-pointer hover:text-primary-700"
          title="Create New Group"
        >
          <IoMdAdd />
        </span>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-full">
          <SyncLoader color="#36d7b7" size={10} />
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && availableGroups.length === 0 && (
        <p className="text-gray-500 text-center">
          No groups available. Be the first to create one!
        </p>
      )}

      {/* Group List Display */}
      <div className="space-y-4">
        {availableGroups.map((group) => {
          const isMember = group.members && group.members[currentUser?.uid];
          return (
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
              {isMember ? (
                <button className="bg-gray-400 text-white py-2 px-4 rounded-lg text-sm cursor-not-allowed">
                  Member
                </button>
              ) : (
                <button
                  onClick={() => handleJoinGroup(group.groupId)}
                  className="bg-primary-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-primary-600 transition duration-300"
                >
                  Join
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => closeModal(setIsModalOpen)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
            >
              <IoClose />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create New Group
            </h2>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Study Buddies"
                  value={groupInfo.groupName}
                  onChange={(e) => handleChange(e, setGroupInfo, setGroupError)}
                />
                {groupError.groupNameError && (
                  <p className="text-red-500 text-sm mt-1">
                    {groupError.groupNameError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="groupTagline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Group Tagline
                </label>
                <input
                  type="text"
                  id="groupTagline"
                  name="groupTagline"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Short description of your group"
                  value={groupInfo.groupTagline}
                  onChange={(e) => handleChange(e, setGroupInfo, setGroupError)}
                />
                {groupError.groupTaglineError && (
                  <p className="text-red-500 text-sm mt-1">
                    {groupError.groupTaglineError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="groupImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Group Image
                </label>
                <input
                  type="file"
                  id="groupImage"
                  name="groupImage"
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => handleChange(e, setGroupInfo, setGroupError)}
                />
                {groupError.groupImageError && (
                  <p className="text-red-500 text-sm mt-1">
                    {groupError.groupImageError}
                  </p>
                )}
                {groupInfo.groupImage && (
                  <img
                    src={URL.createObjectURL(groupInfo.groupImage)}
                    alt="Group Preview"
                    className="mt-2 w-24 h-24 object-cover rounded-md"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={handleCreateGroup}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                disabled={isCreating}
              >
                {isCreating ? (
                  <SyncLoader color="#fff" size={8} />
                ) : (
                  "Create Group"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
