<template>
  <div class="dashboard">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Program Management</h1>
        <button class="add-btn" @click="openCreateModal">Add New Program</button>
      </div>

      <!-- Filter Panel Component -->
      <FilterPanel
        title="Search & Filter"
        :fields="filterFields"
        v-model="searchFilters"
        @submit="handleSearch"
        @reset="handleReset"
      />

      <!-- Loading State -->
      <div v-if="isLoading && !items.length" class="loading-container">
        <div class="spinner-large"></div>
        <p>Loading programs...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError && !items.length" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>Failed to Load Programs</h3>
        <p>{{ errorMessage }}</p>
        <button class="retry-btn" @click="loadData">Retry</button>
      </div>

      <!-- DataTable Component -->
      <div v-else class="table-container">
        <DataTable
          :data="paginatedData"
          :columns="tableColumns"
          :actions="tableActions"
          result-label="programs"
          @action="handleAction"
          @sort="handleSort"
        >
          <!-- Custom slot for various columns with manage buttons -->
          <template #cell-eligibilities="{ row, value }">
            <div class="programs-cell">
              <span class="programs-count">{{ value || 0 }}</span>
              <button 
                class="manage-programs-btn"
                @click="openManageModal(row, 'eligibilities')"
              >
                Manage
              </button>
            </div>
          </template>

          <template #cell-resources="{ row, value }">
            <div class="programs-cell">
              <span class="programs-count">{{ value || 0 }}</span>
              <button 
                class="manage-programs-btn"
                @click="openManageModal(row, 'resources')"
              >
                Manage
              </button>
            </div>
          </template>

          <template #cell-services="{ row, value }">
            <div class="programs-cell">
              <span class="programs-count">{{ value || 0 }}</span>
              <button 
                class="manage-programs-btn"
                @click="openManageModal(row, 'services')"
              >
                Manage
              </button>
            </div>
          </template>

          <template #cell-application-process="{ row, value }">
            <div class="programs-cell">
              <span class="programs-count">{{ value || 0 }}</span>
              <button 
                class="manage-programs-btn"
                @click="openManageModal(row, 'application-process')"
              >
                Manage
              </button>
            </div>
          </template>

          <template #cell-specializations="{ row, value }">
            <div class="programs-cell">
              <span class="programs-count">{{ value || 0 }}</span>
              <button 
                class="manage-programs-btn"
                @click="openManageModal(row, 'specializations')"
              >
                Manage
              </button>
            </div>
          </template>
        </DataTable>

        <!-- Pagination Component -->
        <Pagination
          v-model="currentPage"
          :total-items="filteredData.length"
          :page-size="itemsPerPage"
          :page-size-options="[5, 10, 20, 50]"
          item-label="programs"
          :show-first-last="true"
          :show-jump-to="true"
          @update:page-size="handlePageSizeChange"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <BaseModal
      v-model="showFormModal"
      :mode="modalMode"
      entity-name="program"
      :fields="formFields"
      :initial-data="selectedService"
      :on-submit="handleFormSubmit"
      size="large"
      @success="handleModalSuccess"
      @error="handleModalError"
    />

    <!-- Delete Confirmation Modal -->
    <BaseModal
      v-model="showDeleteModal"
      mode="delete"
      entity-name="program"
      :initial-data="selectedService"
      :on-submit="handleDeleteSubmit"
      delete-message="This program will be permanently removed from the system."
      @success="handleDeleteSuccess"
      @error="handleModalError"
    />

    <!-- View Modal -->
    <BaseModal
      v-model="showViewModal"
      mode="view"
      entity-name="program"
      :fields="formFields"
      :initial-data="selectedService"
      size="large"
    />

    <!-- Program Management Modal (NEW) -->
    <ProgramManagementModal
      v-if="showManagementModal"
      v-model="showManagementModal"
      :program-id="selectedProgramId"
      :program-name="selectedProgramName"
      :initial-tab="selectedTab"
      @refresh="handleManagementRefresh"
    />

    <!-- Notification Modal -->
    <NotificationModal
      v-model="notification.show"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      :details="notification.details"
      :list="notification.list"
      :confirm-label="notification.confirmLabel"
      :auto-close="notification.autoClose"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useCrudStore } from '@/store/crud';
import { useRoute } from 'vue-router';
import axios from 'axios';
import FilterPanel from '../components/FilterComponent.vue';
import DataTable from '../components/TableComponent.vue';
import Pagination from '../components/PaginationComponent.vue';
import BaseModal from '../components/ActionModalComponent.vue';
import NotificationModal from '../components/NotificationModal.vue';
import ProgramManagementModal from './components/ProgramManagementModal.vue';

// Store
const crudStore = useCrudStore();
const route = useRoute();

// Get country ID from route
const countryId = computed(() => route.params.id);

// Modal states
const showFormModal = ref(false);
const showDeleteModal = ref(false);
const showViewModal = ref(false);
const showManagementModal = ref(false);
const modalMode = ref('create');
const selectedService = ref({});

// Management Modal State
const selectedProgramId = ref(null);
const selectedProgramName = ref('');
const selectedTab = ref('services');

// Program options state
const programOptions = ref([]);

// Notification state
const notification = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
  details: '',
  list: [],
  confirmLabel: 'OK',
  autoClose: 0
});

// Helper function to show notifications
const showNotification = (type, message, options = {}) => {
  notification.value = {
    show: true,
    type,
    message,
    title: options.title || '',
    details: options.details || '',
    list: options.list || [],
    confirmLabel: options.confirmLabel || 'OK',
    autoClose: options.autoClose || 0
  };
};

// Computed properties from store
const items = computed(() => crudStore.getAllItems);
const isLoading = computed(() => crudStore.isLoading);
const hasError = computed(() => crudStore.hasError);
const errorMessage = computed(() => crudStore.getError?.message || 'An error occurred');

// Search and pagination state
const searchFilters = ref({
  serviceName: '',
  status: '',
  date: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(10);
const sortConfig = ref({ by: '', order: 'asc' });

// Form fields configuration - Updated with program select
const formFields = computed(() => [
  {
    name: 'program_id',
    label: 'Program',
    type: 'select',
    required: true,
    placeholder: 'Select a program...',
    options: programOptions.value,
  },
  {
    name: 'duration',
    label: 'Duration',
    type: 'text',
    placeholder: 'e.g., 2 years',
  },
  {
    name: 'partner_university_count',
    label: 'Partner University Count',
    type: 'number',
    placeholder: 'Enter number of partner universities',
  },
  {
    name: 'success_rate',
    label: 'Success Rate',
    type: 'text',
    placeholder: 'e.g., 95%',
  },
  {
    name: 'average_tution',
    label: 'Average Tuition',
    type: 'text',
    placeholder: 'Enter average tuition',
  },
  {
    name: 'international_students_count',
    label: 'International Students Count',
    type: 'number',
    placeholder: 'Enter number of international students',
  },
  {
    name: 'intake',
    label: 'Intake',
    type: 'text',
    placeholder: 'e.g., Fall, Spring',
  },
  {
    name: 'application_deadline',
    label: 'Application Deadline',
    type: 'date',
    placeholder: 'Select deadline date',
  },
  {
    name: 'visa_processing_time',
    label: 'Visa Processing Time',
    type: 'text',
    placeholder: 'e.g., 4-6 weeks',
  },
  {
    name: 'work_permit',
    label: 'Work Permit',
    type: 'text',
    placeholder: 'Enter work permit details',
  },
  {
    name: 'status',
    label: 'Status',
    type: 'radio',
    required: true,
    default: 'active',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  },
  {
    name: 'overview',
    label: 'Overview',
    type: 'textarea',
    placeholder: 'Enter program overview...',
    rows: 4
  },
  {
    name: 'features',
    label: 'Features',
    type: 'textarea',
    placeholder: 'Enter program features...',
    rows: 4
  }
]);

// Filter fields configuration
const filterFields = [
  {
    name: 'name',
    label: 'Program Name',
    type: 'text',
    placeholder: 'Enter program name...'
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'All Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date'
  }
];

// Table configuration
const tableColumns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true
  },
  {
    key: 'name',
    label: 'Program Name',
    sortable: true
  },
  {
    key: 'services',
    label: 'Services',
    sortable: false
  },
  {
    key: 'eligibilities',
    label: 'Eligibilities',
    sortable: false
  },
  {
    key: 'application-process',
    label: 'Application Process',
    sortable: false
  },
  {
    key: 'resources',
    label: 'Resources',
    sortable: false
  },
  {
    key: 'specializations',
    label: 'Specializations',
    sortable: false
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    sortable: false
  },
  {
    key: 'actions',
    label: 'Actions',
    type: 'actions',
    align: 'center'
  }
];

const tableActions = [
  {
    name: 'view',
    label: 'View',
    class: 'btn-view'
  },
  {
    name: 'edit',
    label: 'Edit',
    class: 'btn-edit'
  },
  {
    name: 'delete',
    label: 'Delete',
    class: 'btn-delete'
  }
];

// Computed - Filtered services
const filteredData = computed(() => {
  let filtered = items.value.filter(service => {
    const matchesName = !searchFilters.value.serviceName || 
      service.name.toLowerCase().includes(searchFilters.value.serviceName.toLowerCase());
    
    const matchesCategory = !searchFilters.value.category || 
      service.category === searchFilters.value.category;
    
    const matchesStatus = !searchFilters.value.status || 
      service.status === searchFilters.value.status;
    
    const matchesDate = !searchFilters.value.date || 
      service.createdDate === searchFilters.value.date;
    
    return matchesName && matchesCategory && matchesStatus && matchesDate;
  });

  // Apply sorting
  if (sortConfig.value.by) {
    filtered.sort((a, b) => {
      const aVal = a[sortConfig.value.by];
      const bVal = b[sortConfig.value.by];
      
      if (aVal < bVal) return sortConfig.value.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.value.order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
});

// Computed - Paginated services
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

// Load program options from API
const loadProgramOptions = async () => {
  try {
    const response = await axios.get(process.env.VUE_APP_BASE_API+'/system/programs');
    if (response.data && response.data.programs) {
      programOptions.value = response.data.programs;
    }
  } catch (error) {
    console.error('Failed to load program options:', error);
    showNotification('error', 'Failed to load programs list', {
      details: 'Could not fetch program options. Please refresh the page.'
    });
  }
};

// Load services from API
const loadData = async () => {
  crudStore.clearError();
  
  const params = {
    page: currentPage.value,
    limit: itemsPerPage.value
  };
  
  if (searchFilters.value.serviceName) {
    params.search = searchFilters.value.serviceName;
  }
  if (searchFilters.value.category) {
    params.category = searchFilters.value.category;
  }
  if (searchFilters.value.status) {
    params.status = searchFilters.value.status;
  }
  if (searchFilters.value.date) {
    params.date = searchFilters.value.date;
  }
  
  if (sortConfig.value.by) {
    params.sort_by = sortConfig.value.by;
    params.sort_order = sortConfig.value.order;
  }
  
  const result = await crudStore.fetchAll(`/admin/country-programs/${countryId.value}`, params);
  
  if (!result.success) {
    showNotification('error', 'Failed to load programs', {
      details: result.error.message || 'Please try again later.'
    });
  }
};

// FIXED: Open management modal with event.stopPropagation()
const openManageModal = (program, tab) => {
  console.log('Opening manage modal for program:', program.id, 'tab:', tab);
  selectedProgramId.value = program.id;
  selectedProgramName.value = program.name || 'Program';
  selectedTab.value = tab;
  showManagementModal.value = true;
};

// FIXED: Handle refresh from management modal WITHOUT reloading main list
const handleManagementRefresh = () => {
  console.log('Management modal refreshed - keeping main list intact');
  // Don't reload the main program list when items inside are updated
  // loadData(); // REMOVED - this was causing the table to go blank
};

// Modal handlers
const openCreateModal = () => {
  modalMode.value = 'create';
  selectedService.value = {};
  showFormModal.value = true;
};

const openEditModal = async (service) => {
  const result = await crudStore.fetchById('/admin/country-programs/single/', service.id);
  
  if (result.success) {
    modalMode.value = 'edit';
    selectedService.value = { ...result.data };
    showFormModal.value = true;
  } else {
    showNotification('error', 'Failed to load program details', {
      details: result.error.message
    });
  }
};

const openDeleteModal = (service) => {
  selectedService.value = { ...service };
  showDeleteModal.value = true;
};

const openViewModal = async (service) => {
  const result = await crudStore.fetchById('/admin/country-programs/single/', service.id);
  
  if (result.success) {
    selectedService.value = { ...result.data };
    showViewModal.value = true;
  } else {
    showNotification('error', 'Failed to load program details', {
      details: result.error.message
    });
  }
};

// Form submit handler
const handleFormSubmit = async (data, mode, initialData) => {
  let result;
  
  if (data instanceof FormData) {
    // Check if FormData has any entries
    const hasData = Array.from(data.entries()).length > 0;
    
    if (!hasData) {
      throw new Error('No form data received');
    }
    
    // Add country_id to FormData
    data.append('country_id', countryId.value);
    
    if (mode === 'create') {
      result = await crudStore.create('/admin/country-programs', data);
    } else {
      data.append('id', initialData.id);
      data.append('_method', 'PUT');
      result = await crudStore.post(`/admin/country-programs/${initialData.id}`, data);
    }
  } else {
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No form data received');
    }
    
    const formData = new FormData();
    
    // Add country_id first
    formData.append('country_id', countryId.value);
    
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (value !== null && value !== undefined && value !== '') {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    if (mode === 'create') {
      result = await crudStore.create('/admin/country-programs', formData);
    } else {
      formData.append('id', initialData.id);
      formData.append('_method', 'PUT');
      result = await crudStore.post(`/admin/country-programs/${initialData.id}`, formData);
    }
  }
  
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  return result.data;
};

// Delete submit handler
const handleDeleteSubmit = async (data) => {
  const result = await crudStore.delete('/admin/country-programs/', data.id);
  
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  return result.data;
};

// Success handlers
const handleModalSuccess = ({ data, mode }) => {
  if (mode === 'create') {
    showNotification('success', 'Program created successfully!', {
      details: `${data.name || 'The program'} has been added.`,
      autoClose: 3000
    });
  } else if (mode === 'edit') {
    showNotification('success', 'Program updated successfully!', {
      details: `Changes to ${data.name || 'the program'} have been saved.`,
      autoClose: 3000
    });
  }
  
  loadData();
};

const handleDeleteSuccess = () => {
  showNotification('success', 'Program deleted successfully!', {
    details: 'The program has been permanently removed from the system.',
    autoClose: 3000
  });
  
  loadData();
};

// Error handler
const handleModalError = ({ error, mode }) => {
  console.error(`${mode} error:`, error);
  
  let errorMessage = error.message || 'An unexpected error occurred. Please try again.';
  let errorDetails = '';
  let errorList = [];
  
  if (error.response?.data?.errors) {
    errorDetails = 'Please check the following fields:';
    errorList = Object.entries(error.response.data.errors).map(
      ([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
    );
  } else if (typeof error === 'object' && error.errors) {
    errorDetails = 'Please check the following fields:';
    errorList = Object.values(error.errors);
  }
  
  if (errorList.length > 0) {
    showNotification('error', errorMessage, {
      details: errorDetails,
      list: errorList
    });
  } else {
    showNotification('error', errorMessage, {
      details: errorDetails || 'Please check your input and try again.'
    });
  }
};

// Search and filter handlers
const handleSearch = () => {
  currentPage.value = 1;
  loadData();
  
  showNotification('info', 'Search filters applied', {
    details: `Found ${filteredData.value.length} program(s) matching your criteria.`,
    autoClose: 2000
  });
};

const handleReset = () => {
  searchFilters.value = {
    serviceName: '',
    category: '',
    status: '',
    date: ''
  };
  
  currentPage.value = 1;
  loadData();
  
  showNotification('info', 'Filters reset', {
    details: 'All filters have been cleared.',
    autoClose: 2000
  });
};

// Sorting handler
const handleSort = (sortData) => {
  sortConfig.value = sortData;
  loadData();
};

// Table action handler
const handleAction = ({ action, row }) => {
  switch (action) {
    case 'view':
      openViewModal(row);
      break;
    case 'edit':
      openEditModal(row);
      break;
    case 'delete':
      openDeleteModal(row);
      break;
  }
};

// Pagination handlers
const handlePageChange = (page) => {
  currentPage.value = page;
  loadData();
};

const handlePageSizeChange = (newSize) => {
  itemsPerPage.value = newSize;
  currentPage.value = 1;
  loadData();
};

// Load services on mount
onMounted(() => {
  loadProgramOptions(); // Load program options first
  loadData();
});

// Cleanup on unmount
onBeforeUnmount(() => {
  crudStore.clearCurrentItem();
});
</script>

<style scoped>
.dashboard {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: #f0f2f5;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

.add-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.add-btn::before {
  content: '+';
  font-size: 20px;
  font-weight: bold;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
}

.spinner-large {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.error-container h3 {
  font-size: 24px;
  color: #dc3545;
  margin: 0 0 10px 0;
}

.error-container p {
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 20px 0;
}

.retry-btn {
  padding: 12px 32px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Table Container */
.table-container {
  padding: 40px;
}

/* Programs Cell Styles */
.programs-cell {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.programs-count {
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}

.manage-programs-btn {
  padding: 6px 12px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.manage-programs-btn:hover {
  background: #5568d3;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .table-container,
  .loading-container,
  .error-container {
    padding: 20px;
  }
  
  .dashboard {
    padding: 10px;
  }
  
  .programs-cell {
    width: 100%;
  }
  
  .manage-programs-btn {
    width: 100%;
  }
}
</style>