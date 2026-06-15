import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{
      padding: '6px 14px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      fontSize: '14px'
    }}>
      {theme === 'light' ? '🌙 Mode sombre' : '☀️ Mode clair'}
    </button>
  );
};

export default ThemeToggle;
