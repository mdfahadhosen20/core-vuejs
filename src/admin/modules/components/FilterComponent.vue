<template>
  <div class="filter-panel">
    <div class="filter-title">{{ title }}</div>
    <form class="filter-form" @submit.prevent="handleSubmit">
      <!-- Dynamic filter fields -->
      <div 
        v-for="field in fields" 
        :key="field.name"
        class="form-group"
      >
        <label :for="field.name">{{ field.label }}</label>
        
        <!-- Text Input -->
        <input 
          v-if="field.type === 'text'"
          type="text"
          :id="field.name"
          :placeholder="field.placeholder || ''"
          :value="modelValue[field.name]"
          @input="updateValue(field.name, $event.target.value)"
        />

        <!-- Number Input -->
        <input 
          v-else-if="field.type === 'number'"
          type="number"
          :id="field.name"
          :placeholder="field.placeholder || ''"
          :min="field.min"
          :max="field.max"
          :value="modelValue[field.name]"
          @input="updateValue(field.name, $event.target.value)"
        />

        <!-- Date Input -->
        <input 
          v-else-if="field.type === 'date'"
          type="date"
          :id="field.name"
          :value="modelValue[field.name]"
          @input="updateValue(field.name, $event.target.value)"
        />

        <!-- DateTime Input -->
        <input 
          v-else-if="field.type === 'datetime'"
          type="datetime-local"
          :id="field.name"
          :value="modelValue[field.name]"
          @input="updateValue(field.name, $event.target.value)"
        />

        <!-- Email Input -->
        <input 
          v-else-if="field.type === 'email'"
          type="email"
          :id="field.name"
          :placeholder="field.placeholder || ''"
          :value="modelValue[field.name]"
          @input="updateValue(field.name, $event.target.value)"
        />

        <!-- Select Dropdown -->
        <select 
          v-else-if="field.type === 'select'"
          :id="field.name"
          :value="modelValue[field.name]"
          @change="updateValue(field.name, $event.target.value)"
        >
          <option value="">{{ field.placeholder || `All ${field.label}` }}</option>
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
          :value="modelValue[field.name]"
          @change="updateMultiSelectValue(field.name, $event.target.selectedOptions)"
          class="multi-select"
        >
          <option 
            v-for="option in field.options" 
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Checkbox -->
        <div v-else-if="field.type === 'checkbox'" class="checkbox-wrapper">
          <input 
            type="checkbox"
            :id="field.name"
            :checked="modelValue[field.name]"
            @change="updateValue(field.name, $event.target.checked)"
          />
          <span class="checkbox-label">{{ field.checkboxLabel || field.label }}</span>
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
              :checked="modelValue[field.name] === option.value"
              @change="updateValue(field.name, option.value)"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>

        <!-- Range/Slider -->
        <div v-else-if="field.type === 'range'" class="range-wrapper">
          <input 
            type="range"
            :id="field.name"
            :min="field.min || 0"
            :max="field.max || 100"
            :step="field.step || 1"
            :value="modelValue[field.name]"
            @input="updateValue(field.name, $event.target.value)"
          />
          <span class="range-value">{{ modelValue[field.name] }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="filter-buttons">
        <button type="submit" class="filter-btn">
          {{ submitLabel }}
        </button>
        <button type="button" class="reset-btn" @click="handleReset">
          {{ resetLabel }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  // Title of the filter panel
  title: {
    type: String,
    default: 'Search & Filter'
  },
  
  // Array of field configurations
  fields: {
    type: Array,
    required: true,
    validator: (fields) => {
      return fields.every(field => field.name && field.type && field.label);
    }
  },
  
  // Current filter values (v-model)
  modelValue: {
    type: Object,
    required: true
  },
  
  // Submit button label
  submitLabel: {
    type: String,
    default: 'Search'
  },
  
  // Reset button label
  resetLabel: {
    type: String,
    default: 'Reset'
  }
});

const emit = defineEmits(['update:modelValue', 'submit', 'reset']);

// Update single value
const updateValue = (fieldName, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [fieldName]: value
  });
};

// Update multi-select values
const updateMultiSelectValue = (fieldName, selectedOptions) => {
  const values = Array.from(selectedOptions).map(option => option.value);
  emit('update:modelValue', {
    ...props.modelValue,
    [fieldName]: values
  });
};

// Handle form submit
const handleSubmit = () => {
  emit('submit', props.modelValue);
};

// Handle reset
const handleReset = () => {
  const resetValues = {};
  props.fields.forEach(field => {
    if (field.type === 'checkbox') {
      resetValues[field.name] = false;
    } else if (field.type === 'multiselect') {
      resetValues[field.name] = [];
    } else {
      resetValues[field.name] = '';
    }
  });
  
  emit('update:modelValue', resetValues);
  emit('reset');
};
</script>

<style scoped>
.filter-panel {
  padding: 30px 40px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.filter-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.filter-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="date"],
.form-group input[type="datetime-local"],
.form-group input[type="email"],
.form-group select {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.multi-select {
  min-height: 100px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.radio-label input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.range-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.range-wrapper input[type="range"] {
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

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-btn,
.reset-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn {
  background: #667eea;
  color: white;
}

.filter-btn:hover {
  background: #5568d3;
}

.reset-btn {
  background: #6c757d;
  color: white;
}

.reset-btn:hover {
  background: #5a6268;
}

@media (max-width: 768px) {
  .filter-form {
    grid-template-columns: 1fr;
  }
  
  .filter-panel {
    padding: 20px;
  }
}
</style>