import React from 'react';
import {
  LineChart, Line, AreaChart, Area,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { colors } from '../theme/colors';

interface SalesChartsProps {
  lang: 'en' | 'np';
}

const translations = {
  en: {
    revenue: "Revenue",
    transactions: "Transactions",
    amount: "Amount",
    month: "Month",
    count: "Count"
  },
  np: {
    revenue: "आम्दानी",
    transactions: "कारोबार",
    amount: "रकम",
    month: "महिना",
    count: "संख्या"
  }
};

const monthsData = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  np: ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज']
};

const revenueData = [
  { month: 0, revenue: 250000, transactions: 145 },
  { month: 1, revenue: 285000, transactions: 168 },
  { month: 2, revenue: 325000, transactions: 192 },
  { month: 3, revenue: 315000, transactions: 188 },
  { month: 4, revenue: 358000, transactions: 205 },
  { month: 5, revenue: 402000, transactions: 232 }
];

const formatData = (data: typeof revenueData, lang: 'en' | 'np') => {
  return data.map(item => ({
    ...item,
    month: monthsData[lang][item.month]
  }));
};

const SalesCharts: React.FC<SalesChartsProps> = ({ lang }) => {
  const t = translations[lang];
  const formattedData = formatData(revenueData, lang);

  return (
    <div style={styles.chartsContainer}>
      {/* Revenue Chart */}
      <div style={styles.chart}>
        <h3>{t.revenue}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `रू ${value/1000}k`}
              label={{ 
                value: t.amount, 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`रू ${value}`, t.revenue]}
              labelFormatter={(label) => `${t.month}: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke={colors.primary} 
              fillOpacity={1}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions Chart */}
      <div style={styles.chart}>
        <h3>{t.transactions}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              label={{ 
                value: t.count, 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip 
              formatter={(value: number) => [value, t.transactions]}
              labelFormatter={(label) => `${t.month}: ${label}`}
            />
            <Bar 
              dataKey="transactions" 
              fill={colors.secondary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  chart: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '& h3': {
      marginBottom: '1rem',
      color: colors.text.primary,
    }
  }
} as const;

export default SalesCharts; 