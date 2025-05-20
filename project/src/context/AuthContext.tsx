import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Student } from '../types';
import { users, students } from '../data/mockData';

interface AuthContextType {
  currentUser: User | Student | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate authentication with our mock data
      setTimeout(() => {
        const user = [...users, ...students].find(user => user.email === email);
        
        if (user && password === 'password') { // Simple mock password check
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          setLoading(false);
          return true;
        } else {
          setError('Invalid email or password');
          setLoading(false);
          return false;
        }
      }, 1000);
      
      return true;
    } catch (err) {
      setError('Failed to login. Please try again.');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated: !!currentUser,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};