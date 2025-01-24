import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // toast.
  };

  return (
    <section className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form action="">
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            upload Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" name="userName" placeholder="User Name" />
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>
    </section>
  );
}
