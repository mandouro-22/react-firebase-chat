import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./details.css";

export default function Details() {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();

  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <aside className="details">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="avatar" />
        <h2>{user?.userName}</h2>
        {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p> */}
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <div className="photos">
          <div className="photo__item">
            <div className="photo__details">
              <img
                src="https://images.pexels.com/photos/6747325/pexels-photo-6747325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="download" className="icon" />
          </div>
          <div className="photo__item">
            <div className="photo__details">
              <img
                src="https://images.pexels.com/photos/6747325/pexels-photo-6747325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="download" className="icon" />
          </div>
          <div className="photo__item">
            <div className="photo__details">
              <img
                src="https://images.pexels.com/photos/6747325/pexels-photo-6747325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="download" className="icon" />
          </div>
          <div className="photo__item">
            <div className="photo__details">
              <img
                src="https://images.pexels.com/photos/6747325/pexels-photo-6747325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="download" className="icon" />
          </div>
          <div className="photo__item">
            <div className="photo__details">
              <img
                src="https://images.pexels.com/photos/6747325/pexels-photo-6747325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="download" className="icon" />
          </div>
          <div className="photo__item">
            <div className="photo__details">
              <img
                src="https://images.pexels.com/photos/6747325/pexels-photo-6747325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="download" className="icon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You Are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Black User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </aside>
  );
}
