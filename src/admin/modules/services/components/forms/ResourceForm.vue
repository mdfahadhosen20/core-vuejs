<template>
  <div class="form-fields">
    <div class="form-group">
      <label class="form-label required">File Name</label>
      <input
        v-model="localData.file_name"
        type="text"
        class="form-control"
        placeholder="Enter file name..."
        required
      />
      <small class="form-text">Display name for this resource</small>
    </div>

    <div class="form-group">
      <label class="form-label required">File Upload</label>
      <div class="file-upload-wrapper">
        <input
          type="file"
          ref="fileInput"
          class="file-input"
          @change="handleFileChange"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
        />
        <button type="button" class="file-upload-btn" @click="triggerFileInput">
          <span class="upload-icon">📁</span>
          {{ selectedFileName || 'Choose File' }}
        </button>
      </div>
      <small class="form-text">
        {{ mode === 'edit' && localData.file_path ? 'Current: ' + localData.file_path : 'Upload a document or resource file' }}
      </small>
    </div>

    <div class="form-group">
      <label class="form-label required">Status</label>
      <div class="radio-group">
        <label class="radio-label">
          <input
            v-model="localData.status"
            type="radio"
            value="active"
            required
          />
          <span>Active</span>
        </label>
        <label class="radio-label">
          <input
            v-model="localData.status"
            type="radio"
            value="inactive"
          />
          <span>Inactive</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'create'
  }
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const selectedFileName = ref('');
const localData = ref({ 
  status: 'active',
  ...props.modelValue 
});

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFileName.value = file.name;
    localData.value.file = file;
    emit('update:modelValue', localData.value);
  }
};

// Update parent when local data changes
watch(
  () => ({ ...localData.value }),
  () => {
    emit('update:modelValue', localData.value);
  },
  { deep: true }
);

// Update local data when prop changes (but prevent loop)
watch(
  () => props.modelValue,
  (newVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(localData.value)) {
      localData.value = { 
        status: 'active',
        ...newVal 
      };
      // Reset file selection when switching items
      if (!newVal.file) {
        selectedFileName.value = '';
        if (fileInput.value) {
          fileInput.value.value = '';
        }
      }
    }
  },
  { deep: true }
);
</script>

<style scoped>
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #495057;
}

.form-label.required::after {
  content: ' *';
  color: #dc3545;
}

.form-control {
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-text {
  font-size: 12px;
  color: #6c757d;
}

.file-upload-wrapper {
  position: relative;
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.file-upload-btn {
  width: 100%;
  padding: 12px;
  background: white;
  border: 2px dashed #ced4da;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #495057;
}

.file-upload-btn:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.upload-icon {
  font-size: 20px;
}

.radio-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.radio-label:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.radio-label input[type="radio"] {
  cursor: pointer;
}

.radio-label input[type="radio"]:checked + span {
  font-weight: 600;
  color: #667eea;
}

.radio-label:has(input[type="radio"]:checked) {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}
</style>