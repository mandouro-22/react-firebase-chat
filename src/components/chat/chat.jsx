import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { useEffect, useRef, useState } from "react";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { toast } from "react-toastify";

export default function Chat() {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => unSub();
  }, [chatId]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      localStorage.setItem("chats", data.secure_url);
      setImg(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (text === "" && img) {
      return;
    }

    if (isCurrentUserBlocked || isReceiverBlocked)
      return toast.error("User Blocked");

    // if (img !== null) await update(img);

    try {
      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
          ...(img !== null && { img: img }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.map(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatsSnapShot = await getDoc(userChatRef);

        console.log(userChatsSnapShot.data());

        if (userChatsSnapShot.exists()) {
          const userChatData = userChatsSnapShot.data();
          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setText("");
      setImg(null);
    }
  };

  return (
    <aside className="chats">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.userName}</span>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.message?.map((message) => (
          <>
            <div
              className={
                message.senderId === currentUser.id ? "message own" : "message"
              }
              key={message?.createdAt}>
              <div className="texts">
                {message?.img && <img src={message.img} alt="" />}
                <p>{message.text}</p>
                {/* <span>{message.createdAt}</span> */}
              </div>
            </div>
          </>
        ))}
        {/* <div className="message">
          <div className="texts">
            <img
              src="https://images.pexels.com/photos/29989224/pexels-photo-29989224/free-photo-of-scenic-traditional-house-amidst-bali-rice-fields.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              aspernatur odit? Pariatur neque quidem beatae minima culpa impedit
              inventore nobis modi delectus assumenda fuga nostrum laudantium,
              quibusdam sequi sed animi!
            </p>
            <span>12:30 AM</span>
          </div>
        </div> */}

        <div ref={endRef} />
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="img" />
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={uploadImage}
            />
          </label>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a Message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt="emoji"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picket">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="send__button"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}>
          Send
        </button>
      </div>
    </aside>
  );
}
