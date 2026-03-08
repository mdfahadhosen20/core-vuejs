<template>
  <div class="item-display">
    <div class="item-header">
      <h4 class="item-title">
        <span class="specialization-icon">🎓</span>
        Specialization: {{ item.details }}
      </h4>
      <span v-if="item.id" class="item-id">#{{ item.id }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.item-display {
  width: 100%;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.specialization-icon {
  font-size: 20px;
}

.item-id {
  font-size: 12px;
  color: #6c757d;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>