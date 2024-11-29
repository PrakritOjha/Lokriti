import React from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { colors } from '../theme/colors';

interface ReportChartsProps {
  lang: 'en' | 'np';
}

const translations = {
  en: {
    salesByCategory: "Sales by Category",
    growthTrend: "Growth Trend",
    growth: "Growth",
    month: "Month",
    percentage: "Percentage"
  },
  np: {
    salesByCategory: "श्रेणी अनुसार बिक्री",
    growthTrend: "वृद्धि प्रवृत्ति",
    growth: "वृद्धि",
    month: "महिना",
    percentage: "प्रतिशत"
  }
};

const categoryData = {
  en: [
    { name: 'Textiles', value: 35 },
    { name: 'Pottery', value: 25 },
    { name: 'Sculptures', value: 20 },
    { name: 'Art', value: 15 },
    { name: 'Accessories', value: 5 }
  ],
  np: [
    { name: 'कपडा', value: 35 },
    { name: 'माटोको भाँडा', value: 25 },
    { name: 'मूर्ति', value: 20 },
    { name: 'कला', value: 15 },
    { name: 'एसेसरीज', value: 5 }
  ]
};

const monthsData = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  np: ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज']
};

const growthData = [
  { month: 0, growth: 5 },
  { month: 1, growth: 8 },
  { month: 2, growth: 12 },
  { month: 3, growth: 10 },
  { month: 4, growth: 15 },
  { month: 5, growth: 18 }
];

const COLORS = [
  colors.primary,
  colors.secondary,
  colors.accent,
  '#2ecc71',
  '#9b59b6'
];

const formatGrowthData = (data: typeof growthData, lang: 'en' | 'np') => {
  return data.map(item => ({
    ...item,
    month: monthsData[lang][item.month]
  }));
};

const ReportCharts: React.FC<ReportChartsProps> = ({ lang }) => {
  const t = translations[lang];
  const formattedGrowthData = formatGrowthData(growthData, lang);

  return (
    <div style={styles.chartsContainer}>
      {/* Category Distribution Chart */}
      <div style={styles.chart}>
        <h3>{t.salesByCategory}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData[lang]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData[lang].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Trend Chart */}
      <div style={styles.chart}>
        <h3>{t.growthTrend}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              label={{ 
                value: t.percentage, 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, t.growth]}
              labelFormatter={(label) => `${t.month}: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="growth" 
              stroke={colors.primary} 
              strokeWidth={2}
              dot={{ fill: colors.primary }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
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

export default ReportCharts; 