import { createContext, useEffect, useState } from "react";
import { getFromApi } from "../Services/LoginService";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect( () => {
    const fetchUser = async () => {
      const { data, error } = await getFromApi("status");
      if(data){
        setUser(data);
        console.log(user);
      }
      else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  },[]);

  const value = {
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
