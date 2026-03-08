<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="handleOverlayClick">
        <div class="modal-container" :class="[sizeClass, modalTypeClass]">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title-section">
              <span class="modal-icon" v-if="icon">{{ icon }}</span>
              <h3 class="modal-title">{{ computedTitle }}</h3>
            </div>
            <button 
              class="modal-close" 
              @click="handleClose"
              :disabled="loading"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Delete Confirmation -->
            <template v-if="mode === 'delete'">
              <div class="delete-confirmation">
                <div class="warning-icon">⚠️</div>
                <p class="delete-message">
                  {{ deleteMessage || `Are you sure you want to delete this ${entityName}?` }}
                </p>
                <p class="delete-warning" v-if="showDeleteWarning">
                  This action cannot be undone.
                </p>
                
                <!-- Display entity details if provided -->
                <div v-if="entityData && Object.keys(entityData).length > 0" class="entity-details">
                  <div 
                    v-for="(value, key) in entityData" 
                    :key="key"
                    class="entity-detail-row"
                  >
                    <strong>{{ formatLabel(key) }}:</strong> {{ value }}
                  </div>
                </div>
              </div>
            </template>

            <!-- View Mode - Display Only -->
            <template v-else-if="mode === 'view'">
              <div class="view-mode">
                <div 
                  v-for="field in fields" 
                  :key="field.name"
                  class="view-field"
                  v-show="!field.hidden"
                >
                  <label class="view-label">{{ field.label }}</label>
                  <div class="view-value">
                    <!-- Image/File preview -->
                    <template v-if="field.type === 'file' && initialData[field.name]">
                      <!-- Image preview for image files -->
                      <div v-if="field.accept && field.accept.includes('image')" class="view-image-preview">
                        <img 
                          :src="getExistingImageUrl(field)" 
                          :alt="field.label"
                          class="view-preview-image"
                        />
                      </div>
                      <!-- File link for non-image files -->
                      <div v-else class="view-file-link">
                        <span class="file-icon">📄</span>
                        <a :href="getExistingImageUrl(field)" target="_blank" rel="noopener noreferrer">
                          View File
                        </a>
                      </div>
                    </template>
                    
                    <!-- Array values (multiselect, features, etc) -->
                    <template v-else-if="Array.isArray(initialData[field.name])">
                      <span v-if="initialData[field.name].length === 0" class="empty-value">None</span>
                      <div v-else class="value-tags">
                        <span 
                          v-for="item in initialData[field.name]" 
                          :key="item"
                          class="value-tag"
                        >
                          {{ formatArrayItem(item, field) }}
                        </span>
                      </div>
                    </template>
                    
                    <!-- Boolean values -->
                    <template v-else-if="typeof initialData[field.name] === 'boolean'">
                      <span :class="['boolean-badge', initialData[field.name] ? 'boolean-yes' : 'boolean-no']">
                        {{ initialData[field.name] ? 'Yes' : 'No' }}
                      </span>
                    </template>
                    
                    <!-- Regular values -->
                    <template v-else>
                      {{ formatViewValue(initialData[field.name], field) }}
                    </template>
                  </div>
                </div>
              </div>
            </template>

            <!-- Create/Edit Form -->
            <template v-else>
              <form @submit.prevent="handleSubmit" class="modal-form">
                <div 
                  v-for="field in fields" 
                  :key="field.name"
                  class="form-field"
                  :class="{ 
                    'form-field-error': errors[field.name],
                    'form-field-hidden': field.hidden
                  }"
                >
                  <label 
                    :for="field.name" 
                    class="form-label"
                    v-if="field.type !== 'checkbox' && !field.hidden"
                  >
                    {{ field.label }}
                    <span v-if="field.required" class="required-mark">*</span>
                  </label>

                  <!-- Text Input -->
                  <input 
                    v-if="field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'url'"
                    :type="field.type"
                    :id="field.name"
                    :placeholder="field.placeholder || ''"
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    :readonly="field.readonly"
                    v-model="formData[field.name]"
                    @blur="validateField(field)"
                    class="form-input"
                  />

                  <!-- Number Input -->
                  <input 
                    v-else-if="field.type === 'number'"
                    type="number"
                    :id="field.name"
                    :placeholder="field.placeholder || ''"
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    :readonly="field.readonly"
                    :min="field.min"
                    :max="field.max"
                    :step="field.step || 1"
                    v-model.number="formData[field.name]"
                    @blur="validateField(field)"
                    class="form-input"
                  />

                  <!-- Textarea -->
                  <textarea 
                    v-else-if="field.type === 'textarea'"
                    :id="field.name"
                    :placeholder="field.placeholder || ''"
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    :readonly="field.readonly"
                    :rows="field.rows || 4"
                    v-model="formData[field.name]"
                    @blur="validateField(field)"
                    class="form-textarea"
                  ></textarea>

                  <!-- Select Dropdown -->
                  <select 
                    v-else-if="field.type === 'select'"
                    :id="field.name"
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    v-model="formData[field.name]"
                    @change="validateField(field)"
                    class="form-select"
                  >
                    <option value="" disabled>{{ field.placeholder || `Select ${field.label}` }}</option>
                    <option 
                      v-for="option in field.options" 
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>

                  <!-- Multi-Select -->
                  <select 
                    v-else-if="field.type === 'multiselect'"
                    :id="field.name"
                    multiple
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    v-model="formData[field.name]"
                    @change="validateField(field)"
                    class="form-multiselect"
                  >
                    <option 
                      v-for="option in field.options" 
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>

                  <!-- Date Input -->
                  <input 
                    v-else-if="field.type === 'date'"
                    type="date"
                    :id="field.name"
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    :readonly="field.readonly"
                    :min="field.min"
                    :max="field.max"
                    v-model="formData[field.name]"
                    @blur="validateField(field)"
                    class="form-input"
                  />

                  <!-- DateTime Input -->
                  <input 
                    v-else-if="field.type === 'datetime'"
                    type="datetime-local"
                    :id="field.name"
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    :readonly="field.readonly"
                    v-model="formData[field.name]"
                    @blur="validateField(field)"
                    class="form-input"
                  />

                  <!-- Time Input -->
                  <input 
                    v-else-if="field.type === 'time'"
                    type="time"
                    :id="field.name"
                    :required="field.required"
                    :disabled="field.disabled || loading"
                    :readonly="field.readonly"
                    v-model="formData[field.name]"
                    @blur="validateField(field)"
                    class="form-input"
                  />

                  <!-- Checkbox -->
                  <div v-else-if="field.type === 'checkbox'" class="checkbox-wrapper">
                    <input 
                      type="checkbox"
                      :id="field.name"
                      :disabled="field.disabled || loading"
                      v-model="formData[field.name]"
                      class="form-checkbox"
                    />
                    <label :for="field.name" class="checkbox-label">
                      {{ field.label }}
                      <span v-if="field.required" class="required-mark">*</span>
                    </label>
                  </div>

                  <!-- Radio Buttons -->
                  <div v-else-if="field.type === 'radio'" class="radio-group">
                    <label 
                      v-for="option in field.options" 
                      :key="option.value"
                      class="radio-label"
                    >
                      <input 
                        type="radio"
                        :name="field.name"
                        :value="option.value"
                        :disabled="field.disabled || loading"
                        v-model="formData[field.name]"
                        class="form-radio"
                      />
                      <span>{{ option.label }}</span>
                    </label>
                  </div>

                  <!-- File Upload -->
                  <!-- File Upload with Image Preview -->
                  <div v-else-if="field.type === 'file'" class="file-upload-wrapper">
                    <!-- Image Preview (only show for image uploads) -->
                    <div class="image-preview-container" v-if="field.accept && field.accept.includes('image')">
                      <div class="image-preview">
                        <img 
                          :src="filePreview[field.name] || 'https://via.placeholder.com/200x200?text=No+Image'" 
                          :alt="field.label"
                          class="preview-image"
                        />
                        <button 
                          v-if="filePreview[field.name]" 
                          type="button"
                          class="remove-preview-btn"
                          @click="removeFilePreview(field.name)"
                          :disabled="loading"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                      <p class="preview-label">
                        {{ filePreview[field.name] ? (isFileObject(formData[field.name]) ? 'New Image Selected' : 'Current Image') : 'No Image' }}
                      </p>
                    </div>
                    
                    <!-- File Input -->
                    <div class="file-input-group">
                      <label :for="field.name" class="file-input-label">
                        <span class="file-input-icon">📁</span>
                        <span>{{ isFileObject(formData[field.name]) ? formData[field.name].name : 'Choose File' }}</span>
                      </label>
                      <input 
                        type="file"
                        :id="field.name"
                        :accept="field.accept"
                        :multiple="field.multiple"
                        :disabled="field.disabled || loading"
                        @change="handleFileChange(field, $event)"
                        class="form-file"
                      />
                    </div>
                  </div>

                  <!-- Color Picker -->
                  <input 
                    v-else-if="field.type === 'color'"
                    type="color"
                    :id="field.name"
                    :disabled="field.disabled || loading"
                    v-model="formData[field.name]"
                    class="form-color"
                  />

                  <!-- Range/Slider -->
                  <div v-else-if="field.type === 'range'" class="range-wrapper">
                    <input 
                      type="range"
                      :id="field.name"
                      :min="field.min || 0"
                      :max="field.max || 100"
                      :step="field.step || 1"
                      :disabled="field.disabled || loading"
                      v-model.number="formData[field.name]"
                      class="form-range"
                    />
                    <span class="range-value">{{ formData[field.name] }}</span>
                  </div>

                  <!-- Custom Slot -->
                  <slot 
                    v-else-if="field.type === 'custom'"
                    :name="`field-${field.name}`"
                    :field="field"
                    :value="formData[field.name]"
                    :updateValue="(val) => formData[field.name] = val"
                  ></slot>

                  <!-- Field Description -->
                  <small v-if="field.description" class="field-description">
                    {{ field.description }}
                  </small>

                  <!-- Error Message -->
                  <span v-if="errors[field.name]" class="error-message">
                    {{ errors[field.name] }}
                  </span>
                </div>

                <!-- API Error -->
                <div v-if="apiError" class="api-error">
                  {{ apiError }}
                </div>
              </form>
            </template>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button 
              type="button"
              class="btn btn-cancel"
              @click="handleClose"
              :disabled="loading"
            >
              {{ cancelLabel }}
            </button>
            <button 
              type="button"
              :class="['btn', confirmButtonClass]"
              @click="handleConfirm"
              :disabled="loading || (mode !== 'delete' && !isFormValid)"
            >
              <span v-if="loading" class="spinner"></span>
              {{ loading ? loadingLabel : confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  // Modal visibility (v-model)
  modelValue: {
    type: Boolean,
    required: true
  },

  // Modal mode: 'create', 'edit', 'delete', 'view'
  mode: {
    type: String,
    required: true,
    validator: (value) => ['create', 'edit', 'delete', 'view'].includes(value)
  },

  // Modal title (optional, auto-generated if not provided)
  title: {
    type: String,
    default: ''
  },

  // Entity name for auto-generated titles and messages
  entityName: {
    type: String,
    default: 'item'
  },

  // Form fields configuration (for create/edit/view modes)
  fields: {
    type: Array,
    default: () => []
  },

  // Initial data for edit mode or display data for delete/view
  initialData: {
    type: Object,
    default: () => ({})
  },

  // API configuration
  api: {
    type: Object,
    default: () => ({}),
    validator: () => {
      // Can have create, update, delete endpoints
      return true;
    }
  },

  // Custom API handler function (alternative to api object)
  onSubmit: {
    type: Function,
    default: null
  },

  // Modal size: 'small', 'medium', 'large', 'xlarge'
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  },

  // Custom icon for modal
  icon: {
    type: String,
    default: ''
  },

  // Close on overlay click
  closeOnOverlay: {
    type: Boolean,
    default: true
  },

  // Delete mode specific props
  deleteMessage: {
    type: String,
    default: ''
  },

  showDeleteWarning: {
    type: Boolean,
    default: true
  },

  // Custom labels
  confirmLabel: {
    type: String,
    default: ''
  },

  cancelLabel: {
    type: String,
    default: 'Cancel'
  },

  loadingLabel: {
    type: String,
    default: 'Processing...'
  },

  // Transform data before submission
  transformData: {
    type: Function,
    default: null
  },

  // Custom validation function
  customValidation: {
    type: Function,
    default: null
  },

  // Auto-close on success
  autoClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits([
  'update:modelValue',
  'submit',
  'success',
  'error',
  'close',
  'cancel'
]);

// State
const formData = ref({});
const errors = ref({});
const loading = ref(false);
const apiError = ref('');
const filePreview = ref({});

// ✅ FIXED: Safe File type checking helper function
const isFileObject = (value) => {
  if (!value || typeof value !== 'object') return false;
  
  // Check if it's a Blob (File extends Blob)
  if (typeof Blob !== 'undefined' && value instanceof Blob) return true;
  
  // Check if File constructor exists and value is an instance
  if (typeof File !== 'undefined' && value instanceof File) return true;
  
  // Fallback: check for File-like properties
  return value.constructor?.name === 'File' || 
         (value.name && value.size !== undefined && value.type !== undefined);
};

// Computed properties
const computedTitle = computed(() => {
  if (props.title) return props.title;
  
  const entity = props.entityName.charAt(0).toUpperCase() + props.entityName.slice(1);
  
  switch (props.mode) {
    case 'create':
      return `Create New ${entity}`;
    case 'edit':
      return `Edit ${entity}`;
    case 'delete':
      return `Delete ${entity}`;
    case 'view':
      return `View ${entity}`;
    default:
      return entity;
  }
});

const confirmLabel = computed(() => {
  if (props.confirmLabel) return props.confirmLabel;
  
  switch (props.mode) {
    case 'create':
      return 'Create';
    case 'edit':
      return 'Update';
    case 'delete':
      return 'Delete';
    case 'view':
      return 'Close';
    default:
      return 'Confirm';
  }
});

const confirmButtonClass = computed(() => {
  switch (props.mode) {
    case 'delete':
      return 'btn-danger';
    case 'view':
      return 'btn-secondary';
    default:
      return 'btn-primary';
  }
});

const modalTypeClass = computed(() => {
  return `modal-${props.mode}`;
});

const sizeClass = computed(() => {
  return `modal-${props.size}`;
});

const entityData = computed(() => {
  if (props.mode !== 'delete') return {};
  
  // Extract relevant data for delete confirmation
  const data = { ...props.initialData };
  
  // Remove technical fields
  delete data.id;
  delete data._id;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.__v;
  
  return data;
});

const isFormValid = computed(() => {
  // Basic validation: check if required fields are filled
  return props.fields
    .filter(f => f.required && !f.hidden)
    .every(field => {
      const value = formData.value[field.name];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== null && value !== undefined;
    });
});

// Watch for modal opening
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    initializeForm();
    errors.value = {};
    apiError.value = '';
  }
}, { immediate: true });

// Watch for initialData changes
watch(() => props.initialData, () => {
  if (props.modelValue) {
    initializeForm();
  }
}, { deep: true });

// Methods
const initializeForm = () => {
  const data = {};
  filePreview.value = {}; // Reset previews
  
  props.fields.forEach(field => {
    if (props.mode === 'edit' && props.initialData[field.name] !== undefined) {
      data[field.name] = props.initialData[field.name];
      
      // Set preview for existing images in edit mode
      if (field.type === 'file' && props.initialData[field.name]) {
        const imageUrl = getExistingImageUrl(field);
        if (imageUrl) {
          filePreview.value[field.name] = imageUrl;
        }
      }
    } else if (field.default !== undefined) {
      data[field.name] = field.default;
    } else {
      // Set appropriate default values based on field type
      switch (field.type) {
        case 'checkbox':
          data[field.name] = false;
          break;
        case 'multiselect':
          data[field.name] = [];
          break;
        case 'number':
        case 'range':
          data[field.name] = field.min || 0;
          break;
        default:
          data[field.name] = '';
      }
    }
  });
  
  formData.value = data;
};

const validateField = (field) => {
  const value = formData.value[field.name];
  
  // Required validation
  if (field.required) {
    if (Array.isArray(value) && value.length === 0) {
      errors.value[field.name] = `${field.label} is required`;
      return false;
    }
    if (!value && value !== 0 && value !== false) {
      errors.value[field.name] = `${field.label} is required`;
      return false;
    }
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.value[field.name] = 'Invalid email format';
      return false;
    }
  }
  
  // URL validation
  if (field.type === 'url' && value) {
    try {
      new URL(value);
    } catch {
      errors.value[field.name] = 'Invalid URL format';
      return false;
    }
  }
  
  // Min/Max validation for numbers
  if (field.type === 'number' && value !== '') {
    if (field.min !== undefined && value < field.min) {
      errors.value[field.name] = `Minimum value is ${field.min}`;
      return false;
    }
    if (field.max !== undefined && value > field.max) {
      errors.value[field.name] = `Maximum value is ${field.max}`;
      return false;
    }
  }
  
  // Custom validation
  if (field.validator && typeof field.validator === 'function') {
    const validationResult = field.validator(value, formData.value);
    if (validationResult !== true) {
      errors.value[field.name] = validationResult;
      return false;
    }
  }
  
  delete errors.value[field.name];
  return true;
};

const validateForm = () => {
  let isValid = true;
  errors.value = {};
  
  props.fields.forEach(field => {
    if (!field.hidden && !validateField(field)) {
      isValid = false;
    }
  });
  
  // Custom validation
  if (props.customValidation && typeof props.customValidation === 'function') {
    const customErrors = props.customValidation(formData.value);
    if (customErrors && Object.keys(customErrors).length > 0) {
      errors.value = { ...errors.value, ...customErrors };
      isValid = false;
    }
  }
  
  return isValid;
};

const handleFileChange = (field, event) => {
  const files = event.target.files;
  const file = field.multiple ? Array.from(files) : files[0];
  
  formData.value[field.name] = file;
  
  // Generate preview for image files
  if (file && file.type && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      filePreview.value[field.name] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeFilePreview = (fieldName) => {
  formData.value[fieldName] = null;
  filePreview.value[fieldName] = null;
  
  // Clear the file input
  const fileInput = document.querySelector(`input[type="file"]#${fieldName}`);
  if (fileInput) {
    fileInput.value = '';
  }
};

const getExistingImageUrl = (field) => {
  const value = props.initialData[field.name];
  if (!value) return null;
  
  // If it's already a full URL, return it
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }
  
  // Otherwise, assume it's a storage path
  const baseUrl = import.meta.env.VITE_APP_BASE_URL || process.env.VUE_APP_BASE_URL || '';
  return `${baseUrl}/${value}`;
};

const handleClose = () => {
  if (!loading.value) {
    emit('update:modelValue', false);
    emit('close');
  }
};

const handleOverlayClick = () => {
  if (props.closeOnOverlay && !loading.value) {
    emit('cancel');
    handleClose();
  }
};

const handleSubmit = () => {
  handleConfirm();
};

const handleConfirm = async () => {
  // For delete mode, no validation needed
  if (props.mode === 'delete') {
    await handleDelete();
    return;
  }
  
  // For view mode, just close
  if (props.mode === 'view') {
    handleClose();
    return;
  }
  
  // Validate form
  if (!validateForm()) {
    apiError.value = 'Please fix the errors above';
    return;
  }
  
  loading.value = true;
  apiError.value = '';
  
  try {
    let data = { ...formData.value };
    
    // Transform data if transformer provided
    if (props.transformData && typeof props.transformData === 'function') {
      data = props.transformData(data);
    }
    
    // ✅ FIXED: Better file handling with safe type checking
    const hasFiles = props.fields.some(f => f.type === 'file' && formData.value[f.name]);
    
    if (hasFiles) {
      // Create FormData for file uploads
      const formDataObj = new FormData();
      
      Object.keys(data).forEach(key => {
        const value = data[key];
        
        // Skip null/undefined/empty values
        if (value === null || value === undefined || value === '') {
          return;
        }
        
        // Handle single file
        if (isFileObject(value)) {
          formDataObj.append(key, value);
        }
        // Handle multiple files
        else if (Array.isArray(value) && value.length > 0 && isFileObject(value[0])) {
          value.forEach(file => formDataObj.append(key, file));
        }
        // Handle arrays (but not file arrays)
        else if (Array.isArray(value)) {
          formDataObj.append(key, JSON.stringify(value));
        }
        // Handle regular values - don't JSON.stringify!
        else {
          formDataObj.append(key, String(value));
        }
      });
      
      data = formDataObj;
    }
    
    let response;
    
    // Use custom submit handler if provided
    if (props.onSubmit && typeof props.onSubmit === 'function') {
      response = await props.onSubmit(data, props.mode, props.initialData);
    } 
    // Use API configuration
    else if (props.api) {
      const endpoint = props.mode === 'create' ? props.api.create : props.api.update;
      const method = props.mode === 'create' ? 'POST' : 'PUT';
      
      if (!endpoint) {
        throw new Error(`No API endpoint configured for ${props.mode} mode`);
      }
      
      // Add ID to URL for update
      const url = props.mode === 'edit' && props.initialData.id 
        ? `${endpoint}/${props.initialData.id}`
        : endpoint;
      
      response = await makeApiCall(url, method, data);
    } else {
      throw new Error('No API configuration or onSubmit handler provided');
    }
    
    emit('submit', { data: response, mode: props.mode });
    emit('success', { data: response, mode: props.mode });
    
    if (props.autoClose) {
      handleClose();
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    apiError.value = errorMessage;
    emit('error', { error, mode: props.mode });
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  loading.value = true;
  apiError.value = '';
  
  try {
    let response;
    
    // Use custom submit handler if provided
    if (props.onSubmit && typeof props.onSubmit === 'function') {
      response = await props.onSubmit(props.initialData, 'delete');
    }
    // Use API configuration
    else if (props.api?.delete) {
      const url = props.initialData.id 
        ? `${props.api.delete}/${props.initialData.id}`
        : props.api.delete;
      
      response = await makeApiCall(url, 'DELETE');
    } else {
      throw new Error('No API endpoint configured for delete mode');
    }
    
    emit('submit', { data: props.initialData, response, mode: 'delete' });
    emit('success', { data: props.initialData, response, mode: 'delete' });
    
    if (props.autoClose) {
      handleClose();
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    apiError.value = errorMessage;
    emit('error', { error, mode: 'delete' });
  } finally {
    loading.value = false;
  }
};

const makeApiCall = async (url, method, data = null) => {
  const options = {
    method,
    headers: {}
  };
  
  if (data) {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
  }
  
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw { response: { data: error } };
  }
  
  return response.json();
};

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

const formatViewValue = (value, field) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  
  // Use custom formatter if provided
  if (field.formatter && typeof field.formatter === 'function') {
    return field.formatter(value);
  }

  const option = {}
  
  // Format based on field type
  switch (field.type) {
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'datetime':
      return new Date(value).toLocaleString();
    case 'time':
      return value;
    case 'select':
    case 'radio':
      // Find label from options
      option.value = field.options?.find(opt => opt.value === value);
      return option.value ? option.value.label : value;
    default:
      return value;
  }
};

const formatArrayItem = (item, field) => {
  // For multiselect, try to find the label
  if (field.type === 'multiselect' && field.options) {
    const option = field.options.find(opt => opt.value === item);
    return option ? option.label : item;
  }
  return item;
};

// Initialize form when component mounts if modal is open
if (props.modelValue) {
  initializeForm();
}
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  overflow-y: auto;
}

/* Modal Container */
.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
}

.modal-small {
  max-width: 400px;
}

.modal-medium {
  max-width: 600px;
}

.modal-large {
  max-width: 800px;
}

.modal-xlarge {
  max-width: 1000px;
}

/* Modal Header */
.modal-header {
  padding: 24px 30px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12px 12px 0 0;
}

.modal-delete .modal-header {
  background: #fff3cd;
  border-bottom-color: #ffc107;
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-icon {
  font-size: 24px;
}

.modal-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 32px;
  line-height: 1;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.modal-close:hover:not(:disabled) {
  background: #dee2e6;
  color: #333;
}

.modal-close:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal Body */
.modal-body {
  padding: 30px;
  overflow-y: auto;
  flex: 1;
}

/* Delete Confirmation */
.delete-confirmation {
  text-align: center;
}

.warning-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.delete-message {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  font-weight: 500;
}

.delete-warning {
  font-size: 14px;
  color: #856404;
  margin-bottom: 20px;
}

.entity-details {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  text-align: left;
  margin-top: 20px;
}

.entity-detail-row {
  padding: 8px 0;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
}

.entity-detail-row:last-child {
  border-bottom: none;
}

/* View Mode Styles */
.view-mode {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.view-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
}

.view-field:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.view-label {
  font-size: 12px;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.view-value {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  word-wrap: break-word;
}

.empty-value {
  color: #6c757d;
  font-style: italic;
}

.value-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.value-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #e7f0ff;
  color: #667eea;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.boolean-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.boolean-yes {
  background: #d4edda;
  color: #155724;
}

.boolean-no {
  background: #f8d7da;
  color: #721c24;
}

/* View Mode Image/File Preview */
.view-image-preview {
  margin-top: 8px;
  max-width: 100%;
}

.view-preview-image {
  max-width: 100%;
  max-height: 400px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  object-fit: contain;
}

.view-file-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 6px;
  margin-top: 8px;
}

.view-file-link .file-icon {
  font-size: 20px;
}

.view-file-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.view-file-link a:hover {
  color: #5568d3;
  text-decoration: underline;
}

/* Form */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field-hidden {
  display: none;
}

.form-field-error .form-input,
.form-field-error .form-select,
.form-field-error .form-textarea {
  border-color: #dc3545;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.required-mark {
  color: #dc3545;
  margin-left: 4px;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:disabled,
.form-select:disabled,
.form-textarea:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.form-input[readonly],
.form-textarea[readonly] {
  background: #f8f9fa;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-multiselect {
  min-height: 120px;
  padding: 8px;
}

.form-file {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.form-color {
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  margin: 0;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.form-radio {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.range-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-range {
  flex: 1;
  cursor: pointer;
}

.range-value {
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  min-width: 40px;
  text-align: right;
}

.field-description {
  font-size: 12px;
  color: #6c757d;
  margin-top: 6px;
  display: block;
}

.error-message {
  font-size: 12px;
  color: #dc3545;
  margin-top: 6px;
  display: block;
}

.api-error {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 10px;
}

/* Modal Footer */
.modal-footer {
  padding: 20px 30px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover:not(:disabled) {
  background: #5a6268;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c82333;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
    align-items: flex-start;
  }
  
  .modal-container {
    max-width: 100%;
    margin-top: 20px;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 20px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .view-preview-image {
    max-height: 250px;
  }
  
  .image-preview {
    width: 150px;
    height: 150px;
  }
}

/* File Upload with Image Preview */
.file-upload-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.image-preview {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-preview-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0;
}

.image-preview:hover .remove-preview-btn {
  opacity: 1;
}

.remove-preview-btn:hover:not(:disabled) {
  background: rgba(200, 35, 51, 1);
  transform: scale(1.1);
}

.remove-preview-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.preview-label {
  font-size: 13px;
  color: #6c757d;
  margin: 0;
  font-weight: 500;
}

.file-input-group {
  position: relative;
}

.file-input-label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
}

.file-input-label:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.file-input-icon {
  font-size: 18px;
}

.form-file {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
</style>