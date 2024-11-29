import React from 'react';
import { colors } from '../theme/colors';

interface DailySalesProps {
  lang: 'en' | 'np';
}

const translations = {
  en: {
    title: "Today's Sales",
    total: "Total Sales",
    pottery: "Clay Pot",
    pashmina: "Pashmina",
    thangka: "Thangka",
  },
  np: {
    title: "आजको बिक्री",
    total: "कुल बिक्री",
    pottery: "माटोको भाँडा",
    pashmina: "पस्मिना",
    thangka: "थाङ्का",
  }
};

const DailySales: React.FC<DailySalesProps> = ({ lang }) => {
  const t = translations[lang];
  
  const sales = [
    { id: 1, item: t.pottery, quantity: 5, amount: 2500 },
    { id: 2, item: t.pashmina, quantity: 3, amount: 4500 },
    { id: 3, item: t.thangka, quantity: 1, amount: 5500 },
  ];

  const total = sales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.icon}>💰</span>
        <h2 style={styles.title}>{t.title}</h2>
      </div>
      <div style={styles.salesList}>
        {sales.map(sale => (
          <div key={sale.id} style={styles.saleItem}>
            <div style={styles.itemInfo}>
              <span style={styles.itemDot}>•</span>
              <span style={styles.itemName}>{sale.item}</span>
              <span style={styles.quantity}>x{sale.quantity}</span>
            </div>
            <span style={styles.amount}>रू {sale.amount}</span>
          </div>
        ))}
      </div>
      <div style={styles.total}>
        <span>{t.total}</span>
        <span>रू {total}</span>
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
    color: colors.primary,
    margin: 0,
    fontSize: '1.25rem',
  },
  salesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  saleItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: colors.background,
    borderRadius: '8px',
  },
  itemInfo: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  itemDot: {
    color: colors.primary,
    fontSize: '1.5rem',
    lineHeight: 1,
  },
  itemName: {
    color: colors.text.primary,
    fontWeight: 500,
  },
  quantity: {
    color: colors.text.secondary,
    fontSize: '0.875rem',
  },
  amount: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: `2px solid ${colors.background}`,
    fontWeight: 'bold',
    color: colors.primary,
  },
} as const;

export default DailySales; 