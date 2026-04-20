import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  // On app load, fetch user data if token exists
  useEffect(() => {
    if(token) {
      fetchUserProfile();
    } else {
      setLoading(false)
    } 
  }, [token]);
  
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }
      })

      if(response.ok) {
        const userData = await response.json()
        setUser(userData);
      } else {
        localStorage.removeItem('accessToken'); //Token invalid clear it
        setToken(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false)
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setToken(null);
  };

  const updateUser = (updateData) => {
    setUser({...user, ...updateData})
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        logout,
        updateUser,
        fetchUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
