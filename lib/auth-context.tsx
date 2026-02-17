'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
    setLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    // Store user credentials (in production, use proper password hashing)
    users.push({
      email,
      password: password, // Note: In production, hash the password!
      ...newUser,
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const loggedInUser: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      createdAt: foundUser.createdAt,
    };

    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
