import { createContext, useEffect, useState } from "react";
import { getFromApi, logoutUser } from "../Services/LoginService";
import { useNavigate } from 'react-router-dom'

//create the context
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // ✅ initially true
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {      
        const { data, error } = await getFromApi("status");

        if (data) {
          setUser(data);
          setIsAuthenticated(true); //  set auth
          // console.log("get from api call returned:" + user); //  log fresh data
        } else {
          setUser(null);
          setIsAuthenticated(false); //  not authenticated
          console.log(error)
        }
        setLoading(false); //  done loading      
    };

    fetchUser();
  }, []);
  
  const handleLogout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  const value = {
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    handleLogout
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
