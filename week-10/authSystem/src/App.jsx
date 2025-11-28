import AuthSystem from "./components/AuthSystem";
import "./Auth.css";
import { useState } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    loginStatus: false,
  });

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      <AuthSystem />
    </AuthContext.Provider>
  );
}

export default App;
