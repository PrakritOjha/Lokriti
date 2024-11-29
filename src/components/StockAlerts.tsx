import React from 'react';
import { colors } from '../theme/colors';

interface StockAlertsProps {
  lang: 'en' | 'np';
}

const translations = {
  en: {
    title: "Stock Alerts",
    woodenStatue: "Wooden Statue",
    pashmina: "Pashmina Shawl",
    clayPot: "Clay Pot",
  },
  np: {
    title: "स्टक अलर्ट",
    woodenStatue: "काठको मूर्ति",
    pashmina: "पाशमिना शल",
    clayPot: "माटोको गमला",
  }
};

const StockAlerts: React.FC<StockAlertsProps> = ({ lang }) => {
  const t = translations[lang];
  
  const alerts = [
    { id: 1, item: t.woodenStatue, current: 2, min: 5 },
    { id: 2, item: t.pashmina, current: 3, min: 10 },
    { id: 3, item: t.clayPot, current: 4, min: 15 },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.icon}>⚠️</span>
        <h2 style={styles.title}>{t.title}</h2>
      </div>
      <div style={styles.alertList}>
        {alerts.map(alert => (
          <div key={alert.id} style={styles.alertItem}>
            <div style={styles.itemInfo}>
              <span style={styles.warningDot}>•</span>
              <span style={styles.itemName}>{alert.item}</span>
            </div>
            <span style={styles.stockCount}>
              {alert.current}/{alert.min}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '1.5rem',
  },
  title: {
    color: colors.alert,
    margin: 0,
    fontSize: '1.25rem',
  },
  alertList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  alertItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: `${colors.alert}10`,
    borderRadius: '8px',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  warningDot: {
    color: colors.alert,
    fontSize: '1.5rem',
    lineHeight: 1,
  },
  itemName: {
    color: colors.text.primary,
    fontWeight: 500,
  },
  stockCount: {
    color: colors.alert,
    fontWeight: 'bold',
  },
} as const;

export default StockAlerts; 