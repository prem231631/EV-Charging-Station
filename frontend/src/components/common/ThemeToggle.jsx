import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/themeToggle.css";
function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
                theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            }
        >
            {theme === "light" ? (
                <FiMoon />
            ) : (
                <FiSun />
            )}
        </button>
    );
}

export default ThemeToggle;