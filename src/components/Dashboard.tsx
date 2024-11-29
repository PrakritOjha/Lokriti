import React, { useState } from 'react';
import { colors } from '../theme/colors';
import StatsGrid from './StatsGrid';
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
    <div style={styles.container}>
      <StatsGrid 
        stats={[
          { label: t.todaySales, value: 'रू 12,500' },
          { label: t.lowStock, value: '5' },
          { label: t.totalProducts, value: '156' }
        ]} 
      />
      
      <h1 style={styles.mainTitle}>{t.mainProducts}</h1>
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

      <div style={styles.gridContainer}>
        <StockAlerts lang={lang} />
        <DailySales lang={lang} />
      </div>

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
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: colors.background,
    minHeight: '100vh',
  },
  mainTitle: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: colors.primary,
    marginBottom: '1.5rem',
    marginTop: '2rem',
  },
  categoriesWrapper: {
    cursor: 'pointer',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  }
} as const;

export default Dashboard; 