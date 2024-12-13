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

  const getLanguageButton = () => {
    if (lang === 'en') {
      return (
        <>
          🇳🇵 नेपाली
        </>
      );
    }
    return (
      <>
        🇬🇧 English
      </>
    );
  };

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
          {getLanguageButton()}
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '1rem',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
    width: '100%',
  },
  content: {
    width: '90%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '2400px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: colors.primary,
    textDecoration: 'none',
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
    backgroundColor: `${colors.primary}15`,
    color: colors.primary,
  },
  langToggle: {
    padding: '0.5rem 1.25rem',
    backgroundColor: `${colors.primary}15`,
    color: colors.primary,
    border: '1px solid ${colors.primary}30',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: colors.primary,
      color: 'white',
    }
  },
} as const;

export default Navbar; 