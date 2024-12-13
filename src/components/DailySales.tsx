import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../theme/colors';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

const hourlyData = [
  { hour: '6AM', sales: 1200 },
  { hour: '8AM', sales: 2100 },
  { hour: '10AM', sales: 3000 },
  { hour: '12PM', sales: 2800 },
  { hour: '2PM', sales: 3500 },
  { hour: '4PM', sales: 4200 },
  { hour: '6PM', sales: 3800 },
];

const DailySales: React.FC<DailySalesProps> = ({ lang }) => {
  const t = translations[lang];
  
  const sales = [
    { id: 1, item: t.pottery, quantity: 5, amount: 2500 },
    { id: 2, item: t.pashmina, quantity: 3, amount: 4500 },
    { id: 3, item: t.thangka, quantity: 1, amount: 5500 },
  ];

  const total = sales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.header}>
        <span style={styles.icon}>💰</span>
        <h2 style={styles.title}>{t.title}</h2>
      </div>

      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={hourlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="hour" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text.secondary, fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text.secondary, fontSize: 12 }}
              tickFormatter={(value) => `रू${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => [`रू ${value}`, 'Sales']}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke={colors.primary}
              fill="url(#salesGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.salesList}>
        {sales.map(sale => (
          <motion.div
            key={sale.id}
            style={styles.saleItem}
            whileHover={{ x: 5 }}
          >
            <div style={styles.itemInfo}>
              <span style={styles.itemDot}>•</span>
              <span style={styles.itemName}>{sale.item}</span>
              <span style={styles.quantity}>x{sale.quantity}</span>
            </div>
            <span style={styles.amount}>रू {sale.amount}</span>
          </motion.div>
        ))}
      </div>

      <div style={styles.total}>
        <span>{t.total}</span>
        <span>रू {total}</span>
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
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  icon: {
    fontSize: '1.5rem',
  },
  title: {
    color: colors.primary,
    margin: 0,
    fontSize: '1.25rem',
  },
  chartContainer: {
    marginBottom: '1.5rem',
    padding: '1rem 0',
  },
  salesList: {
    display: 'flex',
    flexDirection: 'column' as const,
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
    transition: 'all 0.2s ease',
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