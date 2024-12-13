import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import { colors } from './theme/colors';
import SalesCharts from './components/SalesCharts';
import Reports from './components/Reports';

const translations = {
  en: {
    inventory: {
      title: "Inventory Management",
      totalItems: "Total Items",
      lowStock: "Low Stock",
      categories: "Categories",
      items: "items",
      stockValue: "Stock Value",
      productList: "Product List",
      name: "Name",
      category: "Category",
      stock: "Stock",
      price: "Price",
      status: "Status"
    },
    sales: {
      title: "Sales Overview",
      todaySales: "Today's Sales",
      weeklySales: "Weekly Sales",
      monthlySales: "Monthly Sales",
      revenue: "Revenue",
      transactions: "Transactions",
      averageOrder: "Average Order"
    },
    reports: {
      title: "Monthly Business Report",
      summary: "Executive Summary",
      performance: "Performance Metrics",
      insights: "Key Insights",
      recommendations: "Recommendations"
    }
  },
  np: {
    inventory: {
      title: "सामान व्यवस्थापन",
      totalItems: "जम्मा सामान",
      lowStock: "न्यून स्टक",
      categories: "श्रेणीहरू",
      items: "वस्तुहरू",
      stockValue: "स्टक मू्य",
      productList: "सामानको सूची",
      name: "नाम",
      category: "श्रेणी",
      stock: "स्टक",
      price: "मूल्य",
      status: "स्थिति"
    },
    sales: {
      title: "बिक्री विवरण",
      todaySales: "आजको बिक्री",
      weeklySales: "साप्ताहिक बिक्री",
      monthlySales: "मासिक बिक्री",
      revenue: "आम्दानी",
      transactions: "कारोबार",
      averageOrder: "औसत अर्डर"
    },
    reports: {
      title: "मासिक व्यवसाय प्रतिवेदन",
      summary: "कार्यकारी सारांश",
      performance: "कार्यसम्पादन मापदण्ड",
      insights: "मुख्य अन्तरदृष्टि",
      recommendations: "सिफारिसहरू"
    }
  }
};

const Sales = ({ lang }: { lang: 'en' | 'np' }) => {
  const t = translations[lang].sales;
  
  return (
    <div style={styles.page}>
      <h1>{t.title}</h1>
      <div style={styles.dummyContent}>
        <div style={styles.card}>
          <h3>{t.todaySales}</h3>
          <p>रू 12,500</p>
        </div>
        <div style={styles.card}>
          <h3>{t.weeklySales}</h3>
          <p>रू 82,500</p>
        </div>
        <div style={styles.card}>
          <h3>{t.monthlySales}</h3>
          <p>रू 325,000</p>
        </div>
      </div>
      
      <SalesCharts lang={lang} />
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState<'en' | 'np'>('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'np' : 'en');
  };

  return (
    <BrowserRouter>
      <div style={styles.app}>
        <Navbar lang={lang} onLanguageToggle={toggleLanguage} />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard lang={lang} />} />
            <Route path="/inventory" element={<Inventory lang={lang} />} />
            <Route path="/sales" element={<Sales lang={lang} />} />
            <Route path="/reports" element={<Reports lang={lang} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
  },
  main: {
    width: '90%',
    maxWidth: '2400px',
  },
  page: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  dummyContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: colors.background,
    padding: '1.5rem',
    borderRadius: '8px',
    '& h3': {
      margin: '0 0 1rem 0',
      color: colors.text.primary,
    },
    '& p': {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: colors.primary,
    }
  }
} as const;

export default App; 