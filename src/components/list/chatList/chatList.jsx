import { useEffect, useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import AddUser from "../../register/addUser";
import "./chatList.css";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [search, setSearch] = useState("");



  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser?.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          console.log(item)
          const userDocRef = doc(db, "users", item?.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return {
            ...item,
            user,
            unReadCount: item.unReadCount || 0,
          };
        });

        // console.log(items)




        const chatData = await Promise.all(promises);




        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => unSub();
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {

      const { user, ...rest } = item;
      return rest;
    });


    const chatIndex = userChats.findIndex((i) => i.chatId === chat.chatId);

    if (chatIndex !== -1) {
      userChats[chatIndex].isSeen = true;
      userChats[chatIndex].unReadCount = 0
    }


    const userChatRef = doc(db, "userChats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error?.message);
    }
  };
  const filteredChats = chats.filter((c) =>
    c.user?.userName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="chatList">
      <div className="search">
        <div className="search__bar">
          <img src="./search.png" alt="search" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <img
          className="add"
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {filteredChats.map((item) => {
        return (
          <div
            key={item.chatId}
            className="item"
            onClick={() => handleSelect(item)}
            style={{
              backgroundColor: item.isSeen ? "transparent" : "#5183fe",
            }}>
            <img src={item?.user.avatar || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{item?.user?.userName}</span>
              <p>{item?.lastMessage}</p>
            </div>

            {/* <div style={{ display: "block" }}>
        <div
          style={{
            display: "flex",
            alignItems: "cneter",
            justifyContent: "end",
            width: "100%",
          }}>
          <p style={{ color: "#9f9d9d" }}>
            {new Date(item?.udpatedAt).toLocaleDateString("EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      </div> */}
          </div>
        );
      })}
      {addMode && <AddUser />}
    </section>
  );
}
