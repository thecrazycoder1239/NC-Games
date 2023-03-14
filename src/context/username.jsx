import { createContext } from "react";
import { useState } from "react";
import logo from "../assets/default.png";

export const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({
    username: "guest user",
    name: "guest",
    avatar_url: logo
  });

  return (
    <UsernameContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UsernameContext.Provider>
  );
};