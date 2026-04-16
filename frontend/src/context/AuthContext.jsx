/**
 * AuthContext.jsx
 * 
 * Global authentication context
 * Stores: user data, JWT token, login/logout functions
 * Used across entire app for auth state
 * 
 * Usage:
 *   const { user, token, login, logout } = useContext(AuthContext);
 */

import { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = {
    user,
    setUser,
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
