import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon , MoonIcon  } from '@heroicons/react/24/solid'

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="p-2">
      {darkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
