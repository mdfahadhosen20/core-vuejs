<template>
  <div class="dashboard">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Appointment Management</h1>
        <button class="add-btn" @click="openCreateModal">Add New Appointment</button>
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
        <p>Loading appointments...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError && !items.length" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>Failed to Load Appointments</h3>
        <p>{{ errorMessage }}</p>
        <button class="retry-btn" @click="loadData">Retry</button>
      </div>

      <!-- DataTable Component -->
      <div v-else class="table-container">
        <DataTable
          :data="paginatedData"
          :columns="tableColumns"
          :actions="tableActions"
          result-label="appointments"
          @action="handleAction"
          @sort="handleSort"
        >
          <!-- Custom slot for price column -->
          <template #cell-price="{ value }">
            <span class="price-value">{{ value }}</span>
          </template>
        </DataTable>

        <!-- Pagination Component -->
        <Pagination
          v-model="currentPage"
          :total-items="filteredData.length"
          :page-size="itemsPerPage"
          :page-size-options="[5, 10, 20, 50]"
          item-label="appointments"
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
      entity-name="appointment"
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
      entity-name="appointment"
      :initial-data="selectedService"
      :on-submit="handleDeleteSubmit"
      delete-message="This appointment will be permanently removed from the system."
      @success="handleDeleteSuccess"
      @error="handleModalError"
    />

    <!-- View Modal -->
    <BaseModal
      v-model="showViewModal"
      mode="view"
      entity-name="appointment"
      :fields="formFields"
      :initial-data="selectedService"
      size="large"
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
import { ref, computed, onMounted } from 'vue';
import { useCrudStore } from '@/store/crud';
import FilterPanel from './components/FilterComponent.vue';
import DataTable from './components/TableComponent.vue';
import Pagination from './components/PaginationComponent.vue';
import BaseModal from './components/ActionModalComponent.vue';
import NotificationModal from './components/NotificationModal.vue';
import axios from 'axios';

// Store
const crudStore = useCrudStore();

// Modal states
const showFormModal = ref(false);
const showDeleteModal = ref(false);
const showViewModal = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const selectedService = ref({});

// API Data
const programs = ref([]);
const countries = ref([]);
const isLoadingOptions = ref(false);

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
  name: '',
  email: '',
  phone: '',
  program_id: '',
  country_id: '',
  status: '',
  date: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(10);
const sortConfig = ref({ by: '', order: 'asc' });

// Load Programs and Countries
const loadDropdownOptions = async () => {
  isLoadingOptions.value = true;
  
  try {
    // Load Programs
    const programsResponse = await axios.get(process.env.VUE_APP_BASE_API+'/system/programs');
    programs.value = programsResponse.data.programs || [];
    
    // Load Countries
    const countriesResponse = await axios.get(process.env.VUE_APP_BASE_API+'/system/countries');
    countries.value = countriesResponse.data.countries || [];
    
  } catch (error) {
    console.error('Error loading dropdown options:', error);
    showNotification('error', 'Failed to load dropdown options', {
      details: 'Could not load programs and countries list.'
    });
  } finally {
    isLoadingOptions.value = false;
  }
};

// Form fields configuration - will be updated with dynamic options
const formFields = computed(() => [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter first name...',
    description: 'The first name of the person'
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter last name...',
    description: 'The last name of the person'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    required: false,
    placeholder: 'Enter email address...'
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: false,
    placeholder: 'Enter phone number...'
  },
  {
    name: 'program_id',
    label: 'Program',
    type: 'select',
    placeholder: 'Select Program',
    required: true,
    options: programs.value
  },
  {
    name: 'country_id',
    label: 'Country',
    type: 'select',
    placeholder: 'Select Country',
    required: true,
    options: countries.value
  },
  {
    name: 'field_of_study',
    label: 'Field of Study',
    type: 'text',
    required: false,
    placeholder: 'Enter field of study...'
  },
  {
    name: 'preferred_country',
    label: 'Preferred Country',
    type: 'text',
    required: false,
    placeholder: 'Enter preferred country...'
  },
  {
    name: 'current_education',
    label: 'Current Education',
    type: 'text',
    required: false,
    placeholder: 'Enter current education level...'
  },
  {
    name: 'preferred_intake',
    label: 'Preferred Intake',
    type: 'text',
    required: false,
    placeholder: 'Enter preferred intake...'
  },
  {
    name: 'preferred_appointment_date',
    label: 'Preferred Appointment Date',
    type: 'date',
    required: false
  },
  {
    name: 'preferred_appointment_slot',
    label: 'Preferred Appointment Slot',
    type: 'text',
    required: false,
    placeholder: 'Enter preferred time slot...'
  },
  {
    name: 'appointment_information',
    label: 'Appointment Information',
    type: 'textarea',
    required: false,
    placeholder: 'Enter additional appointment information...'
  },
  {
    name: 'terms_conditions',
    label: 'Terms & Conditions',
    type: 'checkbox',
    required: false
  }
]);

// Filter fields configuration - with dynamic options
const filterFields = computed(() => [
  {
    name: 'program_id',
    label: 'Program',
    type: 'select',
    placeholder: 'All Programs',
    options: programs.value
  },
  {
    name: 'country_id',
    label: 'Country',
    type: 'select',
    placeholder: 'All Countries',
    options: countries.value
  },
  // {
  //   name: 'status',
  //   label: 'Status',
  //   type: 'select',
  //   placeholder: 'All Status',
  //   options: [
  //     { value: 'pending', label: 'Pending' },
  //     { value: 'confirmed', label: 'Confirmed' },
  //     { value: 'completed', label: 'Completed' },
  //     { value: 'cancelled', label: 'Cancelled' }
  //   ]
  // },
  {
    name: 'date',
    label: 'Date',
    type: 'date'
  }
]);

// Table configuration
const tableColumns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true
  },
  {
    key: 'first_name',
    label: 'First Name',
    sortable: true
  },
  {
    key: 'last_name',
    label: 'Last Name',
    sortable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: false
  },
  {
    key: 'phone',
    label: 'Phone',
    sortable: false
  },
  {
    key: 'preferred_appointment_date',
    label: 'Preferred Appointment Date',
    sortable: false
  },
  {
    key: 'read',
    label: 'Read',
    type: 'status',
    sortable: true
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

// Computed - Filtered services (client-side filtering)
const filteredData = computed(() => {
  let filtered = items.value.filter(appointment => {
    const matchesName = !searchFilters.value.name || 
      appointment.name?.toLowerCase().includes(searchFilters.value.name.toLowerCase());
    
    const matchesEmail = !searchFilters.value.email || 
      appointment.email?.toLowerCase().includes(searchFilters.value.email.toLowerCase());
    
    const matchesPhone = !searchFilters.value.phone || 
      appointment.phone?.includes(searchFilters.value.phone);
    
    const matchesProgram = !searchFilters.value.program_id || 
      appointment.program_id == searchFilters.value.program_id;
    
    const matchesCountry = !searchFilters.value.country_id || 
      appointment.country_id == searchFilters.value.country_id;
    
    const matchesStatus = !searchFilters.value.status || 
      appointment.status === searchFilters.value.status;
    
    const matchesDate = !searchFilters.value.date || 
      appointment.createdDate === searchFilters.value.date;
    
    return matchesName && matchesEmail && matchesPhone && matchesProgram && 
           matchesCountry && matchesStatus && matchesDate;
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

// Load services from API
const loadData = async () => {
  // Clear any previous errors
  crudStore.clearError();
  
  // Build query parameters
  const params = {
    page: currentPage.value,
    limit: itemsPerPage.value
  };
  
  // Add search filters if they exist
  if (searchFilters.value.name) {
    params.search = searchFilters.value.name;
  }
  if (searchFilters.value.email) {
    params.email = searchFilters.value.email;
  }
  if (searchFilters.value.phone) {
    params.phone = searchFilters.value.phone;
  }
  if (searchFilters.value.program_id) {
    params.program_id = searchFilters.value.program_id;
  }
  if (searchFilters.value.country_id) {
    params.country_id = searchFilters.value.country_id;
  }
  if (searchFilters.value.status) {
    params.status = searchFilters.value.status;
  }
  if (searchFilters.value.date) {
    params.date = searchFilters.value.date;
  }
  
  // Add sorting
  if (sortConfig.value.by) {
    params.sort_by = sortConfig.value.by;
    params.sort_order = sortConfig.value.order;
  }
  
  const result = await crudStore.fetchAll('/admin/appointments', params);
  
  if (!result.success) {
    showNotification('error', 'Failed to load appointments', {
      details: result.error.message || 'Please try again later.'
    });
  }
};

// Modal handlers
const openCreateModal = () => {
  modalMode.value = 'create';
  selectedService.value = {};
  showFormModal.value = true;
};

const openEditModal = async (service) => {
  // Fetch full service details
  const result = await crudStore.fetchById('/admin/appointments/', service.id);
  
  if (result.success) {
    modalMode.value = 'edit';
    selectedService.value = { ...result.data };
    showFormModal.value = true;
  } else {
    showNotification('error', 'Failed to load appointment details', {
      details: result.error.message
    });
  }
};

const openDeleteModal = (service) => {
  selectedService.value = { ...service };
  showDeleteModal.value = true;
};

const openViewModal = async (service) => {
  // Fetch full service details
  const result = await crudStore.fetchById('/admin/appointments/', service.id);
  
  if (result.success) {
    selectedService.value = { ...result.data };
    showViewModal.value = true;
  } else {
    showNotification('error', 'Failed to load appointment details', {
      details: result.error.message
    });
  }
};

// Form submit handler (create/edit) - WITH DEBUGGING
const handleFormSubmit = async (data, mode, initialData) => {
  console.log('=== FORM SUBMIT DEBUG ===');
  console.log('Received data:', data);
  console.log('Data is FormData?', data instanceof FormData);
  console.log('Mode:', mode);
  
  let result;
  
  // BaseModal is sending FormData, we need to check if it has entries
  if (data instanceof FormData) {
    console.log('Data is FormData - checking entries...');
    
    let hasData = false;
    for (let pair of data.entries()) {
      console.log(`  ${pair[0]}: ${pair[1]}`);
      hasData = true;
    }
    
    if (!hasData) {
      console.error('ERROR: FormData is empty!');
      throw new Error('No form data received');
    }
    
    // FormData already created by BaseModal, use it directly
    if (mode === 'create') {
      console.log('Sending CREATE request');
      result = await crudStore.create('/admin/appointments', data);
    } else {
      // For update, add ID and _method
      data.append('id', initialData.id);
      data.append('_method', 'PUT');
      console.log('Sending UPDATE request');
      result = await crudStore.post(`/admin/appointments/${initialData.id}`, data);
    }
  } else {
    // BaseModal sent plain object
    console.log('Data is plain object:', data);
    console.log('Data keys:', Object.keys(data));
    
    if (!data || Object.keys(data).length === 0) {
      console.error('ERROR: No data received!');
      throw new Error('No form data received');
    }
    
    // Convert to FormData
    const formData = new FormData();
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
      result = await crudStore.create('/admin/appointments', formData);
    } else {
      formData.append('id', initialData.id);
      formData.append('_method', 'PUT');
      result = await crudStore.post(`/admin/appointments/${initialData.id}`, formData);
    }
  }
  
  console.log('Result:', result);
  
  if (!result.success) {
    console.error('Request failed:', result.error);
    throw new Error(result.error.message);
  }
  
  return result.data;
};

// Delete submit handler
const handleDeleteSubmit = async (data) => {
  const result = await crudStore.delete('/admin/appointments/', data.id);
  
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  return result.data;
};

// Success handlers
const handleModalSuccess = ({ data, mode }) => {
  if (mode === 'create') {
    showNotification('success', 'Appointment created successfully!', {
      details: `${data.name || 'The appointment'} has been added to the system.`,
      autoClose: 3000
    });
  } else if (mode === 'edit') {
    showNotification('success', 'Appointment updated successfully!', {
      details: `Changes to ${data.name || 'the appointment'} have been saved.`,
      autoClose: 3000
    });
  }
  
  // Reload services
  loadData();
};

const handleDeleteSuccess = () => {
  showNotification('success', 'Appointment deleted successfully!', {
    details: 'The appointment has been permanently removed from the system.',
    autoClose: 3000
  });
  
  // Reload services
  loadData();
};

// Error handler
const handleModalError = ({ error, mode }) => {
  console.error(`${mode} error:`, error);
  
  let errorMessage = error.message || 'An unexpected error occurred. Please try again.';
  let errorDetails = '';
  let errorList = [];
  
  // Check if it's a validation error from the store
  if (error.response?.data?.errors) {
    errorDetails = 'Please check the following fields:';
    errorList = Object.entries(error.response.data.errors).map(
      ([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
    );
  } else if (typeof error === 'object' && error.errors) {
    errorDetails = 'Please check the following fields:';
    errorList = Object.values(error.errors);
  }
  
  // Show error notification
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
    details: `Found ${filteredData.value.length} appointment(s) matching your criteria.`,
    autoClose: 2000
  });
};

const handleReset = () => {
  // Reset filters
  searchFilters.value = {
    name: '',
    email: '',
    phone: '',
    program_id: '',
    country_id: '',
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
onMounted(async () => {
  // Load dropdown options first
  await loadDropdownOptions();
  // Then load appointment data
  loadData();
});

// Cleanup on unmount
import { onBeforeUnmount } from 'vue';
onBeforeUnmount(() => {
  // Clear current item when leaving the page
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

.price-value {
  font-weight: 600;
  color: #667eea;
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
}
</style>