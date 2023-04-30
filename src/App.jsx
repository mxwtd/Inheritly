import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';

const App = () => {
  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');

    const handleThemeToggle = () => {
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    };

    themeToggleBtn.addEventListener('click', handleThemeToggle);

    // Clean up the event listener when the component unmounts
    return () => {
      themeToggleBtn.removeEventListener('click', handleThemeToggle);
    };
  }, []);

  return (
    <>
      <Navbar />
      <p className="text-4xl bg-stone-300 text-black dark:bg-gray-800 dark:text-white flex justify-center align-middle m-52 p-5">
        Hola Amigo
        Qué Mas Nea
      </p>
    </>
  );
};

export default App;
