import React from 'react';
import { colors } from '../theme/colors';

interface Product {
  name: { en: string; np: string };
  price: number;
  stock: number;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: string;
  products: Product[];
  lang: 'en' | 'np';
}

const translations = {
  en: {
    price: "Price",
    stock: "Stock",
    close: "Close"
  },
  np: {
    price: "मूल्य",
    stock: "स्टक",
    close: "बन्द"
  }
};

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, title, icon, products, lang }) => {
  const t = translations[lang];

  const getStockColor = (stock: number) => {
    return stock < 20 ? colors.alert : '#039855';
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.titleGroup}>
            <span style={styles.icon}>{icon}</span>
            <h2 style={styles.title}>{title}</h2>
          </div>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        <div style={styles.content}>
          {products.map((product, index) => (
            <div key={index} style={styles.productCard}>
              <h3 style={styles.productName}>{product.name[lang]}</h3>
              <div style={styles.productDetails}>
                <div style={styles.detail}>
                  <span style={styles.label}>{t.price}:</span>
                  <span style={styles.value}>रू {product.price.toLocaleString()}</span>
                </div>
                <div style={styles.detail}>
                  <span style={styles.label}>{t.stock}:</span>
                  <span style={{
                    ...styles.value,
                    color: getStockColor(product.stock)
                  }}>{product.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.footer}>
          <button onClick={onClose} style={styles.button}>{t.close}</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    color: colors.text.primary,
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: colors.text.secondary,
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
    ':hover': {
      color: colors.text.primary,
    }
  },
  content: {
    padding: '1.5rem',
    maxHeight: 'calc(90vh - 200px)',
    overflowY: 'auto' as const,
  },
  productCard: {
    backgroundColor: colors.background,
    borderRadius: '8px',
    padding: '1.25rem',
    marginBottom: '1rem',
    border: '1px solid #eee',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderColor: colors.primary,
    }
  },
  productName: {
    margin: '0 0 1rem 0',
    fontSize: '1.25rem',
    color: colors.text.primary,
  },
  productDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  label: {
    fontSize: '0.875rem',
    color: colors.text.secondary,
  },
  value: {
    fontSize: '1.125rem',
    color: colors.text.primary,
    fontWeight: '500',
  },
  footer: {
    padding: '1.25rem',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    padding: '0.75rem 2rem',
    backgroundColor: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: colors.accent,
    }
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  icon: {
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3rem',
    height: '3rem',
    backgroundColor: colors.background,
    borderRadius: '12px',
    padding: '0.5rem',
  },
} as const;

export default CategoryModal; 