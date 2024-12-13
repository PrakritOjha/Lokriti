import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'np';
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <motion.div 
        style={styles.modalContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{t.addProduct}</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              {t.name} (English)
              <input type="text" style={styles.input} />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              {t.name} (नेपाली)
              <input type="text" style={styles.input} />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              {t.category}
              <select style={styles.select}>
                <option value="pottery">Pottery</option>
                <option value="textiles">Textiles</option>
                <option value="art">Art</option>
              </select>
            </label>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                {t.price}
                <input type="number" style={styles.input} />
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                {t.stock}
                <input type="number" style={styles.input} />
              </label>
            </div>
          </div>
        </div>
        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
          <button style={styles.saveButton}>Save Product</button>
        </div>
      </motion.div>
    </div>
  );
};

const Inventory: React.FC<InventoryProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : product.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockCount = products.filter(p => p.status === "Low Stock").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return '#10B981';
      case "Low Stock": return '#F59E0B';
      case "Out of Stock": return '#EF4444';
      default: return colors.text.secondary;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>{t.title}</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            style={styles.addButton}
          >
            {t.addProduct}
          </button>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>📦</span>
            <div style={styles.statInfo}>
              <h3 style={styles.statLabel}>{t.totalItems}</h3>
              <p style={styles.statValue}>{products.length}</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <span style={styles.statIcon}>⚠️</span>
            <div style={styles.statInfo}>
              <h3 style={styles.statLabel}>{t.lowStock}</h3>
              <p style={{...styles.statValue, color: '#F59E0B'}}>{lowStockCount}</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <span style={styles.statIcon}>📊</span>
            <div style={styles.statInfo}>
              <h3 style={styles.statLabel}>{t.value}</h3>
              <p style={styles.statValue}>रू {totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
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
              <th style={styles.th}>{t.sn}</th>
              <th style={styles.th}>{t.name}</th>
              <th style={styles.th}>{t.category}</th>
              <th style={styles.th}>{t.stock}</th>
              <th style={styles.th}>{t.price}</th>
              <th style={styles.th}>{t.status}</th>
              <th style={styles.th}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id} style={styles.tr}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{product.name[lang]}</td>
                <td style={styles.td}>{product.category[lang]}</td>
                <td style={styles.td}>{product.stock}</td>
                <td style={styles.td}>रू {product.price.toLocaleString()}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: `${getStatusColor(product.status)}15`,
                    color: getStatusColor(product.status)
                  }}>
                    {product.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.actionButton}>
                      {t.edit}
                    </button>
                    <button style={{
                      ...styles.actionButton,
                      borderColor: '#EF4444',
                      color: '#EF4444',
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

      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        lang={lang}
      />
    </div>
  );
};

const TABLE_ROW_HEIGHT = 60; // Height of each row
const HEADER_HEIGHT = 50; // Height of the header
const MAX_VISIBLE_ROWS = 7; // Maximum number of visible rows

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    marginBottom: '2rem',
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    margin: 0,
    color: colors.text.primary,
    fontSize: '1.75rem',
    fontWeight: '600',
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    backgroundColor: colors.background,
    padding: '1.5rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.3s ease',
  },
  statIcon: {
    fontSize: '1.5rem',
    width: '40px',
    height: '40px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    margin: '0 0 0.25rem 0',
    color: colors.text.secondary,
    fontSize: '0.875rem',
  },
  statValue: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  searchWrapper: {
    flex: 1,
    position: 'relative' as const,
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: colors.text.secondary,
    fontSize: '1rem',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    backgroundColor: colors.background,
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}15`,
    }
  },
  filterSelect: {
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '0.875rem',
    backgroundColor: colors.background,
    cursor: 'pointer',
    minWidth: '150px',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    maxHeight: `${(TABLE_ROW_HEIGHT * MAX_VISIBLE_ROWS) + HEADER_HEIGHT}px`,
    overflowY: 'auto',
    display: 'block',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const,
  },
  thead: {
    position: 'sticky' as const,
    top: 0,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    zIndex: 10,
    display: 'table',
    width: '100%',
  },
  tbody: {
    display: 'block',
    overflowY: 'auto',
    maxHeight: `${TABLE_ROW_HEIGHT * MAX_VISIBLE_ROWS}px`,
  },
  th: {
    padding: '1rem',
    fontWeight: 600,
    color: colors.text.secondary,
    backgroundColor: colors.background,
    height: `${HEADER_HEIGHT}px`,
  },
  tr: {
    borderBottom: '1px solid #eee',
    height: `${TABLE_ROW_HEIGHT}px`,
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: colors.background,
    },
  },
  td: {
    padding: '1rem',
    color: colors.text.primary,
    verticalAlign: 'middle' as const,
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    display: 'inline-block',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      borderColor: colors.primary,
      color: colors.primary,
    }
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
    color: colors.text.primary,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: colors.text.secondary,
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: colors.background,
    }
  },
  modalBody: {
    padding: '1.5rem',
  },
  modalFooter: {
    padding: '1.5rem',
    borderTop: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: colors.text.primary,
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}15`,
    }
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    backgroundColor: '#fff',
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}15`,
    }
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    backgroundColor: '#fff',
    color: colors.text.primary,
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.background,
    }
  },
  saveButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: colors.primary,
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.accent,
    }
  },
} as const;

export default Inventory;
