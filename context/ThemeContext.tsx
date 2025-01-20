"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  theme: "dark" | "light";
  setTheme: Dispatch<SetStateAction<"dark" | "light">>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    console.log(theme);
    if (theme === "dark") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme };
export default ThemeProvider;
