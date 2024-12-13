import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../theme/colors';
import CountUp from 'react-countup';

interface Stat {
  label: string;
  value: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const formatValue = (stat: Stat) => {
    if (stat.label === "Today's Sales") {
      const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
      return (
        <span>
          रू <CountUp end={numericValue} duration={2} separator="," />
        </span>
      );
    }
    return stat.value;
  };

  const getIcon = (label: string) => {
    switch (label) {
      case "Today's Sales":
        return '💰';
      case "Low Stock":
        return '⚠️';
      case "Total Products":
        return '📦';
      default:
        return '📊';
    }
  };

  return (
    <div style={styles.grid}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          style={styles.card}
          whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div style={styles.cardContent}>
            <div style={styles.iconWrapper}>
              <span style={styles.icon}>{getIcon(stat.label)}</span>
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.label}>{stat.label}</h3>
              <p style={styles.value}>{formatValue(stat)}</p>
            </div>
          </div>
          <div style={styles.progressBar}>
            <motion.div
              style={{
                ...styles.progress,
                backgroundColor: colors.primary,
              }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    transition: 'all 0.3s ease',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: `${colors.primary}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '1.5rem',
  },
  statInfo: {
    flex: 1,
  },
  label: {
    margin: '0 0 0.25rem 0',
    color: colors.text.secondary,
    fontSize: '0.875rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  value: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  progressBar: {
    height: '4px',
    backgroundColor: `${colors.primary}15`,
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: '2px',
  }
} as const;

export default StatsGrid; 