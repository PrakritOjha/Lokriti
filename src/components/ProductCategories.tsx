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

const ProductCategories: React.FC<ProductCategoriesProps> = ({ categories, onCategoryClick }) => {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => onCategoryClick(category.id)}
            style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid #eee',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{
              fontSize: '2.5rem',
              display: 'block',
              marginBottom: '0.75rem',
            }}>{category.icon}</span>
            <h3 style={{
              margin: 0,
              fontSize: '1.1rem',
              color: colors.text.primary,
              fontWeight: '500',
            }}>{category.name}</h3>
          </div>
        ))}
      </div>
      <style>
        {`
          .category-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            border-color: ${colors.primary};
            background-color: ${colors.background};
          }
        `}
      </style>
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
} as const;

export default ProductCategories; 