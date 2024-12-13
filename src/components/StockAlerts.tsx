import React from 'react';
import { motion } from 'framer-motion';
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
    criticalLevel: "Critical Level",
    restock: "Restock Soon",
    warning: "Warning",
  },
  np: {
    title: "स्टक अलर्ट",
    woodenStatue: "काठको मूर्ति",
    pashmina: "पाशमिना शल",
    clayPot: "माटोको गमला",
    criticalLevel: "क्रिटिकल लेभल",
    restock: "पुनः स्टक गर्नुहोस्",
    warning: "चेतावनी",
  }
};

const StockAlerts: React.FC<StockAlertsProps> = ({ lang }) => {
  const t = translations[lang];
  
  const alerts = [
    { id: 1, item: t.woodenStatue, current: 2, min: 5, status: 'critical' },
    { id: 2, item: t.pashmina, current: 3, min: 10, status: 'warning' },
    { id: 3, item: t.clayPot, current: 4, min: 15, status: 'warning' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'critical' ? '#FF4B4B' : '#FFB020';
  };

  const getStatusText = (status: string) => {
    return status === 'critical' ? t.criticalLevel : t.warning;
  };

  const getStockPercentage = (current: number, min: number) => {
    return (current / min) * 100;
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.header}>
        <div style={styles.titleGroup}>
          <span style={styles.icon}>⚠️</span>
          <h2 style={styles.title}>{t.title}</h2>
        </div>
        <motion.span 
          style={styles.badge}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {t.restock}
        </motion.span>
      </div>

      <div style={styles.alertList}>
        {alerts.map(alert => (
          <motion.div
            key={alert.id}
            style={styles.alertItem}
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={styles.alertContent}>
              <div style={styles.itemInfo}>
                <span style={{
                  ...styles.statusDot,
                  backgroundColor: getStatusColor(alert.status)
                }} />
                <div style={styles.itemDetails}>
                  <span style={styles.itemName}>{alert.item}</span>
                  <span style={{
                    ...styles.statusLabel,
                    color: getStatusColor(alert.status)
                  }}>
                    {getStatusText(alert.status)}
                  </span>
                </div>
              </div>
              <div style={styles.stockInfo}>
                <span style={styles.stockCount}>
                  {alert.current}/{alert.min}
                </span>
                <div style={styles.progressWrapper}>
                  <motion.div
                    style={{
                      ...styles.progressBar,
                      backgroundColor: getStatusColor(alert.status),
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getStockPercentage(alert.current, alert.min)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  icon: {
    fontSize: '1.5rem',
  },
  title: {
    color: colors.text.primary,
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: `${colors.primary}15`,
    color: colors.primary,
    padding: '0.5rem 1rem',
    borderRadius: '999px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  alertList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  alertItem: {
    backgroundColor: colors.background,
    borderRadius: '12px',
    padding: '1rem',
    transition: 'all 0.2s ease',
  },
  alertContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  itemName: {
    color: colors.text.primary,
    fontWeight: '500',
    fontSize: '1rem',
  },
  statusLabel: {
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  stockInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  stockCount: {
    color: colors.text.secondary,
    fontSize: '0.875rem',
    minWidth: '60px',
  },
  progressWrapper: {
    flex: 1,
    height: '6px',
    backgroundColor: '#E5E7EB',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '999px',
    transition: 'width 1s ease-in-out',
  },
} as const;

export default StockAlerts; 