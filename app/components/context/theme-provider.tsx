"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: (_: string) => { },
});


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);