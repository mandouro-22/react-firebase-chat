import UserInfo from "./userInfo/userInfo";
import ChatList from "./chatList/chatList";
import "./list.css";

export default function List() {
  return (
    <aside className="list">
      <UserInfo />
      <ChatList />
    </aside>
  );
}
