import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data in localStorage
    const storedUser = localStorage.getItem('veritasUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation. In a real app, this would call an API
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we're just checking if the user exists in our mock data
    // In a real application, this would be an actual API call to verify credentials
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: 'candidate',
    };
    
    setUser(mockUser);
    localStorage.setItem('veritasUser', JSON.stringify(mockUser));
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    // This is a mock implementation. In a real app, this would call an API
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we're just creating a new user in our mock data
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'candidate',
    };
    
    setUser(newUser);
    localStorage.setItem('veritasUser', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('veritasUser');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};