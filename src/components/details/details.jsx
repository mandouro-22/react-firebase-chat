import "./details.css";

export default function Details() {
  return (
    <aside className="details">
      <div className="user">
        <img src="./avatar.png" alt="avatar" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
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
        <button>Black Users</button>
        <button className="logout">Logout</button>
      </div>
    </aside>
  );
}
