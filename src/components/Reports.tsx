import React from 'react';
import { colors } from '../theme/colors';
import ReportCharts from './ReportCharts';

interface ReportsProps {
  lang: 'en' | 'np';
}

const translations = {
  en: {
    title: "Monthly Business Report",
    mainProducts: "Main Products",
    summary: "Performance Summary",
    topSelling: "Top Selling Products",
    lowSelling: "Low Performing Products",
    metrics: "Key Metrics",
    revenue: "Revenue",
    growth: "Growth",
    insights: "Insights",
    quantity: "Quantity",
    value: "Value",
    thisMonth: "This Month",
    lastMonth: "Last Month",
    change: "Change",
    frequentItems: "Frequently Sold Items",
    frequency: "Frequency",
    name: "Name"
  },
  np: {
    title: "मासिक व्यवसाय प्रतिवेदन",
    mainProducts: "मुख्य उत्पादनहरू",
    summary: "कार्यसम्पादन सारांश",
    topSelling: "उच्च बिक्री सामानहरू",
    lowSelling: "न्यून बिक्री सामानहरू",
    metrics: "मुख्य मापदण्डहरू",
    revenue: "आम्दानी",
    growth: "वृद्धि",
    insights: "अन्तरदृष्टि",
    quantity: "मात्रा",
    value: "मूल्य",
    thisMonth: "यो महिना",
    lastMonth: "गत महिना",
    change: "परिवर्तन",
    frequentItems: "बारम्बार बिक्री हुने सामानहरू",
    frequency: "आवृत्ति",
    name: "नाम"
  }
};

const topProducts = [
  { id: 1, name: { en: "Thangka Painting", np: "थाङ्का" }, quantity: 25, value: 375000, growth: 15 },
  { id: 2, name: { en: "Pashmina Shawl", np: "पश्मिना शल" }, quantity: 48, value: 120000, growth: 22 },
  { id: 3, name: { en: "Bronze Buddha", np: "कांस्य बुद्ध" }, quantity: 18, value: 216000, growth: 10 }
];

const lowProducts = [
  { id: 1, name: { en: "Clay Pot", np: "माटोको भाँडो" }, quantity: 5, value: 4000, growth: -15 },
  { id: 2, name: { en: "Bamboo Basket", np: "बाँसको डोको" }, quantity: 3, value: 4500, growth: -20 }
];

const frequentItems = [
  { id: 1, name: { en: "Dhaka Topi", np: "ढाका टोपी" }, frequency: 85, avgPerDay: 2.8 },
  { id: 2, name: { en: "Pashmina Shawl", np: "पश्मिना शल" }, frequency: 72, avgPerDay: 2.4 },
  { id: 3, name: { en: "Singing Bowl", np: "गाइने बाटा" }, frequency: 65, avgPerDay: 2.2 }
];

const Reports: React.FC<ReportsProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t.title}</h1>

      <div style={styles.frequencySection}>
        <h2>{t.frequentItems}</h2>
        <div style={styles.frequencyGrid}>
          {frequentItems.map(item => (
            <div key={item.id} style={styles.frequencyCard}>
              <div style={styles.frequencyHeader}>
                <h3>{item.name[lang]}</h3>
                <span style={styles.rank}>#{item.id}</span>
              </div>
              <div style={styles.frequencyStats}>
                <div>
                  <label>{t.frequency}</label>
                  <p>{item.frequency}</p>
                </div>
                <div style={styles.avgPerDay}>
                  <label>Avg/Day</label>
                  <p>{item.avgPerDay}</p>
                </div>
              </div>
              <div style={styles.trendIndicator}>
                <span style={styles.trendIcon}>↗</span>
                <span style={styles.trendText}>Trending</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ReportCharts lang={lang} />

      <div>
        <h1 style={styles.mainTitle}>{t.mainProducts}</h1>
        <div style={styles.productsGrid}>
          <div style={styles.productSection}>
            <h2 style={styles.sectionTitle}>{t.topSelling}</h2>
            <div style={styles.productCard}>
              <table>
                <thead>
                  <tr>
                    <th>{t.name}</th>
                    <th>{t.quantity}</th>
                    <th>{t.value}</th>
                    <th>{t.growth}</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.name[lang]}</td>
                      <td>{product.quantity}</td>
                      <td>रू {product.value.toLocaleString()}</td>
                      <td>
                        <span style={{
                          ...styles.growthBadge,
                          backgroundColor: product.growth > 0 ? '#E3FCF2' : '#FEE4E2',
                          color: product.growth > 0 ? '#039855' : '#D92D20'
                        }}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.productSection}>
            <h2 style={styles.sectionTitle}>{t.lowSelling}</h2>
            <div style={styles.productCard}>
              <table>
                <thead>
                  <tr>
                    <th>{t.name}</th>
                    <th>{t.quantity}</th>
                    <th>{t.value}</th>
                    <th>{t.growth}</th>
                  </tr>
                </thead>
                <tbody>
                  {lowProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.name[lang]}</td>
                      <td>{product.quantity}</td>
                      <td>रू {product.value.toLocaleString()}</td>
                      <td>
                        <span style={{
                          ...styles.growthBadge,
                          backgroundColor: '#FEE4E2',
                          color: '#D92D20'
                        }}>
                          {product.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 2rem 0',
    color: colors.text.primary,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  metricCard: {
    backgroundColor: colors.background,
    padding: '1.5rem',
    borderRadius: '8px',
    '& h3': {
      margin: '0 0 1rem 0',
      color: colors.text.primary,
      fontSize: '1.1rem',
    }
  },
  comparison: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    '& label': {
      fontSize: '0.875rem',
      color: colors.text.secondary,
      marginBottom: '0.5rem',
      display: 'block',
    },
    '& p': {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: colors.text.primary,
    }
  },
  change: {
    textAlign: 'right' as const,
  },
  section: {
    marginTop: '2.5rem',
    '& h2': {
      fontSize: '1.25rem',
      marginBottom: '1.5rem',
      color: colors.text.primary,
    }
  },
  table: {
    width: '100%',
    overflowX: 'auto' as const,
    '& table': {
      width: '100%',
      borderCollapse: 'separate' as const,
      borderSpacing: '0 0.5rem',
      '& th': {
        textAlign: 'left' as const,
        padding: '1rem',
        color: colors.text.secondary,
        fontWeight: '500',
        fontSize: '0.875rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
      },
      '& td': {
        padding: '1rem',
        backgroundColor: colors.background,
        '&:first-child': {
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
        '&:last-child': {
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
        }
      }
    }
  },
  growthBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'inline-block',
  },
  frequencySection: {
    marginBottom: '2.5rem',
  },
  frequencyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  frequencyCard: {
    backgroundColor: colors.background,
    padding: '1.5rem',
    borderRadius: '8px',
    position: 'relative' as const,
    border: '1px solid #eee',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }
  },
  frequencyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    '& h3': {
      margin: 0,
      fontSize: '1.1rem',
      color: colors.text.primary,
    }
  },
  rank: {
    backgroundColor: colors.primary,
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  frequencyStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
    '& label': {
      fontSize: '0.875rem',
      color: colors.text.secondary,
      marginBottom: '0.5rem',
      display: 'block',
    },
    '& p': {
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: colors.primary,
    }
  },
  trendIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#059669',
    fontSize: '0.875rem',
  },
  trendIcon: {
    fontSize: '1.25rem',
  },
  trendText: {
    fontWeight: '500',
  },
  avgPerDay: {
    textAlign: 'right' as const,
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '4rem',
    marginTop: '3rem',
    padding: '0 1rem',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '1px',
      height: '100%',
      backgroundColor: '#E5E7EB',
    }
  },
  productSection: {
    width: '100%',
  },
  productCard: {
    backgroundColor: colors.background,
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    '& table': {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 0.75rem',
      tableLayout: 'fixed' as const,
      '& th': {
        textAlign: 'left',
        padding: '1rem',
        color: colors.text.secondary,
        fontWeight: '500',
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        '&:nth-child(1)': { width: '35%' },
        '&:nth-child(2)': { width: '20%' },
        '&:nth-child(3)': { width: '25%' },
        '&:nth-child(4)': { width: '20%' },
      },
      '& td': {
        padding: '1rem',
        backgroundColor: '#fff',
        whiteSpace: 'nowrap' as const,
        '&:first-child': {
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
        '&:last-child': {
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
        },
        '&:nth-child(2)': { 
          textAlign: 'center' as const 
        },
        '&:nth-child(3)': { 
          textAlign: 'right' as const 
        }
      }
    }
  },
  mainTitle: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: '2rem',
    paddingLeft: '1rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
    color: colors.text.primary,
    paddingLeft: '0.5rem',
  },
} as const;

export default Reports; 