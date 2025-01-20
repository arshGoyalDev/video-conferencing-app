// import { useState } from "react"

import { useTheme } from "@/context";

const ThemeToggle = () => {
  const theme = useTheme();
  // const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme?.theme === "dark") theme.setTheme("light");
    else theme?.setTheme("dark");
    // document.body.classList.add("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-9 bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 overflow-hidden"
    >
      <div
        className={`absolute ${
          theme?.theme === "dark" ? "left-1" : "left-12"
        } top-1/2 -translate-y-1/2 h-[24px] w-[24px] bg-neutral-900 dark:bg-neutral-100 rounded-md transition-all duration-300`}
      ></div>
    </button>
  );
};
export default ThemeToggle;
