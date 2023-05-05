import { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../FireBaseChat";
import { onAuthStateChanged } from "firebase/auth";

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
