<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container service-modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="header-content">
          <h2>Manage Services</h2>
          <p class="program-name">{{ programName }}</p>
        </div>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <!-- Add Service Button -->
        <div class="action-bar">
          <button class="add-service-btn" @click="openCreateForm">
            <span class="icon">+</span>
            Add New Service
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading services...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!loading && services.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h3>No Services Yet</h3>
          <p>Start by adding your first service for this program.</p>
        </div>

        <!-- Services List -->
        <div v-else class="services-list">
          <div 
            v-for="service in services" 
            :key="service.id" 
            class="service-item"
          >
            <div class="service-content">
              <div class="service-id">#{{ service.id }}</div>
              <div class="service-details">{{ service.service_statement }}</div>
            </div>
            <div class="service-actions">
              <button 
                class="btn-edit" 
                @click="openEditForm(service)"
                title="Edit"
              >
                ✏️
              </button>
              <button 
                class="btn-delete" 
                @click="confirmDelete(service)"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Form (Inline) -->
      <div v-if="showForm" class="form-section">
        <div class="form-header">
          <h3>{{ formMode === 'create' ? 'Add New Service' : 'Edit Service' }}</h3>
        </div>
        <div class="form-body">
          <div class="form-group">
            <label for="service-details">Service Details *</label>
            <textarea
              id="service-details"
              v-model="formData.service_statement"
              placeholder="Enter service details..."
              rows="4"
              :class="{ 'error': formErrors.service_statement }"
            ></textarea>
            <span v-if="formErrors.service_statement" class="error-message">
              {{ formErrors.service_statement }}
            </span>
          </div>

          <div class="form-actions">
            <button 
              class="btn-cancel" 
              @click="cancelForm"
              :disabled="submitting"
            >
              Cancel
            </button>
            <button 
              class="btn-submit" 
              @click="submitForm"
              :disabled="submitting"
            >
              <span v-if="submitting" class="spinner-small"></span>
              <span v-else>{{ formMode === 'create' ? 'Create' : 'Update' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation (Inline) -->
      <div v-if="showDeleteConfirm" class="delete-confirm">
        <div class="confirm-content">
          <div class="confirm-icon">⚠️</div>
          <h3>Delete Service?</h3>
          <p>Are you sure you want to delete this service? This action cannot be undone.</p>
          <div class="service-preview">
            <strong>Service Details:</strong>
            <p>{{ serviceToDelete?.service_statement }}</p>
          </div>
          <div class="confirm-actions">
            <button 
              class="btn-cancel" 
              @click="cancelDelete"
              :disabled="deleting"
            >
              Cancel
            </button>
            <button 
              class="btn-delete-confirm" 
              @click="deleteService"
              :disabled="deleting"
            >
              <span v-if="deleting" class="spinner-small"></span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import axios from 'axios';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  programId: {
    type: [Number, String],
    required: true
  },
  programName: {
    type: String,
    default: 'Program'
  }
});

// Emits
const emit = defineEmits(['update:modelValue', 'refresh']);

// State
const services = ref([]);
const loading = ref(false);
const showForm = ref(false);
const showDeleteConfirm = ref(false);
const formMode = ref('create'); // 'create' or 'edit'
const submitting = ref(false);
const deleting = ref(false);
const serviceToDelete = ref(null);

// Form data
const formData = ref({
  service_statement: ''
});

const formErrors = ref({
  service_statement: ''
});

const editingService = ref(null);

// API base URL
const API_BASE = process.env.VUE_APP_BASE_API+'/admin/general-program-services';

// Methods
const closeModal = () => {
  emit('update:modelValue', false);
};

const loadServices = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/${props.programId}`);
    services.value = response.data.list || [];
  } catch (error) {
    console.error('Failed to load services:', error);
    services.value = [];
  } finally {
    loading.value = false;
  }
};

const openCreateForm = () => {
  formMode.value = 'create';
  formData.value = { service_statement: '' };
  formErrors.value = { service_statement: '' };
  editingService.value = null;
  showForm.value = true;
  showDeleteConfirm.value = false;
};

const openEditForm = async (service) => {
  formMode.value = 'edit';
  editingService.value = service;
  
  // Load full service details
  try {
    const response = await axios.get(`${API_BASE}/single/${service.id}`);
    formData.value = {
      service_statement: response.data.service_statement || ''
    };
    formErrors.value = { service_statement: '' };
    showForm.value = true;
    showDeleteConfirm.value = false;
  } catch (error) {
    console.error('Failed to load service details:', error);
    alert('Failed to load service details');
  }
};

const validateForm = () => {
  formErrors.value = { service_statement: '' };
  let isValid = true;

  if (!formData.value.service_statement || formData.value.service_statement.trim() === '') {
    formErrors.value.service_statement = 'Service details are required';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  submitting.value = true;

  try {
    const payload = {
      program_id: props.programId,
      service_statement: formData.value.service_statement
    };

    if (formMode.value === 'create') {
      await axios.post(`${API_BASE}`, payload);
    } else {
      await axios.put(`${API_BASE}/${editingService.value.id}`, payload);
    }

    // Reload services
    await loadServices();
    
    // Close form
    showForm.value = false;
    formData.value = { service_statement: '' };
    
    // Emit refresh to update parent
    emit('refresh');
  } catch (error) {
    console.error('Form submission error:', error);
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      if (errors.service_statement) {
        formErrors.value.service_statement = Array.isArray(errors.service_statement) 
          ? errors.service_statement[0] 
          : errors.service_statement;
      }
    } else {
      alert(error.response?.data?.message || 'Failed to save service');
    }
  } finally {
    submitting.value = false;
  }
};

const cancelForm = () => {
  showForm.value = false;
  formData.value = { service_statement: '' };
  formErrors.value = { service_statement: '' };
  editingService.value = null;
};

const confirmDelete = (service) => {
  serviceToDelete.value = service;
  showDeleteConfirm.value = true;
  showForm.value = false;
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  serviceToDelete.value = null;
};

const deleteService = async () => {
  if (!serviceToDelete.value) return;

  deleting.value = true;

  try {
    await axios.delete(`${API_BASE}/${serviceToDelete.value.id}`);
    
    // Reload services
    await loadServices();
    
    // Close confirm dialog
    showDeleteConfirm.value = false;
    serviceToDelete.value = null;
    
    // Emit refresh to update parent
    emit('refresh');
  } catch (error) {
    console.error('Delete error:', error);
    alert(error.response?.data?.message || 'Failed to delete service');
  } finally {
    deleting.value = false;
  }
};

// Watch for modal open/close
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    loadServices();
    showForm.value = false;
    showDeleteConfirm.value = false;
  }
});

// Load on mount if modal is open
onMounted(() => {
  if (props.modelValue) {
    loadServices();
  }
});
</script>

<style scoped>
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
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 24px 30px;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px 12px 0 0;
}

.header-content h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
}

.program-name {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 32px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px 30px;
  overflow-y: auto;
  flex: 1;
}

.action-bar {
  margin-bottom: 20px;
}

.add-service-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.add-service-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.add-service-btn .icon {
  font-size: 20px;
  font-weight: bold;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner-small {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-state p {
  color: #6c757d;
  margin: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #495057;
  font-size: 20px;
}

.empty-state p {
  margin: 0;
  color: #6c757d;
  font-size: 15px;
}

/* Services List */
.services-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.service-item:hover {
  background: #e9ecef;
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.service-content {
  flex: 1;
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.service-id {
  font-weight: 700;
  color: #667eea;
  font-size: 14px;
  min-width: 40px;
}

.service-details {
  color: #495057;
  font-size: 15px;
  line-height: 1.6;
  word-break: break-word;
}

.service-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.service-actions button {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background: #fff3cd;
}

.btn-delete:hover {
  background: #f8d7da;
}

/* Form Section */
.form-section {
  border-top: 2px solid #e9ecef;
  padding: 24px 30px;
  background: #f8f9fa;
}

.form-header h3 {
  margin: 0 0 20px 0;
  color: #495057;
  font-size: 18px;
  font-weight: 600;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}

.form-group textarea {
  padding: 12px 15px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
}

.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 13px;
  margin-top: -4px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-submit {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-cancel {
  background: #e9ecef;
  color: #495057;
}

.btn-cancel:hover:not(:disabled) {
  background: #dee2e6;
}

.btn-submit {
  background: #667eea;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-cancel:disabled,
.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Delete Confirmation */
.delete-confirm {
  border-top: 2px solid #e9ecef;
  padding: 24px 30px;
  background: #fff5f5;
}

.confirm-content {
  text-align: center;
}

.confirm-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.confirm-content h3 {
  margin: 0 0 10px 0;
  color: #dc3545;
  font-size: 20px;
}

.confirm-content > p {
  margin: 0 0 20px 0;
  color: #6c757d;
  font-size: 15px;
}

.service-preview {
  background: white;
  border: 1px solid #f8d7da;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: left;
}

.service-preview strong {
  display: block;
  margin-bottom: 8px;
  color: #495057;
  font-size: 14px;
}

.service-preview p {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
  line-height: 1.6;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-delete-confirm {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #dc3545;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-delete-confirm:hover:not(:disabled) {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-delete-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header {
    border-radius: 0;
  }

  .service-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .service-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .form-actions,
  .confirm-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-submit,
  .btn-delete-confirm {
    width: 100%;
    justify-content: center;
  }
}
</style>