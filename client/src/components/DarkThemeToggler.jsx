import { useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
export default function DarkThemeToggler() {
  const [isDark, setIsDark] = useState(false);

  function handleThemeChange() {
    const dark = document.querySelector("html")?.classList.contains("dark");
    if (dark) {
      document.querySelector("html")?.classList.remove("dark");
      document.querySelector("html")?.classList.add("light");
    } else {
      document.querySelector("html")?.classList.add("dark");
      document.querySelector("html")?.classList.remove("light");
    }

    setIsDark(!isDark);
  }

  return (
    <button onClick={handleThemeChange}>
      {isDark ? (
        <HiOutlineMoon className="text-brand-green text-2xl" />
      ) : (
        <HiOutlineSun className="text-brand-green text-2xl" />
      )}
    </button>
  );
}
