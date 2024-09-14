import { createContext, useEffect, useState } from "react";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUsersToLocalStorage,
  setUserToLocalStorage,
} from "../utils/authUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //const [users, setUsers] = useState([]);

  let usersArray = [];

  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const signIn = (userData) => {
    setUser(userData);
    setUserToLocalStorage(userData);
    return "Success";
  };

  const register = (userData) => {
    //setUsers(userData);
    usersArray.push(userData);
    console.log(usersArray);
    setUsersToLocalStorage(usersArray);

    return "Success";
  };

  const signOut = () => {
    setUser(null);
    removeUserFromLocalStorage();
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, usersArray, register, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
