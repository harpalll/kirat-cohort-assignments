import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const handleLogin = () => {
    console.log(username);

    setAuthState({
      username,
      isLoggedIn: true,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
