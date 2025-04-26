import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  _id: string;
  username: string;
  role: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for existing auth data
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (userData: any) => {
    try {
        setLoading(true);
        setError(null);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    } catch (err) {
        setError('Failed to store user data. Please try again.');
        throw err;
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    try {
        setLoading(true);
        setError(null);
        // Clear user data from localStorage
        localStorage.removeItem('user');
        setUser(null);
    } catch (err) {
        setError('Failed to clear user data. Please try again.');
        throw err;
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 