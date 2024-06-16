import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/lib/appwrite";

export interface GlobalProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: any; 
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

const initialContext: GlobalProps = {
  isLogged: false,
  setIsLogged: () => {},
  user: null,
  setUser: () => {},
  loading: true,
};


const GlobalContext = createContext<GlobalProps>(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider component
const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res: any) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;