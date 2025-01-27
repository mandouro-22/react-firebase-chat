import { useEffect, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState();
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  console.log(img);

  // upload image cloudnary
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      localStorage.setItem("profileImage", data.secure_url);
      setImg(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { userName, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        userName,
        email,
        id: res.user?.uid,
        blocked: [],
        avatar: localStorage.getItem("profileImage") || img,
      });
      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });
      toast.success("Account created! You can login now!");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <section className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>{loading ? "Loading..." : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form action="" onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            upload Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleAvatar(e);
              uploadImage(e);
            }}
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
