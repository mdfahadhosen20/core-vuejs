<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container" :class="'modal-' + size">
          <!-- Modal Header -->
          <div class="modal-header">
            <h2>{{ programName }} - Management</h2>
            <button class="close-btn" @click="closeModal" aria-label="Close">
              <span>&times;</span>
            </button>
          </div>

          <!-- Tabs -->
          <div class="tabs-container">
            <div class="tabs-header">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                class="tab-btn"
                :class="{ active: activeTab === tab.key }"
                @click="switchTab(tab.key)"
              >
                {{ tab.label }}
                <span class="tab-badge">{{ getTabCount(tab.key) }}</span>
              </button>
            </div>

            <!-- Tab Content -->
            <div class="tab-content">
              <!-- Loading State -->
              <div v-if="isLoadingTab" class="loading-state">
                <div class="spinner"></div>
                <p>Loading {{ activeTabLabel }}...</p>
              </div>

              <!-- Content -->
              <div v-else class="tab-panel">
                <!-- Action Bar -->
                <div class="action-bar">
                  <button class="add-item-btn" @click="openCreateForm">
                    <span>+</span> Add {{ activeTabLabel }}
                  </button>
                </div>

                <!-- Items List -->
                <div v-if="currentItems.length > 0" class="items-list">
                  <div
                    v-for="item in currentItems"
                    :key="item.id"
                    class="item-card"
                  >
                    <div class="item-content">
                      <component
                        :is="getItemDisplayComponent(activeTab)"
                        :item="item"
                      />
                    </div>
                    <div class="item-actions">
                      <button
                        class="action-btn edit-btn"
                        @click="openEditForm(item)"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        class="action-btn delete-btn"
                        @click="confirmDelete(item)"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else class="empty-state">
                  <div class="empty-icon">📋</div>
                  <h3>No {{ activeTabLabel }} Yet</h3>
                  <p>Get started by adding your first {{ activeTabLabel.toLowerCase() }}</p>
                  <button class="add-first-btn" @click="openCreateForm">
                    Add {{ activeTabLabel }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button class="btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Create/Edit Form Modal -->
    <transition name="modal-fade">
      <div v-if="showFormModal" class="modal-overlay" @click.self="closeFormModal">
        <div class="modal-container modal-medium">
          <div class="modal-header">
            <h2>{{ formMode === 'create' ? 'Add' : 'Edit' }} {{ activeTabLabel }}</h2>
            <button class="close-btn" @click="closeFormModal">
              <span>&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="handleFormSubmit" class="item-form">
              <component
                :is="getFormComponent(activeTab)"
                v-model="formData"
                :mode="formMode"
              />

              <div class="form-actions">
                <button type="button" class="btn-secondary" @click="closeFormModal">
                  Cancel
                </button>
                <button type="submit" class="btn-primary" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-small"></span>
                  {{ isSubmitting ? 'Saving...' : (formMode === 'create' ? 'Create' : 'Update') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="modal-fade">
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
        <div class="modal-container modal-small">
          <div class="modal-header modal-header-danger">
            <h2>Confirm Deletion</h2>
            <button class="close-btn" @click="showDeleteModal = false">
              <span>&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="delete-warning">
              <div class="warning-icon">⚠️</div>
              <p>Are you sure you want to delete this {{ activeTabLabel.toLowerCase() }}?</p>
              <p class="warning-text">This action cannot be undone.</p>
            </div>

            <div class="form-actions">
              <button class="btn-secondary" @click="showDeleteModal = false">
                Cancel
              </button>
              <button class="btn-danger" @click="handleDelete" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-small"></span>
                {{ isSubmitting ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Notification Toast -->
    <transition name="toast-fade">
      <div v-if="toast.show" class="toast" :class="'toast-' + toast.type">
        <div class="toast-content">
          <span class="toast-icon">{{ getToastIcon(toast.type) }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineAsyncComponent, defineProps, defineEmits} from 'vue';
import axios from 'axios';

// Dynamic component imports
const ServiceItemDisplay = defineAsyncComponent(() => 
  import('./displays/ServiceItemDisplay.vue')
);
const EligibilityItemDisplay = defineAsyncComponent(() => 
  import('./displays/EligibilityItemDisplay.vue')
);
const ApplicationProcessItemDisplay = defineAsyncComponent(() => 
  import('./displays/ApplicationProcessItemDisplay.vue')
);
const ResourceItemDisplay = defineAsyncComponent(() => 
  import('./displays/ResourceItemDisplay.vue')
);
const SpecializationItemDisplay = defineAsyncComponent(() => 
  import('./displays/SpecializationItemDisplay.vue')
);

const ServiceForm = defineAsyncComponent(() => 
  import('./forms/ServiceForm.vue')
);
const EligibilityForm = defineAsyncComponent(() => 
  import('./forms/EligibilityForm.vue')
);
const ApplicationProcessForm = defineAsyncComponent(() => 
  import('./forms/ApplicationProcessForm.vue')
);
const ResourceForm = defineAsyncComponent(() => 
  import('./forms/ResourceForm.vue')
);
const SpecializationForm = defineAsyncComponent(() => 
  import('./forms/SpecializationForm.vue')
);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  programId: {
    type: [String, Number],
    required: true
  },
  programName: {
    type: String,
    default: 'Program'
  },
  initialTab: {
    type: String,
    default: 'services'
  },
  size: {
    type: String,
    default: 'xlarge',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue', 'refresh']);

// Get country_program_id from props (passed from parent)
const countryProgramId = computed(() => props.programId);

// Tab configuration
const tabs = [
  { key: 'services', label: 'Services', endpoint: process.env.VUE_APP_BASE_API+'/admin/country-program-services' },
  { key: 'eligibilities', label: 'Eligibilities', endpoint: process.env.VUE_APP_BASE_API+'/admin/country-program-eligibilities' },
  { key: 'application-process', label: 'Application Process', endpoint: process.env.VUE_APP_BASE_API+'/admin/country-program-application-process' },
  { key: 'resources', label: 'Resources', endpoint: process.env.VUE_APP_BASE_API+'/admin/country-program-resources' },
  { key: 'specializations', label: 'Specializations', endpoint: process.env.VUE_APP_BASE_API+'/admin/country-program-specialization' }
];

// Local state - NOT using shared store
const activeTab = ref(props.initialTab);
const isLoadingTab = ref(false);
const tabData = ref({
  services: [],
  eligibilities: [],
  'application-process': [],
  resources: [],
  specializations: []
});

// Form state
const showFormModal = ref(false);
const formMode = ref('create');
const formData = ref({});
const selectedItem = ref(null);
const isSubmitting = ref(false);

// Delete state
const showDeleteModal = ref(false);
const itemToDelete = ref(null);

// Toast notification
const toast = ref({
  show: false,
  type: 'success',
  message: ''
});

// Computed
const activeTabLabel = computed(() => {
  const tab = tabs.find(t => t.key === activeTab.value);
  return tab ? tab.label : '';
});

const activeTabEndpoint = computed(() => {
  const tab = tabs.find(t => t.key === activeTab.value);
  return tab ? tab.endpoint : '';
});

const currentItems = computed(() => {
  return tabData.value[activeTab.value] || [];
});

// Methods
const closeModal = () => {
  emit('update:modelValue', false);
};

const switchTab = async (tabKey) => {
  if (activeTab.value === tabKey) return;
  activeTab.value = tabKey;
  await loadTabData();
};

const getTabCount = (tabKey) => {
  return tabData.value[tabKey]?.length || 0;
};

// FIXED: Using axios directly instead of shared store
const loadTabData = async () => {
  isLoadingTab.value = true;
  try {
    const endpoint = tabs.find(t => t.key === activeTab.value)?.endpoint;
    if (!endpoint) return;

    console.log('Loading tab data:', {
      endpoint,
      country_program_id: countryProgramId.value,
      activeTab: activeTab.value
    });

    // Use axios directly - no shared store
    const response = await axios.get(endpoint, {
      params: {
        country_program_id: countryProgramId.value
      }
    });

    console.log('Tab data response:', response.data);

    // Handle response
    if (response.data) {
      tabData.value[activeTab.value] = response.data.list || response.data || [];
    } else {
      showToast('error', 'Failed to load data');
    }
  } catch (error) {
    console.error('Error loading tab data:', error);
    showToast('error', error.response?.data?.message || 'An error occurred while loading data');
  } finally {
    isLoadingTab.value = false;
  }
};

const openCreateForm = () => {
  formMode.value = 'create';
  formData.value = {
    country_program_id: countryProgramId.value
  };
  selectedItem.value = null;
  showFormModal.value = true;
};

const openEditForm = (item) => {
  formMode.value = 'edit';
  formData.value = { ...item };
  selectedItem.value = item;
  showFormModal.value = true;
};

const closeFormModal = () => {
  showFormModal.value = false;
  formData.value = {};
  selectedItem.value = null;
};

// FIXED: Using axios directly for form submission
const handleFormSubmit = async () => {
  isSubmitting.value = true;
  try {
    const payload = new FormData();
    
    // Add all form data to FormData
    Object.keys(formData.value).forEach(key => {
      const value = formData.value[key];
      if (value !== null && value !== undefined && value !== '') {
        if (value instanceof File) {
          payload.append(key, value);
        } else {
          payload.append(key, String(value));
        }
      }
    });

    let response;
    if (formMode.value === 'create') {
      response = await axios.post(activeTabEndpoint.value, payload);
    } else {
      payload.append('_method', 'PUT');
      response = await axios.post(
        `${activeTabEndpoint.value}/${selectedItem.value.id}`,
        payload
      );
    }

    if (response.data) {
      showToast('success', `${activeTabLabel.value} ${formMode.value === 'create' ? 'created' : 'updated'} successfully`);
      closeFormModal();
      await loadTabData();
      emit('refresh');
    }
  } catch (error) {
    console.error('Form submit error:', error);
    showToast('error', error.response?.data?.message || 'An error occurred. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = (item) => {
  itemToDelete.value = item;
  showDeleteModal.value = true;
};

// FIXED: Using axios directly for deletion
const handleDelete = async () => {
  if (!itemToDelete.value) return;

  isSubmitting.value = true;
  try {
    const response = await axios.delete(
      `${activeTabEndpoint.value}/${itemToDelete.value.id}`
    );

    if (response.data) {
      showToast('success', `${activeTabLabel.value} deleted successfully`);
      showDeleteModal.value = false;
      itemToDelete.value = null;
      await loadTabData();
      emit('refresh');
    }
  } catch (error) {
    console.error('Delete error:', error);
    showToast('error', error.response?.data?.message || 'An error occurred while deleting');
  } finally {
    isSubmitting.value = false;
  }
};

const showToast = (type, message) => {
  toast.value = { show: true, type, message };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const getToastIcon = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  return icons[type] || 'ℹ';
};

const getItemDisplayComponent = (tabKey) => {
  const components = {
    'services': ServiceItemDisplay,
    'eligibilities': EligibilityItemDisplay,
    'application-process': ApplicationProcessItemDisplay,
    'resources': ResourceItemDisplay,
    'specializations': SpecializationItemDisplay
  };
  return components[tabKey] || 'div';
};

const getFormComponent = (tabKey) => {
  const components = {
    'services': ServiceForm,
    'eligibilities': EligibilityForm,
    'application-process': ApplicationProcessForm,
    'resources': ResourceForm,
    'specializations': SpecializationForm
  };
  return components[tabKey] || 'div';
};

// Watchers
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    loadTabData();
  }
});

watch(() => props.initialTab, (newVal) => {
  activeTab.value = newVal;
});

// Lifecycle
onMounted(() => {
  if (props.modelValue) {
    loadTabData();
  }
});
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

/* Modal Container */
.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}

.modal-small { width: 100%; max-width: 400px; }
.modal-medium { width: 100%; max-width: 600px; }
.modal-large { width: 100%; max-width: 900px; }
.modal-xlarge { width: 100%; max-width: 1200px; }

/* Modal Header */
.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.modal-header-danger {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
}

.modal-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  line-height: 1;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Tabs */
.tabs-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid #e9ecef;
  background: #f8f9fa;
  padding: 0 32px;
  flex-shrink: 0;
  overflow-x: auto;
}

.tab-btn {
  padding: 16px 24px;
  background: none;
  border: none;
  color: #6c757d;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.tab-badge {
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.tab-btn.active .tab-badge {
  background: #764ba2;
}

/* Tab Content */
.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

.tab-panel {
  max-width: 100%;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.add-item-btn {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.add-item-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.add-item-btn span {
  font-size: 20px;
  line-height: 1;
}

/* Items List */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.item-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

.item-content {
  flex: 1;
}

.item-actions {
  display: flex;
  gap: 8px;
  margin-left: 16px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #667eea;
  color: white;
}

.edit-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 20px;
  color: #495057;
  margin: 0 0 8px 0;
}

.empty-state p {
  color: #6c757d;
  margin: 0 0 24px 0;
}

.add-first-btn {
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

.add-first-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Modal Body */
.modal-body {
  padding: 32px;
  overflow-y: auto;
}

/* Form */
.item-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e9ecef;
}

/* Buttons */
.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c82333;
}

.btn-primary:disabled,
.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Delete Warning */
.delete-warning {
  text-align: center;
  padding: 20px;
}

.warning-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.delete-warning p {
  color: #495057;
  margin: 0 0 8px 0;
  font-size: 16px;
}

.warning-text {
  color: #dc3545;
  font-weight: 600;
  font-size: 14px;
}

/* Modal Footer */
.modal-footer {
  padding: 20px 32px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  background: #f8f9fa;
  flex-shrink: 0;
}

/* Toast Notification */
.toast {
  position: fixed;
  top: 24px;
  right: 24px;
  background: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  min-width: 300px;
  border-left: 4px solid;
}

.toast-success { border-left-color: #28a745; }
.toast-error { border-left-color: #dc3545; }
.toast-warning { border-left-color: #ffc107; }
.toast-info { border-left-color: #17a2b8; }

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  font-size: 20px;
  font-weight: bold;
}

.toast-success .toast-icon { color: #28a745; }
.toast-error .toast-icon { color: #dc3545; }
.toast-warning .toast-icon { color: #ffc107; }
.toast-info .toast-icon { color: #17a2b8; }

.toast-message {
  color: #495057;
  font-size: 15px;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.9);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }

  .tabs-header {
    padding: 0 16px;
  }

  .tab-btn {
    padding: 12px 16px;
    font-size: 14px;
  }

  .tab-content {
    padding: 16px;
  }

  .modal-body {
    padding: 16px;
  }

  .item-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-actions {
    width: 100%;
    justify-content: flex-end;
    margin-left: 0;
    margin-top: 12px;
  }

  .toast {
    right: 12px;
    left: 12px;
    min-width: auto;
  }
}
</style>