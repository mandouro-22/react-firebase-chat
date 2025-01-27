import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import "./addUser.css";
import { db } from "../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../lib/userStore";

export default function AddUser() {
  const [user, setUser] = useState();
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userName = formData.get("userName");

    try {
      const usersRef = collection(db, "users");

      // Create a query against the collection.
      const q = query(usersRef, where("userName", "==", userName));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser?.id,
          udpatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user?.id,
          udpatedAt: Date.now(),
        }),
      });

      console.log(newChatRef.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="addUser">
      <form action="" onSubmit={handleSearch}>
        <input type="text" name="userName" placeholder="User Name" id="" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.userName}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </section>
  );
}
