import "./userInfo.css";
export default function UserInfo() {
  return (
    <section className="userInfo">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h1>John Doe</h1>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </section>
  );
}
