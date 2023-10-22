import { useEffect, useState } from "react";

const useDark = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isDarkMode, setDarkMode] = useState<string | any>(
    () => localStorage.getItem("theme") === "dark"
  );
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
  useEffect(() => {
    const html = window.document.documentElement;
    const prev: string = isDarkMode ? "light" : "dark";
    html.classList.remove(prev);
    const next: string = isDarkMode ? "dark" : "light";
    html.classList.add(next);
    localStorage.setItem("theme", next);
  }, [isDarkMode]);
  return [isDarkMode, toggleDarkMode];
};

export default useDark;
