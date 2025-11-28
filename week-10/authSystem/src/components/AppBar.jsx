import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const AppBar = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  console.log(authState);

  const handleLogout = () => {
    setAuthState({
      username: "",
      isLoggedIn: false,
    });
  };
  return (
    <div>
      Auth System Demo
      {authState.isLoggedIn ? (
        <div>
          <p>Welcome, {authState.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button>Login</button>
        </div>
      )}
    </div>
  );
};
