import { ReactNode } from "react";

import ThemeProvider from "./ThemeContext";

const ContextContainer = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};
export default ContextContainer;
