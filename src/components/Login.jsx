import { useState } from "react";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    localStorage.setItem("user", name);
    setUser(name); // ✅ THIS IS IMPORTANT
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome 👋</h2>
        <p>Login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;