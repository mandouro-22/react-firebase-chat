import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <aside className="chats">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              aspernatur odit? Pariatur neque quidem beatae minima culpa impedit
              inventore nobis modi delectus assumenda fuga nostrum laudantium,
              quibusdam sequi sed animi!
            </p>
            <span>12:30 AM</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              aspernatur odit? Pariatur neque quidem beatae minima culpa impedit
              inventore nobis modi delectus assumenda fuga nostrum laudantium,
              quibusdam sequi sed animi!
            </p>
            <span>12:30 AM</span>
          </div>
        </div>
        <div className="message ">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              aspernatur odit? Pariatur neque quidem beatae minima culpa impedit
              inventore nobis modi delectus assumenda fuga nostrum laudantium,
              quibusdam sequi sed animi!
            </p>
            <span>12:30 AM</span>
          </div>
        </div>
        <div className="message own ">
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
        </div>
        <div ref={endRef} />
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a Message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
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
        <button className="send__button">Send</button>
      </div>
    </aside>
  );
}
