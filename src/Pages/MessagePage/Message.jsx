import React, { useEffect, useState } from "react";
import { FaCamera, FaRegFaceSmileBeam, FaTelegram } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import DefaultMessageScreen from "../../Components/MessageComponent/DefaultMessageScreen";

const Message = () => {
  const [message, setMessage] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [messages, setMessages] = useState([]);

  const { value: user } = useSelector((store) => store.friend);
  const auth = getAuth();
  const db = getDatabase();
  const currentUser = auth.currentUser;
  const chatId =
    currentUser && user?.userUid
      ? currentUser.uid < user.userUid
        ? `${currentUser.uid}_${user.userUid}`
        : `${user.userUid}_${currentUser.uid}`
      : null;

  // Listen for messages
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

    return () => unsubscribe(); // cleanup
  }, [chatId]);

  // Send message
  const handleSend = async () => {
    console.log("button is working");
    console.log(chatId);
    console.log("currentUser:", currentUser);
    console.log("selected friend:", user);

    if (!message.trim() || !chatId) return;

    try {
      const msgRef = ref(db, `messages/${chatId}`);
      const newMsg = push(msgRef);
      await set(newMsg, {
        senderId: currentUser.uid,
        receiverId: user.userUid,
        message: message.trim(),
        timestamp: Date.now(),
      });
      setMessage("");
    } catch (error) {
      console.error("Message sending failed:", error);
    }
  };

  if(!user || !chatId){
    return(
        <DefaultMessageScreen></DefaultMessageScreen>
    )
  }else{
    return(
        <div className="relative p-4">
      {/* Header */}
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

      {/* Messages */}
      <div className="overflow-y-scroll h-[60vh] space-y-4 pr-2">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === currentUser.uid;
          return (
            <div
              key={index}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div
                className={`px-4 py-3 w-fit max-w-[75%] text-wrap rounded-[15px] ${
                  isMe
                    ? "bg-sky-500 rounded-br-none text-white"
                    : "bg-gray-400 rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
              <p className="text-xs text-gray-600">
                {moment(msg.timestamp).calendar()}
              </p>
            </div>
          );
        })}
      </div>

      <hr className="my-4" />

      {/* Input */}
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
          <span className="cursor-pointer">
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

      {/* Emoji Picker */}
      {emojiToggle && (
        <div className="absolute right-4 bottom-28 z-50">
          <EmojiPicker
            onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
          />
        </div>
      )}
    </div>
    )
  }
};

export default Message;
