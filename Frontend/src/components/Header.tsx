import { useState, useEffect } from "react";
import Button from "./Button/Button";
import Navbar from "./Navbar";

function Header() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" || 
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="bg-white dark:bg-gray-800 p-4 flex items-center justify-between">
      <h1>NoteNest</h1>
      <Navbar />
      <Button text={isDark ? "Light Mode" : "Dark Mode"} onClick={() => setIsDark(!isDark)} />
    </header>
  );
}

export default Header;
