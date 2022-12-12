import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (registredUser) => {
      setCurrentUser(registredUser);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
