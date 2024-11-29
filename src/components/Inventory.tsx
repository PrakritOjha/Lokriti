import React, { useState } from 'react';
import { colors } from '../theme/colors';

interface InventoryProps {
  lang: 'en' | 'np';
}

const translations = {
  en: {
    title: "Inventory Management",
    search: "Search products...",
    totalItems: "Total Items",
    lowStock: "Low Stock Items",
    categories: "Categories",
    value: "Total Value",
    addProduct: "Add Product",
    filter: "Filter",
    name: "Product Name",
    category: "Category",
    stock: "Stock",
    price: "Price",
    status: "Status",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    all: "All",
    inStock: "In Stock",
    lowStockLabel: "Low Stock",
    outOfStock: "Out of Stock",
    sn: "S.N."
  },
  np: {
    title: "सामान व्यवस्थापन",
    search: "सामान खोज्नुहोस्...",
    totalItems: "जम्मा सामान",
    lowStock: "न्यून स्टक",
    categories: "श्रेणीहरू",
    value: "कुल मूल्य",
    addProduct: "सामान थप्नुहोस्",
    filter: "फिल्टर",
    name: "सामानको नाम",
    category: "श्रेणी",
    stock: "स्टक",
    price: "मूल्य",
    status: "स्थिति",
    actions: "कार्यहरू",
    edit: "सम्पादन",
    delete: "मेटाउनुहोस्",
    all: "सबै",
    inStock: "स्टकमा",
    lowStockLabel: "न्यून स्टक",
    outOfStock: "स्टक सकियो",
    sn: "क्र.सं."
  }
};

const products = [
  { id: 1, name: { en: "Pashmina Shawl", np: "पश्मिना शल" }, category: { en: "Textiles", np: "कपडा" }, stock: 25, price: 2500, status: "In Stock" },
  { id: 2, name: { en: "Clay Pot", np: "माटोको भाँडो" }, category: { en: "Pottery", np: "माटोको भाँडा" }, stock: 40, price: 800, status: "In Stock" },
  { id: 3, name: { en: "Wooden Buddha", np: "काठको बुद्ध" }, category: { en: "Sculptures", np: "मूर्ति" }, stock: 5, price: 4500, status: "Low Stock" },
  { id: 4, name: { en: "Thangka Painting", np: "थाङ्का" }, category: { en: "Art", np: "कला" }, stock: 10, price: 15000, status: "In Stock" },
  { id: 5, name: { en: "Dhaka Topi", np: "ढाका टोपी" }, category: { en: "Accessories", np: "एसेसरीज" }, stock: 3, price: 1200, status: "Low Stock" },
  { id: 6, name: { en: "Singing Bowl", np: "गाइने बाटा" }, category: { en: "Crafts", np: "हस्तकला" }, stock: 15, price: 3500, status: "In Stock" },
  { id: 7, name: { en: "Mithila Painting", np: "मिथिला चित्र" }, category: { en: "Art", np: "कला" }, stock: 8, price: 8500, status: "In Stock" },
  { id: 8, name: { en: "Bamboo Basket", np: "बाँसको डोको" }, category: { en: "Crafts", np: "हस्तकला" }, stock: 4, price: 1500, status: "Low Stock" },
  { id: 9, name: { en: "Dhaka Scarf", np: "ढाका मफलर" }, category: { en: "Textiles", np: "कपडा" }, stock: 20, price: 800, status: "In Stock" },
  { id: 10, name: { en: "Bronze Buddha", np: "कांस्य बुद्ध" }, category: { en: "Sculptures", np: "मूर्ति" }, stock: 6, price: 12000, status: "In Stock" },
  { id: 11, name: { en: "Decorative Vase", np: "सजावटी भाँडो" }, category: { en: "Pottery", np: "माटोको भाँडा" }, stock: 15, price: 1800, status: "In Stock" },
  { id: 12, name: { en: "Clay Lamp Set", np: "माटोको दियो सेट" }, category: { en: "Pottery", np: "माटोको भाँडा" }, stock: 30, price: 600, status: "In Stock" },
  { id: 13, name: { en: "Dhaka Fabric Roll", np: "ढाका कपडा" }, category: { en: "Textiles", np: "कपडा" }, stock: 12, price: 3500, status: "In Stock" },
  { id: 14, name: { en: "Mandala Art", np: "मण्डला कला" }, category: { en: "Art", np: "कला" }, stock: 7, price: 5500, status: "In Stock" }
];

const Inventory: React.FC<InventoryProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : product.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockCount = products.filter(p => p.status === "Low Stock").length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{t.title}</h1>
        <button style={styles.addButton}>{t.addProduct}</button>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>{t.totalItems}</h3>
          <p>{products.length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>{t.lowStock}</h3>
          <p style={{ color: colors.alert }}>{lowStockCount}</p>
        </div>
        <div style={styles.statCard}>
          <h3>{t.categories}</h3>
          <p>8</p>
        </div>
        <div style={styles.statCard}>
          <h3>{t.value}</h3>
          <p>रू {totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">{t.all}</option>
          <option value="in stock">{t.inStock}</option>
          <option value="low stock">{t.lowStockLabel}</option>
          <option value="out of stock">{t.outOfStock}</option>
        </select>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.snColumn}>{t.sn}</th>
              <th>{t.name}</th>
              <th>{t.category}</th>
              <th>{t.stock}</th>
              <th>{t.price}</th>
              <th>{t.status}</th>
              <th>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td style={styles.snColumn}>{index + 1}</td>
                <td>{product.name[lang]}</td>
                <td>{product.category[lang]}</td>
                <td>{product.stock}</td>
                <td>रू {product.price.toLocaleString()}</td>
                <td>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: product.status === "In Stock" ? '#4CAF50' : '#FF9800',
                    color: '#fff'
                  }}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div style={styles.actions}>
                    <button style={styles.actionButton}>
                      {t.edit}
                    </button>
                    <button style={{
                      ...styles.actionButton,
                      borderColor: colors.alert,
                      color: colors.alert,
                      '&:hover': {
                        backgroundColor: `${colors.alert}10`,
                        borderColor: colors.alert,
                        color: colors.alert,
                      }
                    }}>
                      {t.delete}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    margin: 0,
    color: colors.text.primary,
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: colors.accent,
    }
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: colors.background,
    padding: '1.5rem',
    borderRadius: '8px',
    '& h3': {
      margin: '0 0 0.5rem 0',
      color: colors.text.secondary,
      fontSize: '1rem',
    },
    '& p': {
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: colors.primary,
    }
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1px solid #eee',
    borderRadius: '8px',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    backgroundColor: '#fff',
    ':focus': {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}15`,
    }
  },
  filterSelect: {
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    border: '1px solid #eee',
    borderRadius: '8px',
    fontSize: '0.95rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1.25rem',
    transition: 'all 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}15`,
    }
  },
  tableContainer: {
    overflowX: 'auto' as const,
    overflowY: 'auto' as const,
    borderRadius: '8px',
    border: '1px solid #eee',
    maxHeight: '600px',
    '& thead': {
      position: 'sticky' as const,
      top: 0,
      zIndex: 1,
      '& th': {
        backgroundColor: colors.background,
      }
    }
  },
  table: {
    width: '100%',
    borderCollapse: 'separate' as const,
    borderSpacing: '0 1rem',
    '& th, & td': {
      padding: '1.25rem 1rem',
      textAlign: 'left' as const,
      fontSize: '0.95rem',
      backgroundColor: '#fff',
    },
    '& th': {
      backgroundColor: colors.background,
      fontWeight: '600',
      color: colors.text.primary,
      textTransform: 'uppercase' as const,
      fontSize: '0.85rem',
      letterSpacing: '0.05em',
      borderBottom: '2px solid #eee',
      whiteSpace: 'nowrap' as const,
    },
    '& tbody tr': {
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      borderRadius: '8px',
      position: 'relative' as const,
    },
    '& tbody td': {
      borderTop: '1px solid #eee',
      borderBottom: '1px solid #eee',
    },
    '& tbody td:first-child': {
      borderLeft: '1px solid #eee',
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '& tbody td:last-child': {
      borderRight: '1px solid #eee',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
    '& tr:hover td': {
      backgroundColor: `${colors.primary}05`,
    }
  },
  statusBadge: {
    padding: '0.4rem 1rem',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'inline-block',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: '0.4rem 0.75rem',
    backgroundColor: 'transparent',
    color: colors.text.primary,
    border: '1px solid #eee',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: colors.background,
      borderColor: colors.primary,
      color: colors.primary,
    }
  },
  snColumn: {
    width: '60px',
    textAlign: 'center' as const,
  },
} as const;

export default Inventory; 