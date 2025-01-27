import { useUserStore } from "../../../lib/userStore";
import "./userInfo.css";
export default function UserInfo() {
  const { currentUser } = useUserStore();

  return (
    <section className="userInfo">
      <div className="user">
        <img src={currentUser?.avatar || "./avatar.png"} alt="" />
        <h1>{currentUser?.userName || "Not Found"}</h1>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </section>
  );
}
