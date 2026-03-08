<template>
  <div class="data-table">
    <!-- Table Header -->
    <div class="table-header" v-if="showHeader">
      <div class="results-count">
        Showing <strong>{{ data.length }}</strong> {{ resultLabel }}
      </div>
      <div class="table-actions">
        <slot name="header-actions"></slot>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table v-if="data.length > 0">
        <thead>
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              :class="{ 
                sortable: column.sortable,
                'text-center': column.align === 'center',
                'text-right': column.align === 'right'
              }"
              :style="{ minWidth: column.minWidth || 'auto', width: column.width || 'auto' }"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="th-content">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable" class="sort-icon">
                  <span v-if="sortBy === column.key">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else class="sort-placeholder">↕</span>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, index) in data" 
            :key="getRowKey(row, index)"
            :class="{ 
              clickable: rowClickable,
              selected: isRowSelected(row)
            }"
            @click="handleRowClick(row)"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              :class="{
                'text-center': column.align === 'center',
                'text-right': column.align === 'right'
              }"
            >
              <!-- Custom slot for column -->
              <slot 
                :name="`cell-${column.key}`" 
                :row="row" 
                :value="getNestedValue(row, column.key)"
                :column="column"
              >
                <!-- Image Preview -->
                <div v-if="column.type === 'image'" class="image-cell">
                  <img 
                    v-if="getNestedValue(row, column.key)"
                    :src="getImageUrl(getNestedValue(row, column.key), column)" 
                    :alt="column.label"
                    class="table-image-preview"
                    @click.stop="handleImageClick(getNestedValue(row, column.key), column, row)"
                  />
                  <span v-else class="no-image">No Image</span>
                </div>

                <!-- Status Badge -->
                <span 
                  v-else-if="column.type === 'status'"
                  class="status-badge" 
                  :class="`status-${getNestedValue(row, column.key)}`"
                >
                  {{ formatValue(getNestedValue(row, column.key), column) }}
                </span>

                <!-- Badge -->
                <span 
                  v-else-if="column.type === 'badge'"
                  class="badge"
                  :style="{ 
                    backgroundColor: column.badgeColor?.(getNestedValue(row, column.key)) 
                  }"
                >
                  {{ formatValue(getNestedValue(row, column.key), column) }}
                </span>

                <!-- Boolean -->
                <span v-else-if="column.type === 'boolean'">
                  {{ getNestedValue(row, column.key) ? '✓' : '✗' }}
                </span>

                <!-- Actions -->
                <div v-else-if="column.type === 'actions'" class="action-buttons">
                  <slot name="actions" :row="row">
                    <button 
                      v-for="action in actions" 
                      :key="action.name"
                      :class="['action-btn', action.class]"
                      @click.stop="handleAction(action.name, row)"
                      :disabled="action.disabled?.(row)"
                    >
                      {{ action.label }}
                    </button>
                  </slot>
                </div>

                <!-- Default text -->
                <span v-else>
                  {{ formatValue(getNestedValue(row, column.key), column) }}
                </span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- No Data State -->
      <div v-else class="no-results">
        <slot name="empty">
          <h3>{{ emptyTitle }}</h3>
          <p>{{ emptyMessage }}</p>
        </slot>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
          <div class="image-modal-container" @click.stop>
            <button class="image-modal-close" @click="closeImageModal">×</button>
            <img :src="currentImageUrl" alt="Preview" class="image-modal-preview" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  // Table data
  data: {
    type: Array,
    required: true
  },
  
  // Column definitions
  columns: {
    type: Array,
    required: true,
    validator: (columns) => {
      return columns.every(col => col.key && col.label);
    }
  },
  
  // Actions for the actions column
  actions: {
    type: Array,
    default: () => []
  },
  
  // Unique key field for rows
  rowKey: {
    type: String,
    default: 'id'
  },
  
  // Show table header with result count
  showHeader: {
    type: Boolean,
    default: true
  },
  
  // Result label (e.g., "results", "services", "users")
  resultLabel: {
    type: String,
    default: 'results'
  },
  
  // Empty state messages
  emptyTitle: {
    type: String,
    default: 'No data found'
  },
  
  emptyMessage: {
    type: String,
    default: 'Try adjusting your filters'
  },
  
  // Row click behavior
  rowClickable: {
    type: Boolean,
    default: false
  },
  
  // Selected rows (for highlighting)
  selectedRows: {
    type: Array,
    default: () => []
  },
  
  // Enable sorting
  sortable: {
    type: Boolean,
    default: true
  },
  
  // Initial sort
  initialSort: {
    type: Object,
    default: () => ({ by: '', order: 'asc' })
  },
  
  // Base URL for images (optional)
  imageBaseUrl: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['action', 'row-click', 'sort', 'image-click']);

// Sorting state
const sortBy = ref(props.initialSort.by);
const sortOrder = ref(props.initialSort.order);

// Image modal state
const showImageModal = ref(false);
const currentImageUrl = ref('');

// Get nested object value by path (e.g., "user.name")
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Get row key
const getRowKey = (row, index) => {
  return getNestedValue(row, props.rowKey) || index;
};

// Check if row is selected
const isRowSelected = (row) => {
  const rowKey = getNestedValue(row, props.rowKey);
  return props.selectedRows.some(selected => 
    getNestedValue(selected, props.rowKey) === rowKey
  );
};

// Get image URL
const getImageUrl = (value, column) => {
  if (!value) return '';
  
  // If custom image URL builder is provided
  if (column.imageUrlBuilder && typeof column.imageUrlBuilder === 'function') {
    return column.imageUrlBuilder(value);
  }
  
  // If it's already a full URL, return it
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }
  
  // Use column-specific base URL or global base URL
  const baseUrl = process.env.VUE_APP_BASE_URL || '';
  
  // Remove leading slash from value if baseUrl ends with slash
  const cleanValue = baseUrl.endsWith('/') && value.startsWith('/') ? value.slice(1) : value;
  
  return `${baseUrl}/${cleanValue}`;
};

// Handle image click
const handleImageClick = (value, column, row) => {
  currentImageUrl.value = getImageUrl(value, column);
  showImageModal.value = true;
  emit('image-click', { value, column, row, url: currentImageUrl.value });
};

// Close image modal
const closeImageModal = () => {
  showImageModal.value = false;
  currentImageUrl.value = '';
};

// Format value based on column type
const formatValue = (value, column) => {
  if (value === null || value === undefined) {
    return column.defaultValue || '-';
  }
  
  // Custom formatter function
  if (column.formatter) {
    return column.formatter(value);
  }
  
  // Built-in formatters
  switch (column.type) {
    case 'date':
      return new Date(value).toLocaleDateString();
    
    case 'datetime':
      return new Date(value).toLocaleString();
    
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: column.currency || 'USD'
      }).format(value);
    
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    
    case 'percentage':
      return `${value}%`;
    
    case 'status':
    case 'badge':
      return typeof value === 'string' 
        ? value.charAt(0).toUpperCase() + value.slice(1) 
        : value;
    
    default:
      return value;
  }
};

// Handle sorting
const handleSort = (columnKey) => {
  if (!props.sortable) return;
  
  if (sortBy.value === columnKey) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = columnKey;
    sortOrder.value = 'asc';
  }
  
  emit('sort', { by: sortBy.value, order: sortOrder.value });
};

// Handle row click
const handleRowClick = (row) => {
  if (props.rowClickable) {
    emit('row-click', row);
  }
};

// Handle action button click
const handleAction = (actionName, row) => {
  emit('action', { action: actionName, row });
};
</script>

<style scoped>
.data-table {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.results-count {
  font-size: 14px;
  color: #6c757d;
}

.table-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: white;
}

/* Custom scrollbar for better UX */
.table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}

table {
  width: 100%;
  min-width: 800px; /* Ensure minimum width for better mobile experience */
  border-collapse: collapse;
  background: white;
}

thead {
  background: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 10;
}

th {
  padding: 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
  white-space: nowrap;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background: #e9ecef;
}

.th-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-icon {
  font-size: 12px;
  color: #667eea;
}

.sort-placeholder {
  color: #ccc;
}

th.text-center,
td.text-center {
  text-align: center;
}

th.text-right,
td.text-right {
  text-align: right;
}

td {
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  color: #495057;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background: #f8f9fa;
}

tbody tr.clickable {
  cursor: pointer;
}

tbody tr.selected {
  background: #e7f0ff;
}

/* Image Cell Styles */
.image-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-image-preview {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid #dee2e6;
}

.table-image-preview:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.no-image {
  font-size: 12px;
  color: #6c757d;
  font-style: italic;
}

/* Image Modal */
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.image-modal-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.image-modal-close:hover {
  background: #dc3545;
  color: white;
  transform: scale(1.1);
}

.image-modal-preview {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.status-active {
  background: #d4edda;
  color: #155724;
}

.status-inactive {
  background: #f8d7da;
  color: #721c24;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  background: #e9ecef;
  color: #495057;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-view {
  background: #17a2b8;
  color: white;
}

.btn-view:hover:not(:disabled) {
  background: #138496;
}

.btn-edit {
  background: #ffc107;
  color: #333;
}

.btn-edit:hover:not(:disabled) {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover:not(:disabled) {
  background: #c82333;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #218838;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.no-results h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #495057;
}

.no-results p {
  font-size: 14px;
}

@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .table-wrapper {
    border-radius: 0;
    margin: 0 -15px; /* Extend to screen edges on mobile */
  }
  
  table {
    min-width: 600px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .table-image-preview {
    width: 40px;
    height: 40px;
  }
  
  .image-modal-close {
    top: 10px;
    right: 10px;
  }
}
</style>