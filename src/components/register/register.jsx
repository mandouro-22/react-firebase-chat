import "./register.css";

export default function Register() {
  return (
    <section className="register">
      <form action="">
        <input type="text" name="userName" placeholder="User Name" id="" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src="./avatar.png" alt="" />
          <span>Jane Doe</span>
        </div>
        <button>Add User</button>
      </div>
    </section>
  );
}
