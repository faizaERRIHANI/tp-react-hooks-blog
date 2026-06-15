import React, { createContext, useContext, useMemo, useCallback, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('blog-theme', 'light');

  // Applique le thème sur le body pour couvrir toute la page
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    document.body.style.backgroundColor = theme === 'dark' ? '#1a1a2e' : '#ffffff';
    document.body.style.color = theme === 'dark' ? '#eeeeee' : '#222222';
    document.body.style.transition = 'all 0.3s ease';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être dans ThemeProvider');
  return ctx;
};

export default ThemeContext;
