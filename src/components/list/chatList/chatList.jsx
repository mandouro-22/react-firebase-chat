import { useState } from "react";
import "./chatList.css";
import Register from "../../register/register";
export default function ChatList() {
  const [addMode, setAddMode] = useState(false);
  return (
    <section className="chatList">
      <div className="search">
        <div className="search__bar">
          <img src="./search.png" alt="search" />
          <input type="text" placeholder="Search..." />
        </div>
        <img
          className="add"
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {addMode && <Register />}
    </section>
  );
}
