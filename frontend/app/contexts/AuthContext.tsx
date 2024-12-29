'use client';
// app/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../auth';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  toggleLogin: () => void;
  toggleRegister: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  isLoginOpen: false,
  isRegisterOpen: false,
  toggleLogin: () => {},
  toggleRegister: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
  const toggleRegister = () => setIsRegisterOpen(!isRegisterOpen);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user?.emailVerified, 
      isLoading,
      isLoginOpen,
      isRegisterOpen,
      toggleLogin,
      toggleRegister
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
