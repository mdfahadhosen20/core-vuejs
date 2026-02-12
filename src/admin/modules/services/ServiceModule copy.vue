<template>
  <div class="dashboard">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Service Management</h1>
        <button class="add-btn" @click="openCreateModal">Add New Service</button>
      </div>

      <!-- Filter Panel Component -->
      <FilterPanel
        title="Search & Filter"
        :fields="filterFields"
        v-model="searchFilters"
        @submit="handleSearch"
        @reset="handleReset"
      />

      <!-- DataTable Component -->
      <div class="table-container">
        <DataTable
          :data="paginatedServices"
          :columns="tableColumns"
          :actions="tableActions"
          result-label="services"
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
          :total-items="filteredServices.length"
          :page-size="itemsPerPage"
          :page-size-options="[5, 10, 20, 50]"
          item-label="services"
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
      entity-name="service"
      :fields="formFields"
      :initial-data="selectedService"
      :on-submit="handleFormSubmit"
      size="large"
      @success="handleSuccess"
      @error="handleError"
    />

    <!-- Delete Confirmation Modal -->
    <BaseModal
      v-model="showDeleteModal"
      mode="delete"
      entity-name="service"
      :initial-data="selectedService"
      :on-submit="handleDeleteSubmit"
      delete-message="This service will be permanently removed from the system."
      @success="handleDeleteSuccess"
      @error="handleError"
    />

    <!-- View Modal (Optional) -->
    <BaseModal
      v-model="showViewModal"
      mode="view"
      entity-name="service"
      :fields="formFields"
      :initial-data="selectedService"
      size="large"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FilterPanel from '../components/FilterComponent.vue';
import DataTable from '../components/TableComponent.vue';
import Pagination from '../components/PaginationComponent.vue';
import BaseModal from '../components/ActionModalComponent.vue';

const showFormModal = ref(false);
const showDeleteModal = ref(false);
const showViewModal = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const selectedService = ref({});

const formFields = [
  {
    name: 'name',
    label: 'Service Name',
    type: 'text',
    required: true,
    placeholder: 'Enter service name...',
    description: 'The name of the service as it will appear to customers'
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    required: true,
    placeholder: 'Select category',
    options: [
      { value: 'consulting', label: 'Consulting' },
      { value: 'development', label: 'Development' },
      { value: 'support', label: 'Support' },
      { value: 'maintenance', label: 'Maintenance' }
    ]
  },
  {
    name: 'price',
    label: 'Price',
    type: 'text',
    required: true,
    placeholder: '$0.00',
    validator: (value) => {
      if (!value.match(/^\$?\d+([,.]?\d+)*(\.\d{2})?(\/mo)?$/)) {
        return 'Please enter a valid price format';
      }
      return true;
    }
  },
  {
    name: 'status',
    label: 'Status',
    type: 'radio',
    required: true,
    default: 'active',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ]
  }
  // Add more fields as needed
];

// Open create modal
const openCreateModal = () => {
  modalMode.value = 'create';
  selectedService.value = {};
  showFormModal.value = true;
};

// Open edit modal
const openEditModal = (service) => {
  modalMode.value = 'edit';
  selectedService.value = { ...service };
  showFormModal.value = true;
};

// Open delete modal
const openDeleteModal = (service) => {
  selectedService.value = { ...service };
  showDeleteModal.value = true;
};

// Open view modal
const openViewModal = (service) => {
  selectedService.value = { ...service };
  showViewModal.value = true;
};

// Handle form submit (create/edit)
const handleFormSubmit = async (data, mode, initialData) => {
  // Make API call
  const response = await fetch(
    mode === 'create' ? '/api/services' : `/api/services/${initialData.id}`,
    {
      method: mode === 'create' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to save service');
  }
  
  return response.json();
};

// Handle delete submit
const handleDeleteSubmit = async (data) => {
  // Make API call
  const response = await fetch(`/api/services/${data.id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete service');
  }
  
  return response.json();
};

// Handle success
const handleSuccess = ({ data, mode }) => {
  if (mode === 'create') {
    services.value.push(data);
    alert('Service created successfully!');
  } else if (mode === 'edit') {
    const index = services.value.findIndex(s => s.id === selectedService.value.id);
    if (index > -1) {
      services.value[index] = data;
    }
    alert('Service updated successfully!');
  }
};

// Handle delete success
const handleDeleteSuccess = ({ data }) => {
  const index = services.value.findIndex(s => s.id === data.id);
  if (index > -1) {
    services.value.splice(index, 1);
  }
  alert('Service deleted successfully!');
};

// Handle errors
const handleError = ({ error, mode }) => {
  console.error(`${mode} error:`, error);
  alert(`Error: ${error.message || 'Something went wrong'}`);
};

// Filter configuration
const filterFields = [
  {
    name: 'serviceName',
    label: 'Service Name',
    type: 'text',
    placeholder: 'Enter service name...'
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'All Categories',
    options: [
      { value: 'consulting', label: 'Consulting' },
      { value: 'development', label: 'Development' },
      { value: 'support', label: 'Support' },
      { value: 'maintenance', label: 'Maintenance' }
    ]
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'All Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
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
    label: 'Service Name',
    sortable: true
  },
  {
    key: 'category',
    label: 'Category',
    sortable: true,
    formatter: (value) => value.charAt(0).toUpperCase() + value.slice(1)
  },
  {
    key: 'price',
    label: 'Price',
    sortable: false
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    sortable: true
  },
  {
    key: 'createdDate',
    label: 'Created Date',
    type: 'date',
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

// State
const searchFilters = ref({
  serviceName: '',
  category: '',
  status: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(10);
const sortConfig = ref({ by: '', order: 'asc' });

// Sample data
const services = ref([
  { id: '#SRV001', name: 'Web Development', category: 'development', price: '$2,500', status: 'active', createdDate: '2024-01-15' },
  { id: '#SRV002', name: 'Business Consulting', category: 'consulting', price: '$5,000', status: 'active', createdDate: '2024-01-18' },
  { id: '#SRV003', name: 'Mobile App Development', category: 'development', price: '$8,000', status: 'pending', createdDate: '2024-01-20' },
  { id: '#SRV004', name: '24/7 Technical Support', category: 'support', price: '$1,200/mo', status: 'active', createdDate: '2024-01-22' },
  { id: '#SRV005', name: 'System Maintenance', category: 'maintenance', price: '$800/mo', status: 'active', createdDate: '2024-01-25' },
  { id: '#SRV006', name: 'Cloud Migration', category: 'consulting', price: '$12,000', status: 'active', createdDate: '2024-01-28' },
  { id: '#SRV007', name: 'UI/UX Design', category: 'development', price: '$3,500', status: 'active', createdDate: '2024-02-01' },
  { id: '#SRV008', name: 'Data Analytics', category: 'consulting', price: '$6,500', status: 'inactive', createdDate: '2024-02-03' },
  { id: '#SRV009', name: 'API Integration', category: 'development', price: '$4,200', status: 'active', createdDate: '2024-02-05' },
  { id: '#SRV010', name: 'Security Audit', category: 'consulting', price: '$7,800', status: 'pending', createdDate: '2024-02-06' },
  { id: '#SRV011', name: 'Database Optimization', category: 'maintenance', price: '$2,800', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV012', name: 'Email Support', category: 'support', price: '$500/mo', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV013', name: 'E-commerce Solution', category: 'development', price: '$15,000', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV014', name: 'SEO Optimization', category: 'consulting', price: '$1,800', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV015', name: 'Server Monitoring', category: 'maintenance', price: '$600/mo', status: 'inactive', createdDate: '2024-02-06' },
  { id: '#SRV001', name: 'Web Development', category: 'development', price: '$2,500', status: 'active', createdDate: '2024-01-15' },
  { id: '#SRV002', name: 'Business Consulting', category: 'consulting', price: '$5,000', status: 'active', createdDate: '2024-01-18' },
  { id: '#SRV003', name: 'Mobile App Development', category: 'development', price: '$8,000', status: 'pending', createdDate: '2024-01-20' },
  { id: '#SRV004', name: '24/7 Technical Support', category: 'support', price: '$1,200/mo', status: 'active', createdDate: '2024-01-22' },
  { id: '#SRV005', name: 'System Maintenance', category: 'maintenance', price: '$800/mo', status: 'active', createdDate: '2024-01-25' },
  { id: '#SRV006', name: 'Cloud Migration', category: 'consulting', price: '$12,000', status: 'active', createdDate: '2024-01-28' },
  { id: '#SRV007', name: 'UI/UX Design', category: 'development', price: '$3,500', status: 'active', createdDate: '2024-02-01' },
  { id: '#SRV008', name: 'Data Analytics', category: 'consulting', price: '$6,500', status: 'inactive', createdDate: '2024-02-03' },
  { id: '#SRV009', name: 'API Integration', category: 'development', price: '$4,200', status: 'active', createdDate: '2024-02-05' },
  { id: '#SRV010', name: 'Security Audit', category: 'consulting', price: '$7,800', status: 'pending', createdDate: '2024-02-06' },
  { id: '#SRV011', name: 'Database Optimization', category: 'maintenance', price: '$2,800', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV012', name: 'Email Support', category: 'support', price: '$500/mo', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV013', name: 'E-commerce Solution', category: 'development', price: '$15,000', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV014', name: 'SEO Optimization', category: 'consulting', price: '$1,800', status: 'active', createdDate: '2024-02-06' },
  { id: '#SRV015', name: 'Server Monitoring', category: 'maintenance', price: '$600/mo', status: 'inactive', createdDate: '2024-02-06' }
]);

// Computed properties
const filteredServices = computed(() => {
  let filtered = services.value.filter(service => {
    const matchesName = !searchFilters.value.serviceName || 
      service.name.toLowerCase().includes(searchFilters.value.serviceName.toLowerCase());
    
    const matchesCategory = !searchFilters.value.category || 
      service.category === searchFilters.value.category;
    
    const matchesStatus = !searchFilters.value.status || 
      service.status === searchFilters.value.status;
    
    return matchesName && matchesCategory && matchesStatus;
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

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredServices.value.slice(start, end);
});

// Methods
const handleSearch = () => {
  currentPage.value = 1;
  console.log('Searching with filters:', searchFilters.value);
};

const handleReset = () => {
  currentPage.value = 1;
  console.log('Filters reset');
};

const handleSort = (sortData) => {
  sortConfig.value = sortData;
  console.log('Sorting by:', sortData);
};

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

const handlePageChange = (page) => {
  console.log('Page changed to:', page);
};

const handlePageSizeChange = (newSize) => {
  itemsPerPage.value = newSize;
  currentPage.value = 1;
  console.log('Page size changed to:', newSize);
};
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

.table-container {
  padding: 40px;
}

.price-value {
  font-weight: 600;
  color: #667eea;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .table-container {
    padding: 20px;
  }
  
  .dashboard {
    padding: 10px;
  }
}
</style>