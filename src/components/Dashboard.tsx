import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../theme/colors';
import ProductCategories from './ProductCategories';
import StockAlerts from './StockAlerts';
import DailySales from './DailySales';
import CategoryModal from './CategoryModal';

interface DashboardProps {
  lang: 'en' | 'np';
}

const translations = {
  en: {
    todaySales: "Today's Sales",
    lowStock: "Low Stock",
    totalProducts: "Total Products",
    categories: "Categories",
    pottery: "Pottery",
    textiles: "Textiles",
    handicrafts: "Arts",
    mainProducts: "Main Categories"
  },
  np: {
    todaySales: "आजको बिक्री",
    lowStock: "न्यून स्टक",
    totalProducts: "जम्मा सामान",
    categories: "श्रेणीहरू",
    pottery: "माटोको भाँडा",
    textiles: "कपडा",
    handicrafts: "कला",
    mainProducts: "मुख्य उत्पादनहरू"
  },
};

const categoryProducts = {
  pottery: [
    { name: { en: "Clay Pot", np: "माटोको भाँडो" }, price: 800, stock: 40 },
    { name: { en: "Decorative Vase", np: "सजावटी भाँडो" }, price: 1800, stock: 15 },
    { name: { en: "Clay Lamp Set", np: "माटोको दियो सेट" }, price: 600, stock: 30 }
  ],
  textiles: [
    { name: { en: "Pashmina Shawl", np: "पश्मिना शल" }, price: 2500, stock: 25 },
    { name: { en: "Dhaka Fabric Roll", np: "ढाका कपडा" }, price: 3500, stock: 12 },
    { name: { en: "Dhaka Scarf", np: "ढाका मफलर" }, price: 800, stock: 20 }
  ],
  arts: [
    { name: { en: "Thangka Painting", np: "थाङ्का" }, price: 15000, stock: 10 },
    { name: { en: "Mithila Painting", np: "मिथिला चित्र" }, price: 8500, stock: 8 },
    { name: { en: "Mandala Art", np: "मण्डला कला" }, price: 5500, stock: 7 }
  ]
};

const Dashboard: React.FC<DashboardProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const getCategoryProducts = (categoryId: string) => {
    switch (categoryId) {
      case '1': return categoryProducts.pottery;
      case '2': return categoryProducts.textiles;
      case '3': return categoryProducts.arts;
      default: return [];
    }
  };

  const getCategoryTitle = (categoryId: string) => {
    switch (categoryId) {
      case '1': return t.pottery;
      case '2': return t.textiles;
      case '3': return t.handicrafts;
      default: return '';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case '1': return '🏺';
      case '2': return '🧵';
      case '3': return '🎨';
      default: return '';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container}
    >
      <motion.div variants={itemVariants} style={styles.header}>
        <h1 style={styles.welcomeTitle}>Welcome Back!</h1>
        <p style={styles.subtitle}>Let's check your store's performance</p>
      </motion.div>

      <div style={styles.topGrid}>
        <motion.div variants={itemVariants} style={styles.alertsWrapper}>
          <StockAlerts lang={lang} />
        </motion.div>

        <motion.div variants={itemVariants} style={styles.salesWrapper}>
          <DailySales lang={lang} />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>{t.mainProducts}</h2>
        <div style={styles.categoriesWrapper}>
          <ProductCategories 
            categories={[
              { id: '1', name: t.pottery, icon: '🏺' },
              { id: '2', name: t.textiles, icon: '🧵' },
              { id: '3', name: t.handicrafts, icon: '🎨' }
            ]}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </motion.div>

      {selectedCategory && (
        <CategoryModal
          isOpen={true}
          onClose={handleCloseModal}
          title={getCategoryTitle(selectedCategory)}
          icon={getCategoryIcon(selectedCategory)}
          products={getCategoryProducts(selectedCategory)}
          lang={lang}
        />
      )}
    </motion.div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    backgroundColor: colors.background,
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  header: {
    marginBottom: '1.5rem',
  },
  welcomeTitle: {
    fontSize: '2.2rem',
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: colors.text.secondary,
  },
  topGrid: {
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    gap: '1.5rem',
    marginBottom: '2rem',
    width: '100%',
  },
  alertsWrapper: {
    backgroundColor: '#fff',
    padding: '1.75rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    height: '100%',
    minWidth: 0,
  },
  salesWrapper: {
    backgroundColor: '#fff',
    padding: '1.75rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    height: '100%',
    minWidth: 0,
  },
  categoriesSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: colors.primary,
  },
  categoriesWrapper: {
    backgroundColor: '#fff',
    padding: '1.75rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
} as const;

export default Dashboard; 