import { createContext, useEffect, useState } from "react";
import { getFromApi } from "../Services/LoginService";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // ✅ initially true
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await getFromApi("status");

      if (data) {
        setUser(data);
        setIsAuthenticated(true); //  set auth
        console.log(data); //  log fresh data
      } else {
        setUser(null);
        setIsAuthenticated(false); //  not authenticated
      }

      setLoading(false); //  done loading
    };

    fetchUser();
  }, []);

  const value = {
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
