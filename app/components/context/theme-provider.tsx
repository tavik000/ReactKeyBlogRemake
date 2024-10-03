"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

type ThemeContextProviderProps = {
  children: ReactNode;
  inTheme: "light" | "dark";
};

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (_: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children, inTheme }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState(inTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
