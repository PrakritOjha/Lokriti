import React from 'react';
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

  return (
    <div style={styles.grid}>
      {stats.map((stat, index) => (
        <div key={index} style={styles.card}>
          <h3 style={styles.label}>{stat.label}</h3>
          <p style={styles.value}>{formatValue(stat)}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }
  },
  label: {
    margin: '0 0 0.5rem 0',
    color: colors.text.secondary,
    fontSize: '0.875rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  value: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: colors.primary,
  }
} as const;

export default StatsGrid; 