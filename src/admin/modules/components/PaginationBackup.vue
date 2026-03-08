<template>
  <div class="pagination-wrapper" v-if="totalPages > 0">
    <!-- Items per page selector -->
    <div class="pagination-info" v-if="showInfo">
      <span class="showing-text">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} {{ itemLabel }}
      </span>
      
      <div class="items-per-page" v-if="showPageSize">
        <label for="page-size">Items per page:</label>
        <select 
          id="page-size" 
          :value="currentPageSize"
          @change="handlePageSizeChange"
        >
          <option 
            v-for="size in pageSizeOptions" 
            :key="size"
            :value="size"
          >
            {{ size }}
          </option>
        </select>
      </div>
    </div>

    <!-- Pagination controls -->
    <div class="pagination-controls">
      <!-- First page button -->
      <button 
        v-if="showFirstLast"
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(1)"
        title="First page"
      >
        <span class="btn-icon">⟪</span>
      </button>

      <!-- Previous button -->
      <button 
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        title="Previous page"
      >
        <span class="btn-icon">‹</span>
        <span v-if="showLabels" class="btn-label">Previous</span>
      </button>

      <!-- Page numbers -->
      <div class="page-numbers">
        <!-- First page if not in visible range -->
        <button
          v-if="displayPages[0] > 1"
          class="pagination-btn page-number"
          @click="goToPage(1)"
        >
          1
        </button>
        
        <!-- Ellipsis before -->
        <span v-if="displayPages[0] > 2" class="pagination-ellipsis">...</span>

        <!-- Visible page numbers -->
        <button 
          v-for="page in displayPages" 
          :key="page"
          :class="['pagination-btn', 'page-number', { active: currentPage === page }]"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- Ellipsis after -->
        <span v-if="displayPages[displayPages.length - 1] < totalPages - 1" class="pagination-ellipsis">
          ...
        </span>

        <!-- Last page if not in visible range -->
        <button
          v-if="displayPages[displayPages.length - 1] < totalPages"
          class="pagination-btn page-number"
          @click="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Next button -->
      <button 
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        title="Next page"
      >
        <span v-if="showLabels" class="btn-label">Next</span>
        <span class="btn-icon">›</span>
      </button>

      <!-- Last page button -->
      <button 
        v-if="showFirstLast"
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(totalPages)"
        title="Last page"
      >
        <span class="btn-icon">⟫</span>
      </button>
    </div>

    <!-- Jump to page (optional) -->
    <div class="jump-to-page" v-if="showJumpTo">
      <label for="jump-page">Go to page:</label>
      <input 
        type="number"
        id="jump-page"
        :min="1"
        :max="totalPages"
        v-model.number="jumpToPageNumber"
        @keyup.enter="handleJumpToPage"
      />
      <button class="pagination-btn btn-jump" @click="handleJumpToPage">
        Go
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  // Current page (v-model)
  modelValue: {
    type: Number,
    required: true,
    validator: (value) => value >= 1
  },
  
  // Total number of items
  totalItems: {
    type: Number,
    required: true,
    validator: (value) => value >= 0
  },
  
  // Items per page
  pageSize: {
    type: Number,
    default: 10,
    validator: (value) => value > 0
  },
  
  // Page size options for dropdown
  pageSizeOptions: {
    type: Array,
    default: () => [5, 10, 20, 50, 100]
  },
  
  // Maximum number of page buttons to show
  maxVisiblePages: {
    type: Number,
    default: 5,
    validator: (value) => value > 0 && value % 2 === 1 // Should be odd number
  },
  
  // Show first/last page buttons
  showFirstLast: {
    type: Boolean,
    default: false
  },
  
  // Show previous/next labels
  showLabels: {
    type: Boolean,
    default: false
  },
  
  // Show pagination info (showing x to y of z)
  showInfo: {
    type: Boolean,
    default: true
  },
  
  // Show page size selector
  showPageSize: {
    type: Boolean,
    default: true
  },
  
  // Show jump to page input
  showJumpTo: {
    type: Boolean,
    default: false
  },
  
  // Item label (e.g., "items", "results", "products")
  itemLabel: {
    type: String,
    default: 'items'
  }
});

const emit = defineEmits(['update:modelValue', 'update:pageSize', 'page-change']);

// Local state
const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const currentPageSize = ref(props.pageSize);
const jumpToPageNumber = ref(props.modelValue);

// Watch for external page changes
watch(() => props.modelValue, (newVal) => {
  jumpToPageNumber.value = newVal;
});

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / currentPageSize.value) || 1;
});

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (currentPage.value - 1) * currentPageSize.value + 1;
});

const endItem = computed(() => {
  const end = currentPage.value * currentPageSize.value;
  return Math.min(end, props.totalItems);
});

const displayPages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const maxVisible = props.maxVisiblePages;
  
  if (total <= maxVisible) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Calculate range around current page
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(current - half, 1);
    let end = Math.min(start + maxVisible - 1, total);
    
    // Adjust start if we're near the end
    if (end === total) {
      start = Math.max(total - maxVisible + 1, 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// Methods
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return;
  }
  
  currentPage.value = page;
  jumpToPageNumber.value = page;
  emit('page-change', page);
};

const handlePageSizeChange = (event) => {
  const newSize = parseInt(event.target.value);
  currentPageSize.value = newSize;
  
  // Reset to page 1 when changing page size
  const newTotalPages = Math.ceil(props.totalItems / newSize);
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages || 1;
  }
  
  emit('update:pageSize', newSize);
  emit('page-change', currentPage.value);
};

const handleJumpToPage = () => {
  const page = jumpToPageNumber.value;
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page);
  } else {
    // Reset to current page if invalid
    jumpToPageNumber.value = currentPage.value;
  }
};
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #dee2e6;
}

.pagination-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  color: #6c757d;
}

.showing-text {
  font-weight: 500;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
}

.items-per-page label {
  font-size: 14px;
  color: #495057;
}

.items-per-page select {
  padding: 6px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.items-per-page select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.page-numbers {
  display: flex;
  gap: 4px;
  align-items: center;
}

.pagination-btn {
  min-width: 38px;
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.pagination-btn:hover:not(:disabled):not(.active) {
  background: #f8f9fa;
  border-color: #667eea;
  color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f8f9fa;
}

.pagination-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.pagination-btn.page-number {
  min-width: 38px;
}

.btn-icon {
  font-size: 16px;
  line-height: 1;
}

.btn-label {
  font-size: 14px;
}

.pagination-ellipsis {
  padding: 0 8px;
  color: #6c757d;
  font-weight: bold;
}

.jump-to-page {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}

.jump-to-page label {
  color: #495057;
  font-weight: 500;
}

.jump-to-page input {
  width: 70px;
  padding: 6px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.jump-to-page input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-jump {
  padding: 6px 16px;
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.btn-jump:hover:not(:disabled) {
  background: #5568d3;
  border-color: #5568d3;
}

/* Remove number input spinners */
.jump-to-page input[type="number"]::-webkit-inner-spin-button,
.jump-to-page input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jump-to-page input[type="number"] {
  -moz-appearance: textfield;
}

@media (max-width: 768px) {
  .pagination-wrapper {
    padding-top: 15px;
  }
  
  .pagination-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .pagination-controls {
    width: 100%;
    overflow-x: auto;
    padding: 10px 0;
  }
  
  .pagination-btn .btn-label {
    display: none;
  }
  
  .jump-to-page {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .pagination-btn {
    min-width: 32px;
    height: 32px;
    padding: 6px 10px;
    font-size: 13px;
  }
  
  .page-numbers {
    gap: 2px;
  }
  
  .pagination-controls {
    gap: 4px;
  }
}
</style>