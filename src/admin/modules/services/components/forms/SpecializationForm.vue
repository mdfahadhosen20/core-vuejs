<template>
  <div class="form-fields">
    <div class="form-group">
      <label class="form-label required">Specialization ID</label>
      <input
        v-model="localData.details"
        type="text"
        class="form-control"
        placeholder="Enter specialization ID..."
        required
      />
      <small class="form-text">ID of the specialization to link to this program</small>
    </div>

    <div class="info-box">
      <div class="info-icon">ℹ️</div>
      <div class="info-content">
        <strong>Note:</strong> This links an existing specialization to the program. Make sure the specialization ID exists in your system.
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

const localData = ref({ ...props.modelValue });

// Update parent when local data changes
watch(
  () => localData.value.details,
  () => {
    emit('update:modelValue', localData.value);
  }
);

// Update local data when prop changes (but prevent loop)
watch(
  () => props.modelValue,
  (newVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(localData.value)) {
      localData.value = { ...newVal };
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

.info-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #e7f3ff;
  border: 1px solid #b3d9ff;
  border-radius: 8px;
  margin-top: 8px;
}

.info-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.info-content {
  font-size: 14px;
  color: #004085;
  line-height: 1.5;
}

.info-content strong {
  display: block;
  margin-bottom: 4px;
}
</style>