import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../theme/colors';

interface NavbarProps {
  lang: 'en' | 'np';
  onLanguageToggle: () => void;
}

const translations = {
  en: {
    dashboard: "Dashboard",
    inventory: "Inventory",
    sales: "Sales",
    reports: "Reports"
  },
  np: {
    dashboard: "ड्यासबोर्ड",
    inventory: "सामान",
    sales: "बिक्री",
    reports: "रिपोर्ट"
  }
};

const Navbar: React.FC<NavbarProps> = ({ lang, onLanguageToggle }) => {
  const location = useLocation();
  const t = translations[lang];

  return (
    <nav style={styles.nav}>
      <div style={styles.content}>
        <div style={styles.leftSection}>
          <div style={styles.logo}>Lokriti</div>
          <div style={styles.links}>
            <Link 
              to="/dashboard" 
              style={{
                ...styles.link,
                ...(location.pathname === '/dashboard' ? styles.activeLink : {})
              }}
            >
              {t.dashboard}
            </Link>
            <Link 
              to="/inventory" 
              style={{
                ...styles.link,
                ...(location.pathname === '/inventory' ? styles.activeLink : {})
              }}
            >
              {t.inventory}
            </Link>
            <Link 
              to="/sales" 
              style={{
                ...styles.link,
                ...(location.pathname === '/sales' ? styles.activeLink : {})
              }}
            >
              {t.sales}
            </Link>
            <Link 
              to="/reports" 
              style={{
                ...styles.link,
                ...(location.pathname === '/reports' ? styles.activeLink : {})
              }}
            >
              {t.reports}
            </Link>
          </div>
        </div>
        <button 
          onClick={onLanguageToggle} 
          style={styles.langToggle}
        >
          {lang === 'en' ? 'नेपाली' : 'English'}
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: colors.primary,
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: colors.text.primary,
    fontWeight: 500,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
  },
  activeLink: {
    backgroundColor: `${colors.primary}10`,
    color: colors.primary,
  },
  langToggle: {
    padding: '0.5rem 1rem',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: colors.accent,
    }
  },
} as const;

export default Navbar; 