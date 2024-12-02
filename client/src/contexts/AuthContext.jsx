import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage({ role: '', files: [], order: {} }, 'user');

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
