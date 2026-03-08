<template>
  <div class="form-fields">
    <div class="form-group">
      <label class="form-label required">Process Name</label>
      <input
        v-model="localData.title"
        type="text"
        class="form-control"
        placeholder="Enter process name..."
        required
      />
      <small class="form-text">Name of the application process step</small>
    </div>

    <div class="form-group">
      <label class="form-label">Short Description</label>
      <textarea
        v-model="localData.short_description"
        class="form-control"
        rows="4"
        placeholder="Enter description..."
      ></textarea>
      <small class="form-text">Brief description of this application step</small>
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
        <label class="radio-label">
          <input
            v-model="localData.status"
            type="radio"
            value="pending"
          />
          <span>Pending</span>
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

const localData = ref({ 
  status: 'active',
  ...props.modelValue 
});

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

textarea.form-control {
  resize: vertical;
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