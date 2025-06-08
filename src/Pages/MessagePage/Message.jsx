import React, { useEffect, useState } from "react";
import { FaCamera, FaRegFaceSmileBeam, FaTelegram } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
// Removed Firebase Storage imports as we are using Cloudinary now
import { useDropzone } from "react-dropzone";
// Removed uuid import as it's not strictly necessary for this direct upload method

import DefaultMessageScreen from "../../Components/MessageComponent/DefaultMessageScreen";

// --- Cloudinary Configuration ---
// IMPORTANT: Replace these with your actual Cloudinary credentials.
// For production apps, consider fetching these from a secure backend or environment variables.
const CLOUDINARY_CLOUD_NAME = "dfchfmhre"; 
const CLOUDINARY_UPLOAD_PRESET = "mern2403"; // Highly Recommended for client-side uploads (unsigned)
const CLOUDINARY_API_KEY = "613149436429777"; // Use with caution on client-side; upload preset is safer.
// --------------------------------

const Message = () => {
  const [message, setMessage] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [messages, setMessages] = useState([]);

  // image upload hooks
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [showAllPreviews, setShowAllPreviews] = useState(false);
  // image upload hooks

  //react-dropZone modal logic
  // Firebase Storage initialization removed as it's no longer used for images

  const onDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    );
    setSelectedImages((prev) => [...prev, ...imageFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: true,
  });

  // --- Cloudinary Upload Function ---
  const handleCloudinaryUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Using unsigned upload preset
    // If you were to use an API Key directly (less secure for client-side):
    // formData.append("api_key", CLOUDINARY_API_KEY); 
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data && data.secure_url) {
        return data.secure_url; // This is the public URL of the uploaded image
      } else {
        console.error("Cloudinary upload failed:", data);
        return null;
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  // --- Modified handleUploadImages to use Cloudinary ---
  const handleUploadImages = async () => {
    const urls = [];

    for (const image of selectedImages) {
      const cloudinaryUrl = await handleCloudinaryUpload(image);
      if (cloudinaryUrl) {
        urls.push(cloudinaryUrl);
      }
    }

    // Set uploaded image URLs for immediate preview in UI
    setUploadedImageUrls(urls);
    setSelectedImages([]);
    setShowImageModal(false);

    // Send the image message to Firebase Realtime Database
    // Only send if there are images successfully uploaded
    if (urls.length > 0) {
      try {
        const msgRef = ref(db, `messages/${chatId}`);
        const newMsg = push(msgRef);
        await set(newMsg, {
          senderId: currentUser.uid,
          receiverId: user.userUid,
          message: "", // no text, just images
          imageUrls: urls, // Store Cloudinary URLs in Firebase
          timestamp: Date.now(),
        });
        setUploadedImageUrls([]); // Clear images after sending
      } catch (error) {
        console.error("Image message sending failed:", error);
      }
    }
  };

  //react-dropZone modal logic

  const { value: user } = useSelector((store) => store.friend);
  const auth = getAuth();
  const db = getDatabase(); // Firebase Realtime Database
  const currentUser = auth.currentUser;
  const chatId =
    currentUser && user?.userUid
      ? currentUser.uid < user.userUid
        ? `${currentUser.uid}_${user.userUid}`
        : `${user.userUid}_${currentUser.uid}`
      : null;

  // Listen for messages from Firebase Realtime Database
  useEffect(() => {
    if (!chatId) return;

    const msgRef = ref(db, `messages/${chatId}`);
    const unsubscribe = onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgArray = Object.values(data);
        setMessages(msgArray);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe(); // cleanup on component unmount or chatId change
  }, [chatId, db]); // Include db in dependency array for good practice

  // Send message to Firebase Realtime Database (handles both text and pre-uploaded images)
  const handleSend = async () => {
    if ((!message.trim() && uploadedImageUrls.length === 0) || !chatId) return;

    try {
      const msgRef = ref(db, `messages/${chatId}`);
      const newMsg = push(msgRef);
      await set(newMsg, {
        senderId: currentUser.uid,
        receiverId: user.userUid,
        message: message.trim(),
        imageUrls: uploadedImageUrls, // These are Cloudinary URLs
        timestamp: Date.now(),
      });
      setMessage(""); // Clear text input
      setUploadedImageUrls([]); // Clear image previews after sending
    } catch (error) {
      console.error("Message sending failed:", error);
    }
  };

  if (!user || !chatId) {
    return <DefaultMessageScreen />;
  } else {
    return (
      <div className="relative p-4 w-[100%]">
        {/* Header - No changes */}
        <div className="flex items-center gap-4">
          <img
            src={user?.userProfilePicture}
            className="h-[55px] w-[55px] rounded-full object-cover"
            alt="User"
          />
          <div>
            <h1 className="font-bold text-xl">{user?.userName}</h1>
            <p>{navigator.onLine ? "Online" : "Offline"}</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Messages Display - No changes (will display Cloudinary URLs) */}
        <div className="overflow-y-scroll h-[60vh] space-y-4 pr-2">
          {messages.map((msg, index) => {
            const isMe = msg.senderId === currentUser.uid;
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-3 w-fit max-w-[75%] rounded-[15px] space-y-2 ${
                    isMe
                      ? "bg-sky-500 rounded-br-none text-white"
                      : "bg-gray-400 rounded-bl-none"
                  }`}
                >
                  {/* Show text if exists */}
                  {msg.message && <p className="break-words">{msg.message}</p>}

                  {/* Show image(s) if exists (now from Cloudinary URLs) */}
                  {msg.imageUrls &&
                    msg.imageUrls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt="chat"
                        className="w-40 h-40 object-cover rounded"
                      />
                    ))}
                </div>

                <p className="text-xs text-gray-600">
                  {moment(msg.timestamp).calendar()}
                </p>
              </div>
            );
          })}
        </div>

        <hr className="my-4" />
        {/* image preview - No changes (displays current state of uploadedImageUrls) */}
        {uploadedImageUrls.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2 flex-wrap">
              {(showAllPreviews
                ? uploadedImageUrls
                : uploadedImageUrls.slice(0, 4)
              ).map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span
                    onClick={() =>
                      setUploadedImageUrls((prev) =>
                        prev.filter((_, i) => i !== idx)
                      )
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-sm flex items-center justify-center rounded-full cursor-pointer"
                  >
                    ✖
                  </span>
                </div>
              ))}
              {uploadedImageUrls.length > 4 && (
                <button
                  className="text-sm text-blue-500"
                  onClick={() => setShowAllPreviews(!showAllPreviews)}
                >
                  {showAllPreviews
                    ? "See Less"
                    : `See More (${uploadedImageUrls.length})`}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Input - No changes */}
        <div className="flex items-center gap-x-6 relative">
          <input
            type="text"
            value={message}
            placeholder="Send Message..."
            onChange={(e) => setMessage(e.target.value)}
            className="py-4 px-4 w-full bg-slate-200 rounded-3xl border text-lg"
          />

          <div className="flex items-center gap-x-4 text-2xl absolute right-16">
            <span
              className="cursor-pointer"
              onClick={() => setEmojiToggle(!emojiToggle)}
            >
              <FaRegFaceSmileBeam />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setShowImageModal(true)}
            >
              <FaCamera />
            </span>
          </div>

          <span
            className="text-3xl cursor-pointer text-purple-800"
            onClick={handleSend}
          >
            <FaTelegram />
          </span>
        </div>

        {/* Emoji Picker - No changes */}
        {emojiToggle && (
          <div className="absolute right-4 bottom-28 z-50">
            <EmojiPicker
              onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
            />
          </div>
        )}
        {/* modal for image preview - No changes in UI, but upload logic within is updated */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md space-y-4">
              <h2 className="text-xl font-bold">Upload Images</h2>
              <div
                {...getRootProps()}
                className="border-2 border-dashed p-6 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the images here...</p>
                ) : (
                  <p>Drag 'n' drop images here, or click to select</p>
                )}
              </div>
              {selectedImages.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-16 h-16 object-cover rounded"
                        alt="preview"
                      />
                      <span
                        onClick={() =>
                          setSelectedImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-sm flex items-center justify-center rounded-full cursor-pointer"
                      >
                        ✖
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setShowImageModal(false);
                    setSelectedImages([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleUploadImages} // This now triggers Cloudinary upload
                  disabled={selectedImages.length === 0}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Message;