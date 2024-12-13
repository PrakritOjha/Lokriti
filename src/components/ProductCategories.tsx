import React from 'react';
import { colors } from '../theme/colors';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ProductCategoriesProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

const ProductCategories = ({ categories, onCategoryClick }: ProductCategoriesProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {categories.map(category => (
          <div 
            key={category.id} 
            onClick={() => onCategoryClick(category.id)}
            style={styles.card}
          >
            <span style={styles.icon}>{category.icon}</span>
            <h3 style={styles.name}>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    border: '1px solid #eee',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      borderColor: colors.primary,
      backgroundColor: colors.background,
    }
  },
  icon: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '0.75rem',
  },
  name: {
    margin: 0,
    fontSize: '1.1rem',
    color: colors.text.primary,
    fontWeight: '500',
  }
} as const;

export default ProductCategories; 